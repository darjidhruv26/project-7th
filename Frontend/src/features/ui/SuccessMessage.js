import iconTrue from "../../assets/icons/i-true.svg";

function SuccessMessage({ content }) {
  return (
    <p className="flex items-center gap-2 p-[.85rem] text-base text-[#047416] rounded-[.4rem] bg-[#CEFDD6] border border-[#047416]">
      <span>
        <img src={iconTrue} alt="true" />
      </span>
      {content}
    </p>
  );
}

export default SuccessMessage;
