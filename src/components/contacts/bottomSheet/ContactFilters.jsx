import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";
import React, { useState } from "react";
import { useAccessToken } from "../../../../context/AccessTokenContext";

const ContactFilters = ({
  showContactFilters,
  setShowContactFilters,
  toDate,
  setToDate,
  fromDate,
  setFromDate
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
    <BottomSheetWrapper
      open={showContactFilters}
      onClose={() => setShowContactFilters(false)}
    >
      <form
        //   onSubmit={handleDownloadExel}

        className="mx-5 mb-5"
      >
        <div className="mx-5 py-5">
          <h3 className="font-semibold text-lg">فیلتر</h3>
          <p className="py-3 text-sm text-muted">انتخاب بازه زمانی</p>
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
          {/* <div className="mt-5">
            <span
              onClick={handleBottomSheetSwitch}
              className="flex justify-center items-center w-full py-2 rounded-lg border-[1px]
           border-black text-sm font-medium"
            >
              تنظیمات دلخواه
            </span>
          </div> */}
        </div>

        {/* <button
          type="submit"
          className="bg-dark w-full text-white rounded-md py-2 "
        >
          اعمال تغییرات
        </button> */}
      </form>
    </BottomSheetWrapper>
  );
};

export default ContactFilters;
