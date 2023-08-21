import React, { useRef } from "react";
import iprimaryplus from "../../assets/icons/i-grey-plus.svg";

const UploadButton = ({
  content,
  accept = ".mp4,.webm,.mov,.mkv",
  onSelectFile,
}) => {
  const fileInputRef = useRef(null);
  const handleFileInputChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      onSelectFile([...selectedFiles]);
    }
  };
  const handleUploadAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div
        className="flex items-center bg-transparent border-[#808080] border-2 rounded-full px-2 py-1 w-fit  cursor-pointer relative hover:shadow-lg"
        onClick={handleUploadAreaClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept={accept}
          className="absolute h-full w-full hidden"
          id="fileUpload"
          onChange={handleFileInputChange}
          multiple
        />
        <img
          src={iprimaryplus}
          className="inline mr-3 mt-[2px]"
          alt="primary plus"
        />
        <span className="text-[#808080]">{content}</span>
      </div>
    </>
  );
};

export default UploadButton;
