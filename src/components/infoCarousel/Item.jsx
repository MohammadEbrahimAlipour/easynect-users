import React from "react";

const Item = ({ title, icon, isCenter }) => {
  return (
    <div
      className={`px-1 flex items-center justify-center ${
        isCenter ? "slick-center" : ""
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="border-[1px] rounded-lg">{icon}</div>
        {isCenter && <p className="text-xs mt-3">{title}</p>}
      </div>
    </div>
  );
};

export default Item;
