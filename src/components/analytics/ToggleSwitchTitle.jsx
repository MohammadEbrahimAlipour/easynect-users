import React, { useState } from "react";

const ToggleSwitch = ({ isChecked, toggleSwitch, leftLabel, rightLabel }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* برچسب سمت چپ */}
      <span
        className={`text-sm font-medium ${
          !isChecked ? "text-dark" : "text-gray-400"
        }`}
      >
        {leftLabel}
      </span>

      {/* سوییچ */}
      <div className="inline-block w-[50px] align-middle select-none">
        <input
          type="checkbox"
          id="toggle-switch"
          className="hidden"
          checked={isChecked}
          onChange={toggleSwitch}
        />
        <label
          htmlFor="toggle-switch"
          className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${
            isChecked ? "bg-[#E2C7A7]" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform ${
              isChecked ? "translate-x-full" : "translate-x-0"
            } transition-transform duration-300 ease-in-out`}
          ></div>
        </label>
      </div>

      {/* برچسب سمت راست */}
      <span
        className={`text-sm font-medium ${
          isChecked ? "text-dark" : "text-gray-400"
        }`}
      >
        {rightLabel}
      </span>
    </div>
  );
};

export default ToggleSwitch;
