import React from "react";
import CreateCourses from "../features/createCourse/CreateCourses";
import { Helmet } from "react-helmet";

const CreateCoursePage = () => {
  return (
    <>
      <Helmet>
        <title>Create Course | coursefinity</title>
        <meta
          name="description"
          content="coursefinity are here to meet indian educators with the student from every corner of india"
        />
      </Helmet>
      <CreateCourses />
    </>
  );
};

export default CreateCoursePage;
