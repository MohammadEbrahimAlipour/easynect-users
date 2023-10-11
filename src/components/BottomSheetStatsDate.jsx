// import React, { useState, useEffect } from "react";
// import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Calendar } from "react-modern-calendar-datepicker";
// import { toGregorian, toJalaali } from "jalaali-js";

// const BottomSheetStatsDate = ({ fromDate, toDate, setFromDate, setToDate }) => {
//   const [selectedDayRange, setSelectedDayRange] = useState(null);

//   // useEffect(() => {
//   //   // Ensure that selectedDayRange is defined before converting dates
//   //   if (selectedDayRange && selectedDayRange.from && selectedDayRange.to) {
//   //     // Convert the selected Jalali dates to Gregorian dates
//   //     const gregorianFromDate = toGregorian(
//   //       selectedDayRange.from.year,
//   //       selectedDayRange.from.month,
//   //       selectedDayRange.from.day
//   //     ).gregorianDate;

//   //     const gregorianToDate = toGregorian(
//   //       selectedDayRange.to.year,
//   //       selectedDayRange.to.month,
//   //       selectedDayRange.to.day
//   //     ).gregorianDate;

//   //     // Check if the gregorian dates are not undefined
//   //     if (gregorianFromDate && gregorianToDate) {
//   //       // Format the Gregorian dates to match your API's expected format (e.g., "YYYY-MM-DD")
//   //       const formattedFromDate = `${gregorianFromDate.year}-${String(
//   //         gregorianFromDate.month
//   //       ).padStart(2, "0")}-${String(gregorianFromDate.day).padStart(2, "0")}`;

//   //       const formattedToDate = `${gregorianToDate.year}-${String(
//   //         gregorianToDate.month
//   //       ).padStart(2, "0")}-${String(gregorianToDate.day).padStart(2, "0")}`;

//   //       // Update the fromDate and toDate props in the parent component
//   //       setFromDate(formattedFromDate);
//   //       setToDate(formattedToDate);
//   //     } else {
//   //       console.error(
//   //         "Invalid Gregorian dates:",
//   //         gregorianFromDate,
//   //         gregorianToDate
//   //       );
//   //     }
//   //   }
//   // }, [selectedDayRange, setFromDate, setToDate]);

//   return (
//     // <Calendar
//     //   value={selectedDayRange}
//     //   onChange={setSelectedDayRange}
//     //   colorPrimary="#0fbcf9"
//     //   colorPrimaryLight="rgba(75, 207, 250, 0.4)"
//     //   shouldHighlightWeekends
//     // />

//     <div>
//       <label htmlFor="dateInput">Select a Date:</label>
//       <input type="date" id="dateInput" name="selectedDate" />
//     </div>
//   );
// };

// export default BottomSheetStatsDate;

import React from "react";

const BottomSheetStatsDate = ({ fromDate, toDate, setFromDate, setToDate }) => {
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="fromDateInput">From Date:</label>
        <input
          type="date"
          id="fromDateInput"
          name="fromDate"
          value={fromDate}
          onChange={handleFromDateChange}
        />
      </div>
      <div>
        <label htmlFor="toDateInput">To Date:</label>
        <input
          type="date"
          id="toDateInput"
          name="toDate"
          value={toDate}
          onChange={handleToDateChange}
        />
      </div>
    </div>
  );
};

export default BottomSheetStatsDate;
