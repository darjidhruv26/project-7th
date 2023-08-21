import React, { useEffect, useReducer } from "react";

import { validate } from "../../utils/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouched: false,
  });

  const { id, onInput, isTouched } = props;
  const { isValid, value } = inputState;

  useEffect(() => {
    onInput(id, isValid, value);
    if (isTouched) {
      dispatch({
        type: "TOUCH",
      });
    }
  }, [id, isValid, value, onInput, isTouched]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className={props.className}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 10}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        style={{ resize: "none" }}
        className={props.className}
        placeholder={props.placeholder}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p className="text-red-500 absolute text-sm">{props.errorText}</p>
      )}
    </div>
  );
};

export default Input;
