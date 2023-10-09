import React from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

const BottomSheetStatsDate = ({ fromDate, toDate, setFromDate, setToDate }) => {
  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };
  return (
    <>
      <p>انتخاب تاریخ:</p>
      <div>
        <label htmlFor="datePicker">از</label>
        <input
          type="date"
          id="fromDatePicker"
          name="fromDate"
          value={fromDate}
          onChange={handleFromDateChange}
        />
      </div>
      <div>
        <label htmlFor="datePicker">الی</label>
        <input
          type="date"
          id="toDatePicker"
          name="toDate"
          value={toDate}
          onChange={handleToDateChange}
        />
      </div>
    </>
  );
};

export default BottomSheetStatsDate;
