import Link from "next/link";
import React from "react";

const Item = ({ title, icon, iconDark, isCenter, href = "" }) => {
  return (
    <Link
      target="_blank"
      href={href}
      className={`px-1 flex items-center justify-center transition-all duration-300 ${
        isCenter ? "slick-center" : "bg-white"
      }`}
    >
      <div className="flex flex-col items-center justify-center s">
        <div
          className={`border-[1px] rounded-lg w-[64px] h-[64px] flex justify-center items-center 
        ${isCenter ? "bg-dark" : ""}`}
        >
          {/* {icon} */}
          {isCenter ? icon : iconDark}
        </div>
        {isCenter && <p className="text-xs mt-3">{title}</p>}
      </div>
    </Link>
  );
};

export default Item;
