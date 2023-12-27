import { EditItemPageView } from "@/components/Icons";
import Link from "next/link";
import React from "react";

const CarouselItems = ({
  title,
  icon,
  iconDark,
  onClick,
  isCenter,
  setIsCenterGlobal,
  updateIsCenterGlobal
}) => {
  return (
    <div
      onClick={() => {
        onClick();
        updateIsCenterGlobal(isCenter); // Call the function to update isCenterGlobal
      }}
      className={`px-1 flex items-center justify-center transition-all duration-300  ${
        isCenter ? "slick-center" : "bg-white"
      }`}
    >
      <div className="flex flex-col items-center justify-center s">
        <div
          className={`border-[1px]  rounded-lg w-[64px] h-[64px] flex justify-center items-center 
        ${isCenter ? "" : ""}`}
        >
          {/* {icon} */}
          {isCenter ? icon : iconDark}
        </div>
        {isCenter && (
          <p className="text-xs mt-3 whitespace-nowrap overflow-hidden">
            {title}
          </p>
        )}
      </div>
    </div>
  );
};

export default CarouselItems;
