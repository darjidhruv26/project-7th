import React from "react";
import { Link } from "react-router-dom";

import classes from "./styles/Role.Selection.module.css";

const RoleSelection = ({ isActive }) => {
  return (
    <div
      id={classes["toggle-box"]}
      className="flex justify-between w-full rounded-full mt-[2rem]"
    >
      <Link
        to="?mode=learner"
        className={`rounded-full py-[0.5rem] w-[49%] text-center font-bold box-border ${
          isActive === "learner"
            ? "border-primary-700 border-2 py-[0.375rem]"
            : ""
        }`}
      >
        Learner
      </Link>
      <Link
        to="?mode=instructor"
        className={`rounded-full py-[0.5rem] w-[49%] text-center font-bold box-border ${
          isActive === "instructor"
            ? "border-primary-700 border-2 py-[0.375rem]"
            : ""
        }`}
      >
        Instructor
      </Link>
    </div>
  );
};

export default RoleSelection;
