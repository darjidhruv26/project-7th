import React, { useEffect, useState } from "react";
import CourseItem from "./CourseItem";
import { getCourseById, getMyCourses } from "../../../services/apiCourse";
import { defer } from "react-router-dom";
import Spinner from "../../ui/Spinner";

const MyCourse = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchmyCourses = async () => {
      const response = await getMyCourses();
      const myCoursesIdList = response.body.message;

      const fetchedList = await Promise.all(
        myCoursesIdList.map(async (courseId) => {
          const res = await getCourseById(courseId);
          return res.body.message;
        })
      );
      setIsLoading(false);
      setMyCourses(fetchedList);
    };
    fetchmyCourses();
  }, []);

  return (
    <>
      <div className="px-[6rem] pt-4 text-xl font-semibold">
        <h3>All our Courses</h3>
      </div>
      <div className="text-center grid grid-cols-2 gap-y-10 w-full pt-5 pb-8 px-[6rem] h-[350px]">
        {isLoading && (
          <Spinner parent={true} className="m-auto col-span-2 w-16" />
        )}
        {myCourses.map((course) => {
          return (
            <CourseItem
              course={course}
              key={course._id}
              view="all"
              isPurchased={true}
            />
          );
        })}
      </div>
    </>
  );
};

export default MyCourse;

export async function loader() {
  const response = await getMyCourses();
  const courseList = response.body.message;
  return defer({
    data: Promise.all(
      courseList.map(async (courseId) => {
        const res = await getCourseById(courseId);
        return res.body.message;
      })
    ),
  });
}
