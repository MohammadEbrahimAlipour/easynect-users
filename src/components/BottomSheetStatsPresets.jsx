import Link from "next/link";
import React, { useState } from "react";

const BottomSheetStatsPresets = ({
  goToCal,
  setGoToCal,
  setFromDate,
  setToDate
}) => {
  const handleBottomSheetSwitch = () => {
    setGoToCal(!goToCal);
  };

  const today = new Date(); // todays date

  // Create date objects for the preset dates
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(today.getDate() - 15);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="mx-5">
      <div className="flex justify-between ">
        <button
          onClick={() => {
            setFromDate(formatDate(thirtyDaysAgo));
            setToDate(formatDate(today));
          }}
          className="text-xs border-[1px] bg-black border-black text-white py-2 px-3 rounded-lg "
        >
          ۳۰ روز گذشته
        </button>
        <button
          onClick={() => {
            setFromDate(formatDate(fifteenDaysAgo));
            setToDate(formatDate(today));
          }}
          className="text-xs border-[1px] bg-black border-black text-white py-2 px-3 rounded-lg "
        >
          ۱۵ روز گذشته
        </button>
        <button
          onClick={() => {
            setFromDate(formatDate(sevenDaysAgo));
            setToDate(formatDate(today));
          }}
          className="text-xs border-[1px] bg-black border-black text-white py-2 px-3 rounded-lg "
        >
          ۷ روز گذشته
        </button>
      </div>
      <div className="mt-5">
        <button
          onClick={handleBottomSheetSwitch}
          className="flex justify-center items-center w-full py-2 rounded-lg border-[1px]
           border-black text-sm font-medium"
        >
          تنظیمات دلخواه
        </button>
      </div>
    </div>
  );
};

export default BottomSheetStatsPresets;
