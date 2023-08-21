import React, { useState } from "react";
import ipen from "../../../assets/icons/i-edit-pen.svg";
import CreateCourseModuleUploadSection from "./CreateCourseModuleUploadSection";
import Input from "../../ui/input";
import UploadModal from "../../ui/UploadModal";
import Button from "../../ui/Button";
import useForm from "../../auth/form-hook";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../utils/validators";
import { addCourseModule } from "../create-course-slice";
import { useDispatch } from "react-redux";

const ModuleContent = ({ count, moduleId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moduleTitle, setModuleTitle] = useState("Introduction");
  const [isTouched, setIsTouched] = useState(false);
  const dispatch = useDispatch();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const updateModuleHandler = () => {
    setIsTouched(true);
    if (!formState.isValid) {
      return;
    }
    setModuleTitle(formState.inputs.title.value);
    dispatch(
      addCourseModule({
        moduleId: moduleId,
        moduleTitle: formState.inputs.title.value,
        moduleDescription: formState.inputs.description.value,
        moduleDuration: "0.5 hourse",
        moduleType: "video",
      })
    );
    closeModalHandler();
  };

  return (
    <>
      <div className="flex items-center space-x-3 mt-3">
        <span className="opacity-[60%] text-[#23272C] text-xl font-bold">
          Module {count}:
        </span>
        <span className="font-medium text-lg">{moduleTitle}</span>
        <div className="cursor-pointer inline-block">
          <img src={ipen} alt="pen" onClick={openModalHandler} />
        </div>
        <UploadModal
          show={isModalOpen}
          onCancel={closeModalHandler}
          footer={
            <Button type="submit" onClick={updateModuleHandler}>
              Update
            </Button>
          }
          footerClass="mx-[1.5rem] px-0"
          headerClass="hidden"
        >
          <div className="my-[1rem] text-xl tracking-[0.35px] font-semibold">
            Update module
          </div>
          <Input
            id="title"
            element="input"
            placeholder="Enter module title"
            isTouched={isTouched}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(25)]}
            onInput={inputHandler}
            rows="7"
            errorText="Please enter a valid module title.(maximum 25 characters)"
            className="w-full relative  rounded-[0.4rem] p-[0.8rem] mt-[0rem] border-0 focus:ring-0 bg-[#F4F4F4]"
          />
          <Input
            id="description"
            element="input"
            placeholder="Enter module description"
            isTouched={isTouched}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(35)]}
            onInput={inputHandler}
            rows="7"
            errorText="Please enter a valid module description.(maximum 35 characters)"
            className="w-full relative rounded-[0.4rem] p-[0.8rem] mt-[1.6rem] border-0 focus:ring-0 bg-[#F4F4F4]"
          />
        </UploadModal>
      </div>
      <CreateCourseModuleUploadSection moduleId={moduleId} />
    </>
  );
};

export default ModuleContent;
