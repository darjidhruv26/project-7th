import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import image1 from "../../assets/Background.png";
import googleIcon from "../../assets/icons/i-google.svg";
import logo from "../../assets/Logo.svg";
import { registerUser } from "../../services/apiAuth";
import Button from "../ui/Button";
import RoleSelection from "../ui/RoleSelection";

import classes from "./styles/SignupForm.module.css";
import Input from "../ui/input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_PASSWORD,
  VALIDATOR_REQUIRE,
} from "../../utils/validators";
import useForm from "./form-hook";

const SignupForm = () => {
  const [searchParams] = useSearchParams("instructor");
  const isActive = searchParams.get("mode");
  const [isTouched, setIsTouched] = useState(false);
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
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

  useEffect(() => {
    console.log("run on side effect");
    setFormData(
      {
        name: {
          value: "",
          isValid: false,
        },
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
  }, [isActive, setFormData]);

  const googleAuthHandler = async () => {
    await fetch("/googleAuth", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ click: true }),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsTouched(true);
    if (!formState.isValid) {
      return;
    }
    try {
      const registerData = {
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      };

      const response = await registerUser(registerData, isActive);

      if (response.ok) {
        navigate(`/auth/signin?mode=${isActive}`);
      }
      if (response.statusCode === 409) {
        toast.error(response.body.message, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      navigate("/error");
    }
  };

  return (
    <div
      id={classes.form}
      className="grid grid-cols-2 grid-rows-6 w-[100vw] h-screen bg-white"
    >
      <Link
        to="/"
        className="flex items-center space-x-4 h-fit mt-5 ml-20 row-span-1"
      >
        <img src={logo} alt="Coursefinity" className="w-12 h-12" />
        <span className="font-black capitalize text-xl">coursefinity</span>
      </Link>
      <div className="relative flex items-center row-span-6">
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
        <img src={image1} alt="background" className="h-screen w-full" />
      </div>
      <div className="flex flex-col m-auto w-[24rem] row-span-5">
        <h2 className="font-bold text-[1.5rem] leading-[1.8rem]">
          Create your coursefinity account
        </h2>
        <p className="mt-[0.35rem]">
          Already have an account?
          <span>
            <Link
              to={`/auth/signin?mode=${
                isActive === "learner" ? "learner" : "instructor"
              }`}
              className="text-primary-700"
            >
              {" "}
              Login
            </Link>
          </span>
        </p>

        <form method="post" onSubmit={handleSubmit}>
          <RoleSelection isActive={isActive} />
          <div className="flex justify-between mt-[2rem]">
            <Input
              id="name"
              type="text"
              element="input"
              isTouched={isTouched}
              placeholder="Name"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Please enter a name."
              className="w-[95%] relative bg-[#f7f7f7] rounded-[0.4rem] p-[0.8rem] border-0 focus:ring-0"
            />
            <Input
              id="email"
              type="text"
              element="input"
              isTouched={isTouched}
              placeholder="Email"
              validators={[VALIDATOR_EMAIL()]}
              onInput={inputHandler}
              errorText="Please enter a valid email."
              className="w-full relative bg-[#f7f7f7] rounded-[0.4rem] p-[0.8rem] border-0 focus:ring-0 ml-auto"
            />
          </div>
          <Input
            id="password"
            type="password"
            element="input"
            isTouched={isTouched}
            placeholder="Password"
            validators={[VALIDATOR_PASSWORD()]}
            onInput={inputHandler}
            errorText="Password  atleast 7 length (1 special, uppercase, lowercase character)."
            className="w-full relative bg-[#f7f7f7] rounded-[0.4rem] p-[0.8rem] mt-[1.5rem] border-0 focus:ring-0"
          />

          <Button type="submit" className="mt-[2rem]">
            Sign-up
          </Button>
          {/* <div className={classes.divider}>or</div>
          <button
            className="w-full flex items-center justify-center border-[1px] border-[#BDBDBD] rounded-[0.4rem] p-[.8rem] gap-2 mt-5"
            onClick={googleAuthHandler}
          >
            <span>
              <img src={googleIcon} alt="google" />
            </span>
            Sign-up using google
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
