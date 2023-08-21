import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../../services/apiAuth";
import { login } from "./auth-slice";
import store from "../../store/store";
import useForm from "./form-hook";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../../utils/validators";

import RoleSelection from "../ui/RoleSelection";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import Input from "../ui/input";

import classes from "./styles/SigninForm.module.css";
import logo from "../../assets/Logo.svg";

const SigninForm = () => {
  const [searchParams] = useSearchParams("instructor");
  const [loading, setLoading] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const isActive = searchParams.get("mode");
  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsTouched(true);
    if (!formState.isValid) {
      return;
    }
    setLoading(true);
    try {
      const loginData = {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      };
      const response = await loginUser(loginData, isActive);

      if (response.ok) {
        // local storage
        window.localStorage.setItem(
          "user",
          JSON.stringify({ data: loginData, role: isActive })
        );

        //redux action
        store.dispatch(login({ role: response.body.role }));

        setLoading(false);

        navigate("/");
      }
      if (response.statusCode === 401) {
        toast.error(response.body.message, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      }
    } catch (err) {
      navigate("/error");
    }
  };

  return (
    <div
      className="grid grid-cols-2 grid-rows-6 w-[100vw] h-screen bg-white"
      id={classes.form}
    >
      <Link
        to="/"
        className="flex items-center space-x-4 h-fit mt-5 ml-20 row-span-1 flex-1"
      >
        <img src={logo} alt="Coursefinity" className="w-12 h-12" />
        <span className="font-black capitalize text-xl">coursefinity</span>
      </Link>
      <div className="bg-black relative flex items-center row-span-6">
        <h1
          className="absolute capitalize font-extrabold text-[5rem] px-20"
          id={classes["main-heading"]}
        >
          The Best
          <br />
          digital
          <br />
          platform
          <br />
          learning
          <br />
          experience
        </h1>
      </div>
      <div className="flex flex-col m-auto w-[24rem] row-span-5">
        <h2 className="font-bold text-[1.5rem] leading-[1.8rem]">
          Welcome back
        </h2>
        <p className="mt-[0.35rem]">
          create an account?
          <span>
            <Link
              to={`/auth/signup?mode=${
                isActive === "learner" ? "learner" : "instructor"
              }`}
              className="text-primary-700"
            >
              {" "}
              Signup
            </Link>
          </span>
        </p>
        <form method="post" onSubmit={handleSubmit}>
          <RoleSelection isActive={isActive} />
          <Input
            id="email"
            type="text"
            element="input"
            isTouched={isTouched}
            placeholder="Email"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
            errorText="Please enter a valid email."
            className="w-full relative bg-[#f7f7f7] rounded-[0.4rem] p-[0.8rem] mt-[2rem] border-0 focus:ring-0 ml-auto"
          />
          <Input
            id="password"
            type="password"
            element="input"
            isTouched={isTouched}
            placeholder="Password"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Password required."
            className="w-full relative bg-[#f7f7f7] rounded-[0.4rem] p-[0.8rem] mt-[1.5rem] border-0 focus:ring-0"
          />
          <h1 className="space-x-1 text-sm font-semibold mt-5 text-[#7D7D7D]">
            <span>Forgot your password?</span>
            <Link to="/reset-email" className="text-primary-700">
              Reset here
            </Link>
          </h1>
          <Button type="submit" className="mt-3">
            {loading && (
              <Spinner parent={true} className="m-auto" type="small" />
            )}
            {!loading && "Log-in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
