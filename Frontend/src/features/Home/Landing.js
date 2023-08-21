import React from "react";

import Courses from "../course/Courses";
import LearnerHome from "./LearnerHome";
import InstructorHome from "./InstructorHome";
import { useSelector } from "react-redux";

function Landing() {
  const role = useSelector((state) => state.auth.role);

  if (role === "learner") {
    return <LearnerHome />;
  } else if (role === "instructor") {
    return <InstructorHome />;
  }
  return <Courses />;
}

export default Landing;
