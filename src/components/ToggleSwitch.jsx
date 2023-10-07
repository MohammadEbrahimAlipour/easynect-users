import React, { useState } from "react";

const ToggleSwitch = ({ id, isChecked, toggleSwitch }) => {
  const handleToggle = () => {
    toggleSwitch();
  };

  return (
    <div id={id} className="flex items-center justify-center">
      <div className="inline-block w-[50px] mr-2 align-middle select-none transition-all duration-1000 ease-in">
        <input
          type="checkbox"
          name="toggle"
          id={`toggle-${id}`}
          className="toggle-checkbox absolute appearance-none cursor-pointer"
          checked={isChecked}
          onChange={handleToggle}
        />
        <label
          htmlFor={`toggle-${id}`}
          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        >
          <div
            className={`toggle-handle w-6 h-6 bg-white rounded-full shadow-md transform ${
              isChecked ? "translate-x-full" : "translate-x-0"
            } transition-transform duration-300 ease-in-out`}
          ></div>
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
