import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import Card from "../../ui/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToFavourite, removeFromFavourite } from "../favorite-slice";
import { getIsAuthenticated } from "../../auth/auth-slice";
import {
  favouriteCourse,
  removefavouriteCourse,
} from "../../../services/apiCourse";

function CourseItem({ course, view = "some", isPurchaed = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = JSON.parse(localStorage.getItem("user"))?.data.email;

  const isAuthenticated = useSelector(getIsAuthenticated);

  const wishlistAddButtonHandler = async function (id) {
    if (!isAuthenticated) {
      return navigate("/auth/signin?mode=learner");
    }
    dispatch(addToFavourite(id));
    try {
      const response = favouriteCourse(id, email);
      const data = await response;
      console.log(data.body);
    } catch (err) {
      console.log(err.message);
    }
  };
  const wishlistRemoveButtonHandler = function (id) {
    if (!isAuthenticated) {
      return navigate("/auth/signin?mode=learner");
    }
    dispatch(removeFromFavourite(id));
    try {
      removefavouriteCourse(id, email);
    } catch (err) {
      console.log(err.message);
    }
  };

  const favouriteCoursesList = useSelector(
    (state) => state.favourite.favouriteCourses
  );

  const showCourseDetailHandler = (e, courseId) => {
    const elementId = e.target.parentElement.id;
    if (elementId || e.target.id === "wishlist-icon") {
      return;
    } else if (isAuthenticated && isPurchaed) {
      navigate(`/learning?id=${courseId}&module=1`);
    } else {
      navigate(`/${courseId}`);
    }
  };

  return (
    <Card
      courseId={course._id}
      className={`bg-white w-[85%] h-[300px] overflow-hidden cursor-pointer ${
        view === "all" ? "flex w-[96%] h-[200px]" : "block "
      }`}
      onClick={(e) => showCourseDetailHandler(e, course._id)}
    >
      <div>
        <img
          src={course.courseImageUrl}
          alt={course.courseTitle}
          className={`bg-cover ${
            view === "all"
              ? "h-[200px] w-[320px] overflow-hidden"
              : "w-full h-[180px]"
          }`}
        />
      </div>
      <div className="p-4 flex-grow ">
        <div className="flex justify-between text-stone-400">
          <p>{course.courseDuration || "12hr 99min"}</p>
          {!favouriteCoursesList.includes(course._id) && (
            <FontAwesomeIcon
              icon={regularHeart}
              onClick={() => wishlistAddButtonHandler(course._id)}
              id="wishlist-icon"
            />
          )}
          {favouriteCoursesList.includes(course._id) && (
            <FontAwesomeIcon
              icon={solidHeart}
              onClick={() => wishlistRemoveButtonHandler(course._id)}
              className="text-red-500"
              id="wishlist-icon"
            />
          )}
        </div>
        <h2 className="mt-3 text-left font-semibold">{course.courseTitle}</h2>
      </div>
    </Card>
  );
}

export default CourseItem;
