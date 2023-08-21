import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.svg";

import DropDown from "../ui/DropDown";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const MainNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isInstructor = useSelector((state) => state.auth.role) === "instructor";
  const navigate = useNavigate();

  const showWishListHandler = () => {
    navigate("/wishlist");
  };

  const logoutSubmitHandler = (event) => {
    event.preventDefault();
    navigate("/logout");
  };

  return (
    <div className="flex bg-white items-center py-3 justify-between px-5 text-black text-base font-bold sticky top-0 z-50">
      <Link
        to="/"
        className="flex items-center space-x-4 row-span-1 w-12 cursor-pointer"
      >
        <img src={logo} alt="Coursefinity" className="w-12 h-12" />
        <span className="font-black capitalize text-xl">coursefinity</span>
      </Link>
      {!isAuthenticated && (
        <>
          <div>
            <DropDown
              main="developement"
              subHeading={"popular programs"}
              subMenu={[
                "Full Stack development",
                "IOS development",
                "React",
                "Java developer",
                "Blockchain developer",
              ]}
            />
            <DropDown
              main="design"
              subHeading={"designer programs"}
              subMenu={[
                "UI/UX designer",
                "Adobe XD",
                "Adove primier pro",
                "Blender",
              ]}
            />
            <DropDown
              main="Machine learning"
              subHeading={"python programs"}
              subMenu={[
                "Data analysis",
                "Data visualization",
                "Django",
                "python crash course",
              ]}
            />
          </div>
          <div>
            <Link className="px-5" to="auth/signin?mode=learner">
              Sign in
            </Link>
            <Link
              className="px-5 text-purple-700 border-primary-700 border-2 rounded-[4px] p-[1rem]"
              to="auth/signup?mode=learner"
            >
              Get started
            </Link>
          </div>
        </>
      )}
      {isAuthenticated && (
        <div className="flex items-center space-x-6">
          {!isInstructor && (
            <button onClick={showWishListHandler}>
              <FontAwesomeIcon icon={regularHeart} id="wishlist-icon" />
            </button>
          )}
          <Link to="/my-courses">My courses</Link>
          <form method="post" onSubmit={logoutSubmitHandler}>
            <button className="px-5 py-2 cursor-pointer">Logout</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MainNavbar;
