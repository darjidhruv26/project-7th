import { useNavigate } from "react-router-dom";

import iplus from "../../assets/icons/i-black-plus.svg";

function InstructorHome() {
  const navigate = useNavigate();
  const createCourseHandler = () => {
    navigate("/create-course/1");
  };
  return (
    <div className="bg-white inline-block mt-5 mx-3 rounded-lg hover:shadow">
      <button className="cursor-pointer p-4" onClick={createCourseHandler}>
        <img src={iplus} alt="plus" className="w-10 m-auto mb-3" />
        <span className="font-bold">Create a course</span>
      </button>
    </div>
  );
}

export default InstructorHome;
