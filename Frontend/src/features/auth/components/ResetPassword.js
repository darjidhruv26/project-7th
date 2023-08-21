import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import SuccessMessage from "../../ui/SuccessMessage";
import useForm from "../form-hook";
import { resetPassword } from "../../../services/apiAuth";
import Input from "../../ui/input";
import { VALIDATOR_PASSWORD } from "../../../utils/validators";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function ResetPassword() {
  const [isTouched, setIsTouched] = useState(false);
  const [displayPop, setDisplayPop] = useState(false);
  const navigate = useNavigate();
  const [formState, inputHandler] = useForm(
    {
      password: {
        value: "",
        isValid: false,
      },
      cpassword: {
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
    try {
      const resetPasswordData = {
        pass: formState.inputs.password.value,
        cpass: formState.inputs.cpassword.value,
      };
      if (resetPasswordData.pass !== resetPasswordData.cpass) {
        toast.error("Passowrd not matched!", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
      const response = await resetPassword(resetPasswordData);
      console.log(response);
      if (response.ok) {
        setDisplayPop(true);
        setTimeout(() => {
          navigate("/auth/signin?mode=learner");
        }, [3000]);
      }
    } catch (err) {
      navigate("/error");
    }
  };

  useEffect(() => {
    let timeoutId;

    if (displayPop) {
      timeoutId = setTimeout(() => {
        setDisplayPop(false);
      }, 2500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [displayPop]);

  return (
    <div className="bg-[#c4c4c4] h-screen flex justify-center items-center">
      <div className="relative flex flex-col w-[24rem] row-span-5 ">
        <form method="post" onSubmit={handleSubmit}>
          <h2 className="font-bold text-[1.5rem] leading-[1.8rem]">
            Reset password
          </h2>
          <Input
            id="password"
            type="password"
            element="input"
            isTouched={isTouched}
            placeholder="Password"
            validators={[VALIDATOR_PASSWORD()]}
            onInput={inputHandler}
            errorText="Password required.(Abc@123 follow format.)"
            className="w-full relative bg-[#f7f7f7] rounded-[0.4rem] p-[0.8rem] mt-[1.5rem] border-0 focus:ring-0"
          />
          <Input
            id="cpassword"
            type="text"
            element="input"
            isTouched={isTouched}
            placeholder="Confirm password"
            validators={[VALIDATOR_PASSWORD()]}
            onInput={inputHandler}
            errorText="Confirm password required."
            className="w-full relative bg-[#f7f7f7] rounded-[0.4rem] p-[0.8rem] mt-[1.5rem] border-0 focus:ring-0"
          />
          <Button type="submit" className="mt-[2rem]">
            Reset
          </Button>
        </form>
        {displayPop && (
          <div className="w-full absolute -bottom-[5rem] animate-slideupanime">
            <SuccessMessage content={"Password changed successful"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
