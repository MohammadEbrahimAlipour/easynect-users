import React from "react";

const Devider = ({ text, className = "" }) => {
  return (
    <div className={`relative opacity-50 ${className}`}>
      <hr className="border-t-2 border-gray-300 flex justify-center items-center" />
      <div className="absolute inset-x-0 -top-3 text-center">
        <span className="bg-white px-2 text-muted text-sm">{text}</span>
      </div>
    </div>
  );
};

export default Devider;
