import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";
import React, { useState, useEffect } from "react";
import jalaali from "jalaali-js";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";

const ContactFilters = ({
  showContactFilters,
  setShowContactFilters,
  toDate,
  setToDate,
  fromDate,
  setFromDate
}) => {
  const [showCal, setShowCal] = useState(false);

  const today = new Date(); // todays date

  // Create date objects for the preset dates
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(today.getDate() - 15);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Convert Shamsi date to a Gregorian Date object using jalaali-js
  const shamsiToGregorian = (shamsiDate) => {
    if (!shamsiDate) return "";
    const { year, month, day } = shamsiDate;
    const { gy, gm, gd } = jalaali.toGregorian(year, month, day);
    return new Date(gy, gm - 1, gd); // js Date months are zero-indexed
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action

    // If the user has selected a range, convert and set the dates
    if (selectedDayRange.from && selectedDayRange.to) {
      // Get the Gregorian start date
      const gregorianStartDate = shamsiToGregorian(selectedDayRange.from);
      // Get the Gregorian end date
      const gregorianEndDate = shamsiToGregorian(selectedDayRange.to);

      // Format the Gregorian dates
      const formattedFrom = formatDate(gregorianStartDate);
      const formattedTo = formatDate(gregorianEndDate);

      // Update the fromDate and toDate state with the formatted dates
      setFromDate(formattedFrom);
      setToDate(formattedTo);
    }

    // Close the filters bottom sheet
    setShowContactFilters(false);
  };

  console.log("date to check", fromDate, toDate);

  return (
    <BottomSheetWrapper
      open={showContactFilters}
      onClose={() => setShowContactFilters(false)}
    >
      <div className="mx-5 mb-5">
        <div className="mx-5 py-5">
          <h3 className="font-semibold text-lg">فیلتر</h3>
          <p className="py-3 text-sm text-muted">انتخاب بازه زمانی</p>

          {!showCal && (
            <div className="flex justify-between">
              <span
                onClick={() => {
                  setFromDate(formatDate(thirtyDaysAgo));
                  setToDate(formatDate(today));
                  setShowContactFilters(false);
                }}
                className={`text-xs border-[1px] border-black  py-2 px-3 rounded-lg whitespace-nowrap overflow-hidden
              ${
                fromDate === formatDate(thirtyDaysAgo) &&
                toDate === formatDate(today)
                  ? "bg-dark text-white"
                  : "border-black text-black"
              } 
              `}
              >
                ۳۰ روز گذشته
              </span>
              <span
                onClick={() => {
                  setFromDate(formatDate(fifteenDaysAgo));
                  setToDate(formatDate(today));
                  setShowContactFilters(false);
                }}
                className={`text-xs border-[1px] border-black  py-2 px-3 rounded-lg mx-2 whitespace-nowrap overflow-hidden
              ${
                fromDate === formatDate(fifteenDaysAgo) &&
                toDate === formatDate(today)
                  ? "bg-dark text-white"
                  : "border-black text-black"
              } 
              `}
              >
                ۱۵ روز گذشته
              </span>
              <span
                onClick={() => {
                  setFromDate(formatDate(sevenDaysAgo));
                  setToDate(formatDate(today));
                  setShowContactFilters(false);
                }}
                className={`text-xs border-[1px]  border-black  py-2 px-3 rounded-lg whitespace-nowrap overflow-hidden
              ${
                fromDate === formatDate(sevenDaysAgo) &&
                toDate === formatDate(today)
                  ? "bg-dark text-white"
                  : "border-black text-black"
              }  `}
              >
                ۷ روز گذشته
              </span>
            </div>
          )}

          {showCal && (
            <div className="w-full flex">
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
            <span
              onClick={() => setShowCal(!showCal)}
              className="flex justify-center items-center w-full py-2 rounded-lg border-[1px]
           border-black text-sm font-medium"
            >
              {!showCal ? "تنظیمات دلخواه" : "پریست ها"}
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {showCal && (
            <button
              type="submit"
              className="bg-dark w-full text-white rounded-md py-2 "
            >
              اعمال تغییرات
            </button>
          )}
        </form>
      </div>
    </BottomSheetWrapper>
  );
};

export default ContactFilters;
