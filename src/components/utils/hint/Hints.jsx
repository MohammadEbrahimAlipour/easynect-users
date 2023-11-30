import { InfoIcon } from "@/components/Icons";
import React from "react";

const Hints = () => {
  return (
    <>
      <span className="flex justify-between items-center relative">
        <label htmlFor="icon" className="mb-2">
          اطلاعات را وارد کنید:
        </label>

        <span
          className={`absolute z-10 w-[140px] left-[22px] -top-6 bg-dark text-white
                rounded-md overflow-hidden text-xs p-2 opacity-0 transform scale-0 transition-opacity duration-700 
                ${showTooltip ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
        >
          اطلاعات را وارد کنید: اطلاعات را وارد کنید:
        </span>
        <span
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={handleTouchStart}
          onMouseLeave={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
        >
          <InfoIcon />
        </span>
      </span>
    </>
  );
};

export default Hints;
