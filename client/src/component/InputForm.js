import React from "react";

const InputForm = (props) => {
  return (
    <div className="form-wrapper">
      <label htmlFor="review">{props.title}</label>
      <input
        className="form-input"
        id="review"
        type="text"
        placeholder="Review"
        {...props}
      />
    </div>
  );
};

export default InputForm;
