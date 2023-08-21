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
  const classes = `${className} bg-primary-700 ${width} p-[0.8rem] text-white rounded-[0.4rem] disabled:cursor-not-allowed disabled:bg-stone-300`;
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
