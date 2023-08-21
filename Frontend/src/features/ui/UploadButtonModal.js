import React from "react";
import iprimaryplus from "../../assets/icons/i-grey-plus.svg";

const UploadButtonModal = ({ onOpenModal, content }) => {
  return (
    <div
      className="flex items-center bg-transparent border-[#808080] border-2 rounded-full px-2 py-1 w-fit  cursor-pointer relative hover:shadow-lg"
      onClick={onOpenModal}
    >
      <img
        src={iprimaryplus}
        className="inline mr-3 mt-[2px]"
        alt="primary plus"
      />
      <span className="text-[#808080]">{content}</span>
    </div>
  );
};

export default UploadButtonModal;
