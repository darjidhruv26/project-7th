import { Helmet } from "react-helmet";
import FavouriteCourses from "../features/course/components/FavouriteCourses";

function FavouriteCourse() {
  return (
    <>
      <Helmet>
        <title>favourite</title>
        <meta
          name="description"
          content="This is Hero section for user it self to explore thier own wish"
        />
      </Helmet>
      <FavouriteCourses />
    </>
  );
}

export default FavouriteCourse;
