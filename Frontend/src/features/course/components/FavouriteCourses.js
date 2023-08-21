import { Link } from "react-router-dom";
import CourseItem from "./CourseItem";
import {
  getCourseById,
  getFavouriteCoursesId,
} from "../../../services/apiCourse";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";

function FavouriteCourses() {
  const [isLoading, setIsLoading] = useState(true);
  const [favouriteCourse, setFavouriteCourse] = useState([]);

  useEffect(() => {
    const fetchFavouriteCourse = async () => {
      const response = await getFavouriteCoursesId();
      const favouritecourseIdList = response.body.message;

      const fetchedList = await Promise.all(
        favouritecourseIdList.map(async (courseId) => {
          const res = await getCourseById(courseId);
          return res.body.message;
        })
      );
      setIsLoading(false);
      setFavouriteCourse(fetchedList);
    };
    fetchFavouriteCourse();
  }, []);

  if (favouriteCourse.length === 0 && !isLoading) {
    return (
      <h1 className="space-x-3 text-xl font-semibold mx-24 mt-10">
        <span>No Favourite Courses</span>
        <Link className="text-primary-700" to="/">
          Wanna add some?
        </Link>
      </h1>
    );
  }

  return (
    <div>
      <div className="mx-24 mt-10 text-xl font-semibold">
        <h3>Wish listed courses</h3>
      </div>
      <div className="text-center grid grid-cols-2 gap-y-10 w-full pt-5 pb-8 px-[6rem] h-[350px]">
        {favouriteCourse.length !== 0 &&
          !isLoading &&
          favouriteCourse.map((course) => {
            return <CourseItem course={course} key={course._id} view="all" />;
          })}
        {isLoading && (
          <Spinner parent={true} className="m-auto col-span-2 w-16" />
        )}
      </div>
    </div>
  );
}

export default FavouriteCourses;
