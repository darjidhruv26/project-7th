import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourseById } from "../../../services/apiCourse";
import CourseAccordion from "./CourseAccordion";
import Spinner from "../../ui/Spinner";
import CourseDisplayContainer from "./CourseDisplayContainer";
import CourseNavigation from "./CourseNavigation";

const LearningCoures = ({ courseId, courseModule }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState({});

  const { courseIntroVideoUrl, courseModules, _id, totalCourseModules } =
    courseData;

  useEffect(() => {
    const fecthCourse = async () => {
      try {
        const response = await getCourseById(courseId);

        if (!response.ok) {
          return navigate("/error");
        }

        const data = response.body.message;
        const totalCourseModules = +data.courseModules.length;

        const courseModules = data.courseModules.filter(
          (_, index) => index + 1 <= +courseModule
        );

        setCourseData({ ...data, courseModules, totalCourseModules });
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fecthCourse();
  }, [courseId, navigate, courseModule]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-3 text-md px-[6rem] py-6 gap-6 relative ">
      <div className="w-full h-[500px] col-span-2 bg-white relative">
        <CourseDisplayContainer
          moduleType={courseModules[courseModule - 1]?.moduleType}
          courseIntroVideoUrl={courseIntroVideoUrl}
        />
      </div>
      <div>
        {courseModules && !loading ? (
          <CourseAccordion modules={courseModules} />
        ) : null}
      </div>
      <CourseNavigation
        _id={_id}
        totalCourseModules={totalCourseModules}
        courseModule={courseModule}
        courseModules={courseModules}
      />
    </div>
  );
};

export default LearningCoures;
