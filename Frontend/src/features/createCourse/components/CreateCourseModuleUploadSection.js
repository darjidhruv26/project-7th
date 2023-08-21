import React, { useState } from "react";
import UploadButton from "../../ui/UploadButton";
import UploadButtonModal from "../../ui/UploadButtonModal";
import UploadModal from "../../ui/UploadModal";
import Button from "../../ui/Button";
import Input from "../../ui/input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../utils/validators";
import { stringConverter } from "../../../utils/helper";
import useForm from "../../auth/form-hook";
import DragNDrop from "../../ui/DragNDrop";
import { addCourseModule, uploadmoduleFile } from "../create-course-slice";
import { useDispatch } from "react-redux";

const CreateCourseModuleUploadSection = ({ moduleId }) => {
  const [files, setFiles] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const dispatch = useDispatch();

  const [formState, inputHandler] = useForm(
    {
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const selectFileHandler = (files) => {
    dispatch(uploadmoduleFile({ fileName: files[0].name, moduleId }));
    setFiles(files);
  };

  const openModalHandler = () => {
    setIsModalOpen(true);
  };
  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const handleCancelUpload = (event) => {
    event.stopPropagation();
    const selectedFileName =
      event.target.parentElement.querySelector("p").textContent;

    setFiles((prevState) => {
      return prevState.filter((file) => {
        return stringConverter(file.name, 15) !== selectedFileName;
      });
    });
  };

  const assignmentDropHandler = (files) => {
    setAssignment(files);
  };

  const moduleSubmitHandler = () => {
    setIsTouched(true);
    if (!formState.isValid) {
      return;
    }
    dispatch(
      addCourseModule({
        description: formState.inputs.description.value,
        moduleId: moduleId,
      })
    );
    dispatch(uploadmoduleFile({ fileName: assignment[0].name, moduleId }));
  };

  // console.log("Assignment:_______", assignment);
  return (
    <>
      <ul>
        {files.map((file, index) => (
          <li
            key={index}
            className="bg-[#e5d4ff] w-fit flex items-center font-semibold gap-2 px-2 rounded-md mt-2"
          >
            <p className="text-primary-700">{stringConverter(file.name, 15)}</p>
            <span
              className="cursor-pointer text-black text-[1.85rem] font-light"
              onClick={handleCancelUpload}
            >
              &times;
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-5 mt-5">
        <UploadButton content="Add video" onSelectFile={selectFileHandler} />
        <UploadButton
          content="Add quiz"
          accept=".docx,.pdf"
          onSelectFile={selectFileHandler}
        />
        <UploadButtonModal
          content="Add assignment"
          onOpenModal={openModalHandler}
          accept=".docx,.pdf"
          onSelectFile={selectFileHandler}
        />
        <UploadModal
          show={isModalOpen}
          onCancel={closeModalHandler}
          footer={
            <Button type="submit" onClick={moduleSubmitHandler}>
              Done
            </Button>
          }
          footerClass="mx-[1.5rem] px-0"
          headerClass="hidden"
        >
          <Input
            id="description"
            element="textarea"
            placeholder="Enter assignment description."
            isTouched={isTouched}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(150)]}
            onInput={inputHandler}
            rows="7"
            errorText="maximum 150 chracters allowed!"
            className="w-full relative  rounded-[0.4rem] p-[0.8rem] mt-[0rem] border-0 focus:ring-0 bg-[#F4F4F4]"
          />
          <div className="mt-[3rem] text-xl tracking-[0.35px] font-semibold">
            Upload assignmeny description pdf
          </div>
          <DragNDrop
            className="mt-2"
            onDropFile={assignmentDropHandler}
            accept=".pdf"
          />
        </UploadModal>
      </div>
    </>
  );
};

export default CreateCourseModuleUploadSection;
