import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

const CourseNavigation = ({
  totalCourseModules,
  _id,
  courseModule,
  courseModules,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between col-span-2">
      <div className="text-2xl">
        {courseModules && courseModules[courseModule - 1]?.moduleDescription}
      </div>
      <div className="flex gap-3">
        {courseModule > 1 && (
          <Button
            type="button"
            typeName="secondary"
            onClick={() => {
              navigate(
                `?id=${_id}&module=${
                  +courseModule - 1 <= 0 ? +courseModule : +courseModule - 1
                }`
              );
            }}
          >
            Back
          </Button>
        )}
        {totalCourseModules > courseModule && (
          <Button
            type="button"
            className="w-fit"
            onClick={() => {
              navigate(
                `?id=${_id}&module=${
                  +courseModule + 1 > totalCourseModules
                    ? totalCourseModules
                    : +courseModule + 1
                }`
              );
            }}
          >
            Next Chapter
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseNavigation;
