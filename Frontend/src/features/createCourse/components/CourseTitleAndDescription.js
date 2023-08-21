import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../auth/form-hook";
import Input from "../../ui/input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../utils/validators";
import Button from "../../ui/Button";
import { courseOverview } from "../create-course-slice";
import { useDispatch } from "react-redux";

const CourseTitleAndDescription = () => {
  const [isTouched, setIsTouched] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsTouched(true);
    if (!formState.isValid) {
      return;
    }
    dispatch(
      courseOverview({
        courseTitle: formState.inputs.title.value,
        courseDescription: formState.inputs.description.value,
      })
    );
    navigate("/create-course/2");
  };
  return (
    <form method="post" onSubmit={handleSubmit}>
      <Input
        id="title"
        type="text"
        element="input"
        isTouched={isTouched}
        placeholder="Enter course name"
        validators={[
          VALIDATOR_REQUIRE(),
          VALIDATOR_MINLENGTH(8),
          VALIDATOR_MAXLENGTH(25),
        ]}
        onInput={inputHandler}
        errorText="Please enter at least 8 characters in title. (maximum 25 allowed)"
        className="w-full relative rounded-[0.4rem] p-[0.8rem] mt-[2rem] border-0 focus:ring-0 ml-auto"
      />
      <Input
        id="description"
        element="input"
        isTouched={isTouched}
        placeholder="Enter course description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(100)]}
        onInput={inputHandler}
        errorText="Please enter minimum 1 chracter or maximum 100 charcters allowed."
        className="w-full relative  rounded-[0.4rem] p-[0.8rem] mt-[1.5rem] border-0 focus:ring-0"
      />

      <Button type="submit" className="mt-10">
        Next
      </Button>
    </form>
  );
};

export default CourseTitleAndDescription;
