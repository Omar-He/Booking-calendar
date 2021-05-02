import React, { useState } from "react";
import "./submitPanel.scss";
const SubmitPanel = ({ onSubmitSlot }) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const onSubmit = () => {
    setInputValue("");
    onSubmitSlot(inputValue);
  };
  return (
    <div className="bottom-panel">
      <span>Call reason</span>
      <input value={inputValue} onChange={onInputChange} />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default SubmitPanel;
