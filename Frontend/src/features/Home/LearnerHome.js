import CourseItem from "../course/components/CourseItem";
import { Link } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { useEffect, useState } from "react";
import {
  getCourseById,
  getCourseList,
  getMyCourses,
} from "../../services/apiCourse";

const CourseShowCase = ({ courseList, isPurchased }) => {
  return (
    <>
      {courseList.map((course) => (
        <CourseItem
          course={course}
          key={course._id}
          isPurchased={isPurchased}
        />
      ))}
    </>
  );
};

function LearnerHome() {
  const [courseList, setCourseList] = useState([]);
  const [myCourseList, setMyCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCourse = async () => {
      const response = await getCourseList();
      const coursesList = response.body.message;

      const responseMyList = await getMyCourses();
      const myCourseList = responseMyList.body.message;
      const fetchedList = await Promise.all(
        myCourseList.map(async (courseId) => {
          const res = await getCourseById(courseId);
          return res.body.message;
        })
      );
      setIsLoading(false);
      setCourseList(coursesList);
      setMyCourseList(fetchedList);
    };
    fetchCourse();
  }, []);

  return (
    <>
      <h1 className="space-x-3 text-xl font-semibold mx-24 mt-10">
        <span>Continue your learning Courses</span>
        <Link className="text-primary-700" to="/my-courses">
          View all
        </Link>
      </h1>
      <div
        className={`text-center grid w-full pt-5 pb-8 px-[6rem] gap-y-5 grid-cols-4 h-[350px]`}
      >
        {isLoading && (
          <Spinner parent={true} className="w-14 m-auto col-span-4" />
        )}
        {!isLoading && (
          <CourseShowCase courseList={myCourseList} isPurchased={true} />
        )}
      </div>
      <h1 className="space-x-3 text-xl font-semibold mx-24 mt-10">
        <span>Recommended Courses</span>
      </h1>
      <div
        className={`text-center grid w-full pt-5 pb-8 px-[6rem] gap-y-5 grid-cols-4 h-[350px]`}
      >
        {isLoading && (
          <Spinner parent={true} className="w-14 m-auto col-span-4" />
        )}
        {!isLoading && <CourseShowCase courseList={courseList} />}
      </div>
    </>
  );
}

export default LearnerHome;
