import React, { useEffect, useState } from "react";

import CourseItem from "./components/CourseItem";

import img1 from "../../assets/inst1.svg";
import img2 from "../../assets/inst2.svg";
import img3 from "../../assets/inst3.svg";
import img4 from "../../assets/inst4.svg";

import { getCourseList } from "../../services/apiCourse";
import Spinner from "../ui/Spinner";

const CourseShowCase = ({ courseList }) => {
  return (
    <>
      {courseList.map((course) => {
        return <CourseItem course={course} key={course._id} />;
      })}
    </>
  );
};

const Courses = () => {
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await getCourseList();
      const courseList = response.body.message;
      setIsLoading(false);
      setCourseList(courseList);
    };
    fetchCourse();
  }, []);

  return (
    <>
      <p className="font-semibold text-2xl px-[6rem] pt-10 ">
        Recommended Courses
      </p>
      <div className="text-center grid grid-cols-2 w-full pt-5 pb-8 px-[6rem] gap-y-5 sm:grid-cols-3 md:grid-cols-4 h-[350px] grid-grow">
        {isLoading && (
          <Spinner parent={true} className="w-14 m-auto col-span-4" />
        )}
        {!isLoading && <CourseShowCase courseList={courseList} />}
      </div>
      <p className="font-semibold text-2xl px-[6rem] pt-10">
        Learn form your favorite instructor
      </p>
      <div className="grid grid-cols-4 px-[6rem] py-5 gap-12">
        <img src={img1} alt="insttructor 1" />
        <img src={img2} alt="insttructor 2" />
        <img src={img3} alt="insttructor 3" />
        <img src={img4} alt="insttructor 4" />
      </div>
    </>
  );
};

export default Courses;
