import React from "react";
import { Helmet } from "react-helmet";
import MyCourse from "../features/course/components/MyCourse";

const MyCourses = () => {
  return (
    <>
      <Helmet>
        <title>my course | coursefinity</title>
        <meta
          name="description"
          content="coursefinity are here to meet indian educators with the student from every corner of india"
        />
      </Helmet>
      <MyCourse />
    </>
  );
};

export default MyCourses;
