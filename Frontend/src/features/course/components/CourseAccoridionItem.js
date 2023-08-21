import React, { useState } from "react";
import videoImg from "../../../assets/icons/i-video.svg";
import quizfillImg from "../../../assets/icons/i-fill-quiz.svg";
import assignfillImg from "../../../assets/icons/i-fill-assignment.svg";
import upArr from "../../../assets/icons/i-up-arrow.svg";
import downArr from "../../../assets/icons/i-down-arrow.svg";
import igreentick from "../../../assets/icons/i-green-tick.svg";

const CourseAccoridionItem = ({ items }) => {
  const [display, setDisplay] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = () => {
    setDisplay((prevState) => !prevState);
  };
  const userPurchasedCourse = true;

  const moduleSubmitHandler = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  let imageUrl;

  switch (items.moduleType) {
    case "assignment":
      imageUrl = assignfillImg;
      break;
    case "quiz":
      imageUrl = quizfillImg;
      break;
    case "notes":
      imageUrl = assignfillImg;
      break;
    default:
      imageUrl = videoImg;
      break;
  }
  return (
    <>
      <div className="border-x-[1px] border-t-[1px] border-[#D0D0D0] last:border-b-[1px] bg-white">
        <button
          type="button"
          onClick={handleClick}
          id="accordion_header"
          className="w-full flex items-center gap-3 px-2 py-3"
        >
          {display && (
            <span>
              <img src={upArr} alt="up arrow" />
            </span>
          )}
          {!display && (
            <span>
              <img src={downArr} alt="up arrow" />
            </span>
          )}
          <div>{items.moduleTitle}</div>
        </button>
        {display && (
          <div id="accordion_body">
            <div className="flex items-center gap-3 px-9 pb-3 cursor-pointer">
              {userPurchasedCourse && !isChecked && (
                <input
                  type="checkbox"
                  className="cursor-pointer checked:bg-primary-700 focus:ring-0 focus:ring-transparent border-primary-700 bg-transparent focus:ring-offset-0"
                  onClick={moduleSubmitHandler}
                />
              )}
              {userPurchasedCourse && isChecked && (
                <img
                  src={igreentick}
                  alt="green tick"
                  onClick={moduleSubmitHandler}
                />
              )}

              {!isChecked && (
                <span>
                  <img
                    src={imageUrl}
                    alt={items.moduleTitle}
                    className="w-5 h-9"
                  />
                </span>
              )}
              {items.moduleDescription}
              <span>{items.moduleDuration}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseAccoridionItem;
