import Link from "next/link";
import React, { useState } from "react";
import BottomSheetWrapper from "./bottomSheet/BottomSheetWrapper";

import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";

const BottomSheetStatsPresets = ({ setFromDate, setToDate, onClose, open }) => {
  const [showCal, setShowCal] = useState(false);
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

  // calendar

  const defaultFrom = {
    year: 2019,
    month: 3,
    day: 4
  };

  const defaultTo = {
    year: 2019,
    month: 3,
    day: 7
  };

  const defaultRange = {
    from: defaultFrom,
    to: defaultTo
  };

  const [selectedDayRange, setSelectedDayRange] = useState(defaultRange);

  return (
    <BottomSheetWrapper onClose={onClose} open={open}>
      <div className="py-5 ">
        {/* presets */}
        {!showCal && (
          <div className="flex justify-between  ">
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
        )}
        {/* end of presets */}

        {showCal && (
          <div>
            <Calendar
              value={selectedDayRange}
              onChange={setSelectedDayRange}
              calendarClassName="responsive-calendar"
              locale="fa" // locale string for Shamsi calendar
              // renderInput={renderCustomInput}
              shouldHighlightWeekends
            />
          </div>
        )}

        <div className="mt-5">
          <button
            onClick={() => setShowCal(!showCal)}
            className="flex justify-center items-center w-full py-2 rounded-lg border-[1px]
           border-black text-sm font-medium"
          >
            {!showCal ? "تنظیمات دلخواه" : "پریست ها"}
          </button>
        </div>

        <form
        // onSubmit={handleSubmit}
        >
          {showCal && (
            <button
              type="submit"
              className="bg-dark w-full text-white rounded-md py-2 mt-4 "
            >
              اعمال تغییرات
            </button>
          )}
        </form>
      </div>
    </BottomSheetWrapper>
  );
};

export default BottomSheetStatsPresets;
