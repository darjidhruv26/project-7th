import React from "react";
import ipdf from "../../../assets/icons/i-pdf.svg";

const DownloadAssignment = ({ fileName, className }) => {
  const handleDownloadPDFClick = () => {
    const pdfUrl = process.env.PUBLIC_URL + `/${fileName}`;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    link.download = "assignment.pdf";
    link.click();
  };
  return (
    <button
      className={`border-[#F15D5D] border-2 flex gap-2 font-bold px-2 py-3 rounded-lg bg-white ${className}`}
      onClick={handleDownloadPDFClick}
    >
      <span>
        <img src={ipdf} alt="pdf" className="w-6 inline-block" />
      </span>
      Assignment details
    </button>
  );
};

export default DownloadAssignment;
