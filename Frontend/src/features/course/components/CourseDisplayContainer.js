import React, { useState } from "react";
import DownloadAssignment from "./DownloadAssignment";
import DragNDrop from "../../ui/DragNDrop";
import { stringConverter } from "../../../utils/helper";
import Button from "../../ui/Button";

const CourseDisplayContainer = ({ moduleType, courseIntroVideoUrl }) => {
  const [assignment, setAssignment] = useState([]);
  const assignmentDropHandler = (files) => {
    setAssignment(files);
  };

  const assignmentSubmitHandler = () => {
    setAssignment([]);
  };

  const handleCancelUpload = (event) => {
    event.stopPropagation();
    const selectedFileName =
      event.target.parentElement.querySelector("p").textContent;

    setAssignment((prevState) => {
      return prevState.filter((file) => {
        return stringConverter(file.name, 15) !== selectedFileName;
      });
    });
  };

  if (moduleType === "assignment" || moduleType === "notes") {
    return (
      <div className="mx-6 py-10">
        <div className="flex items-start justify-between gap-16">
          <p className="text-[#717E8E] text-[17px]">
            Become a full-stack web developer with just one course. HTML, CSS,
            Javascript, Node, React, MongoDB, Web3 and DApps Bla bla what to do
            in assignment
          </p>
          <span className="font-medium text-2xl">
            0/<span className="text-[#717E8E]">10</span>
          </span>
        </div>
        <DownloadAssignment
          fileName="vaju_BT-12.pdf"
          className="hover:shadow-md mt-10"
        />
        <div className="mt-[3rem]  text-xl tracking-[0.35px] font-semibold">
          Submit assignment
        </div>
        {assignment.length === 0 && (
          <DragNDrop
            className="mt-2"
            onDropFile={assignmentDropHandler}
            accept=".pdf"
          />
        )}

        <ul>
          {assignment.map((file, index) => (
            <li
              key={index}
              className="bg-[#e5d4ff] w-fit flex items-center font-semibold gap-2 px-2 rounded-md mt-2"
            >
              <p className="text-primary-700">
                {stringConverter(file.name, 15)}
              </p>
              <span
                className="cursor-pointer text-black text-[1.85rem] font-light"
                onClick={handleCancelUpload}
              >
                &times;
              </span>
            </li>
          ))}
        </ul>
        {assignment.length !== 0 && (
          <Button
            type="button"
            className="mt-4 absolute bottom-6"
            width="w-fit"
            onClick={assignmentSubmitHandler}
          >
            Submit assignment
          </Button>
        )}
      </div>
    );
  }
  if (moduleType === "quiz") {
    <div>go to quiz page</div>;
  }
  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${courseIntroVideoUrl}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      className="w-full h-full"
      allowFullScreen
    ></iframe>
  );
};

export default CourseDisplayContainer;
