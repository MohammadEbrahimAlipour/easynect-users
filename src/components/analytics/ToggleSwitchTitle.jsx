import React from "react";

const ToggleSwitch = ({ isChecked, toggleSwitch, leftLabel, rightLabel }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      {/* Left label */}
      <span
        className={`text-sm font-semibold transition-colors duration-300 ${
          !isChecked ? "text-gray-900" : "text-gray-400"
        }`}
      >
        {leftLabel}
      </span>

      {/* Switch */}
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          id="toggle-switch"
          className="sr-only"
          checked={isChecked}
          onChange={toggleSwitch}
        />

        <label
          htmlFor="toggle-switch"
          className={`relative flex items-center w-[54px] h-[28px] rounded-full cursor-pointer 
            transition-all duration-300 ease-out
            ${
              isChecked
                ? "bg-gradient-to-r from-[#E8D1B0] to-[#C6AC85] shadow-[0_0_10px_rgba(198,172,133,0.6)]"
                : "bg-gray-300"
            }`}
        >
          {/* Thumb */}
          <span
            className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white 
              shadow-md transition-all duration-300 ease-out
              ${
                isChecked
                  ? "translate-x-[26px] shadow-[0_4px_12px_rgba(198,172,133,0.6)]"
                  : "translate-x-0"
              }`}
          />
        </label>
      </div>

      {/* Right label */}
      <span
        className={`text-sm font-semibold transition-colors duration-300 ${
          isChecked ? "text-gray-900" : "text-gray-400"
        }`}
      >
        {rightLabel}
      </span>
    </div>
  );
};

export default ToggleSwitch;
