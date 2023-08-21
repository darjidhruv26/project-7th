import i1 from "../../../assets/icons/i-language.svg";
import i2 from "../../../assets/icons/i-clcok.svg";
import i3 from "../../../assets/icons/i-question-box.svg";
import i4 from "../../../assets/icons/i-pad.svg";
import Button from "../../ui/Button";

import CourseAccordion from "./CourseAccordion";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";

function CourseDetails({ courseData, isLoading }) {
  const params = useParams();
  const navigate = useNavigate();

  const {
    courseTitle,
    courseDescription,
    courseLanguage,
    coursePrice,
    courseDuration,
    courseTotalAssignment,
    courseTotalQuiz,
    courseIntroVideoUrl,
    courseAuthorImage,
    courseModules,
  } = courseData;

  const checkoutButtonHandnler = (courseId) => {
    navigate(`/course-checkout/${courseId}`);
  };

  if (isLoading) {
    return <Spinner parent={true} className="w-14 m-auto col-span-4" />;
  }

  return (
    <>
      <div className="grid grid-cols-3 text-md px-[6rem] py-6 gap-6 relative ">
        <div className="w-full h-[500px] col-span-2 ">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${courseIntroVideoUrl}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
        <div className="bg-white p-[28px] border-[#D0D0D0] border">
          <h2 className="text-[40px] font-semibold leading-[48px] pt-3">
            {courseTitle}
          </h2>
          <p className="text-base leading-[19.2px] text-[#717E8E]">
            {courseDescription}
          </p>
          <div>
            <p className="pt-3">
              <span className="inline-block mr-3">
                <img src={i1} alt="" />
              </span>
              {courseLanguage}
            </p>
            <p className="pt-3">
              <span className="inline-block  mr-3">
                <img src={i2} alt="" />
              </span>
              {courseDuration || "24 hours Lecture Video"}
            </p>
            <p className="pt-3">
              <span className="inline-block  mr-3">
                <img src={i3} alt="" />
              </span>
              {`${courseTotalQuiz || 2} Quiz`}
            </p>
            <p className="pt-3">
              <span className="inline-block  mr-3">
                <img src={i4} alt="" />
              </span>

              {`${courseTotalAssignment || 4} Assigment`}
            </p>
            <p className="font-bold text-4xl mt-5">&#36;{coursePrice}</p>
          </div>
          <Button
            className="mt-2 text-xl font-semibold"
            onClick={() => checkoutButtonHandnler(params.courseId)}
          >
            Buy now
          </Button>
        </div>
        <div className="bg-white col-span-2">
          <CourseAccordion modules={courseModules} />
        </div>
        <div className="border-[#D0D0D0] border z-50 px-5 py-3 flex gap-5 items-center bg-white ">
          <img
            src={courseAuthorImage}
            alt="instructor"
            className="w-[5rem] h-[5rem] rounded-full"
          />
          <div>
            <p className="text-base font-semibold">instructor:</p>
            <p className="text-lg font-medium text-gray-400">
              {"Jenny Wilson"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetails;
