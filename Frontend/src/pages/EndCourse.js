import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  VALIDATOR_MAX,
  VALIDATOR_MIN,
  VALIDATOR_REQUIRE,
} from "../utils/validators";
import Button from "../features/ui/Button";
import useForm from "../features/auth/form-hook";
import Input from "../features/ui/input";
import DragNDrop from "../features/ui/DragNDrop";
import { useDispatch, useSelector } from "react-redux";
import {
  coursePrice,
  courseThubnail,
} from "../features/createCourse/create-course-slice";
import { useNavigate } from "react-router-dom";

const EndCoursePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courseData = useSelector((state) => state.createCourse);
  const [isTouched, setIsTouched] = useState(false);
  const [thumbnail, setThumbnail] = useState([]);
  const [formState, inputHandler] = useForm(
    {
      price: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const assignmentDropHandler = (files) => {
    setThumbnail(files);
  };
  const handleSubmit = () => {
    // dispatch(courseThubnail({ fileName: thumbnail[0].name }));
    dispatch(coursePrice({ price: formState.inputs.price.value }));
  };

  const courseFinishHandler = async (event) => {
    event.preventDefault();
    setIsTouched(true);
    if (!formState.isValid) {
      return;
    }
    try {
      const response = await fetch(`/createCourse`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
      console.log(response);
      navigate("/my-courses");
    } catch (err) {
      console.log(`${err.message}💥💥💥💥💥💥`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Course summary | coursefinity</title>
        <meta
          name="description"
          content="coursefinity are here to meet indian educators with the student from every corner of india"
        />
      </Helmet>
      <div className="flex flex-col m-auto mt-5 w-[24rem]">
        <h2 className="font-bold text-[1.5rem] leading-[1.8rem] text-center">
          Create your Course
        </h2>
        <form
          method="post"
          onSubmit={courseFinishHandler}
          encType="multipart/form-data"
        >
          <Input
            id="price"
            type="text"
            element="input"
            placeholder="Enter course price"
            isTouched={isTouched}
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MIN(0),
              VALIDATOR_MAX(10000),
            ]}
            onInput={inputHandler}
            errorText="Please enter a valid course price (0-10000)."
            className="w-full relative rounded-[0.4rem] p-[0.8rem] mt-[2rem] border-0 focus:ring-0 ml-auto"
          />
          <div className="mt-[3rem] text-xl tracking-[0.35px] font-semibold text-[#585858]">
            Upload thumbnail for your course
          </div>
          <DragNDrop
            className="mt-2"
            onDropFile={assignmentDropHandler}
            accept=".jpg,.jpeg,.png,.gif,.svg"
          />

          <Button type="button" className="mt-10" onClick={handleSubmit}>
            submit
          </Button>
          <Button type="submit" className="mt-10">
            store data
          </Button>
        </form>
      </div>
    </>
  );
};

export default EndCoursePage;
