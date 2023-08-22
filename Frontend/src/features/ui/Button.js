import React from "react";

const Button = ({
  children,
  className,
  disabled,
  onClick,
  id,
  type = "submit",
  typeName = "primary",
  width = "w-full",
}) => {
  const classes = `${className} ${width} bg-primary-700 hover:bg-primary-600 active:bg-primary-700 focus:outline-none hover:scale-x-[1.02] focus:ring-offset-2 focus:ring focus:ring-primary-300 p-[0.8rem] text-white rounded-[0.4rem] disabled:cursor-not-allowed disabled:bg-stone-300 transition`;
  if (typeName === "secondary") {
    return (
      <button
        type={type}
        id={id}
        className={`${className} bg-transparent px-5 text-purple-700 border-primary-700 border-2 rounded-[0.4rem] p-[10.8px] box-content`}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      type={type}
      id={id}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
