import React from "react";
import { Helmet } from "react-helmet";

import CreateCourseModule from "../features/createCourse/components/CreateCourseModule";

const CreateCourseModules = () => {
  return (
    <>
      <Helmet>
        <title>Create modules | coursefinity</title>
        <meta
          name="description"
          content="coursefinity are here to meet indian educators with the student from every corner of india"
        />
      </Helmet>
      <CreateCourseModule />
    </>
  );
};

export default CreateCourseModules;
