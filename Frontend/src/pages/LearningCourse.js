import React from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import LearningCoures from "../features/course/components/LearningCoures";

const LearningCourse = () => {
  const [searchParams] = useSearchParams("");

  return (
    <>
      <Helmet>
        <title>Learning couurse - coursefinity</title>
        <meta
          name="description"
          content="coursefinity are here to meet indian educators with the student from every corner of india"
        />
      </Helmet>
      <LearningCoures
        courseId={searchParams.get("id")}
        courseModule={searchParams.get("module")}
      />
    </>
  );
};

export default LearningCourse;
