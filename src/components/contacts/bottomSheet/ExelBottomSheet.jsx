import { generateApiUrl } from "@/components/ApiUr";
import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";
import React, { useState, useEffect } from "react";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import axios from "axios";
import { toast } from "react-toastify";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";

// Import the jalaali-js library for converting Shamsi to Gregorian dates
import jalaali from "jalaali-js";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const today = new Date(); // todays date

// Create date objects for the preset dates
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(today.getDate() - 30);

const fifteenDaysAgo = new Date();
fifteenDaysAgo.setDate(today.getDate() - 15);

const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(today.getDate() - 7);

const ExelBottomSheet = ({ showExelSheet, setShowExelSheet, pageID }) => {
  const accessToken = useAccessToken();
  const [fromDate, setFromDate] = useState(formatDate(sevenDaysAgo));
  const [toDate, setToDate] = useState(formatDate(today));
  const [downloading, setDownloading] = useState(false);
  const [showCal, setShowCal] = useState(false);

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });

  // Convert Shamsi date to a yyyy-mm-dd string
  const formatShamsiDate = (shamsiDate) => {
    if (!shamsiDate) return "";
    // Your logic here to convert a single Shamsi date object to yyyy-mm-dd string
  };

  useEffect(() => {
    // Convert selected Shamsi dates to Gregorian yyyy-mm-dd whenever they change
    setFromDate(formatShamsiDate(selectedDayRange.from));
    setToDate(formatShamsiDate(selectedDayRange.to));
  }, [selectedDayRange]);

  // Convert Shamsi date to a Gregorian Date object using jalaali-js
  const shamsiToGregorian = (shamsiDate) => {
    if (!shamsiDate) return "";
    const { year, month, day } = shamsiDate;
    const { gy, gm, gd } = jalaali.toGregorian(year, month, day);
    return new Date(gy, gm - 1, gd); // js Date months are zero-indexed
  };

  // Whenever `selectedDayRange` changes, convert Shamsi dates to Gregorian `yyyy-mm-dd`
  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const fromGregorianDate = shamsiToGregorian(selectedDayRange.from);
      const toGregorianDate = shamsiToGregorian(selectedDayRange.to);
      setFromDate(formatDate(fromGregorianDate));
      setToDate(formatDate(toGregorianDate));
    }
  }, [selectedDayRange]);

  // exel file dl
  const handleDownloadExel = async (e) => {
    e.preventDefault();
    setDownloading(true); // Start showing the 'Downloading...' message

    try {
      const apiUrl = generateApiUrl(`/api/v1/contacts/page/excel/${pageID}`);
      const params = {
        from_date: fromDate,
        to_date: toDate
      };

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "Content-Type": "application/json",
          "Accept-Language": "fa"
        },
        params: params,
        responseType: "blob" // Important for handling binary file download
      });

      if (response.status === 200) {
        // Use the header to get the filename if the server provides it in 'Content-Disposition'
        const contentDispositionHeader =
          response.headers["content-disposition"];
        let filename = "Contacts.xlsx";
        if (contentDispositionHeader) {
          const matches = contentDispositionHeader.match(/filename="?(.+)"?/);
          if (matches && matches[1]) filename = matches[1];
        }

        // Create a URL for the blob to trigger the download
        const fileURL = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = fileURL;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Unexpected response status:", response.status);
        toast.error("Failed to download file.");
      }
    } catch (error) {
      console.error("Error during file download:", error);
      if (error.response && error.response.data && error.response.data.detail) {
        toast.error(`Error: ${error.response.data.detail}`);
      } else {
        toast.error("An error occurred while downloading the file.");
      }
    } finally {
      setDownloading(false); // Stop showing the 'Downloading...' message in any case
    }
  };

  return (
    <BottomSheetWrapper
      open={showExelSheet}
      onClose={() => setShowExelSheet(false)}
    >
      <form onSubmit={handleDownloadExel} className="mx-5 mb-5">
        <div className="mx-5 py-5">
          <h3 className="font-semibold text-lg">دانلود فایل اکسل</h3>
          <p className="py-3 text-sm text-muted">انتخاب بازه زمانی</p>

          {!showCal && (
            <div className="flex justify-between">
              <span
                onClick={() => {
                  setFromDate(formatDate(thirtyDaysAgo));
                  setToDate(formatDate(today));
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
                locale="fa" // Assuming 'fa' is the locale string for Shamsi calendar
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

        <button
          type="submit"
          className="bg-dark w-full text-white rounded-md py-2 "
        >
          {downloading ? "در حال دانلود..." : "دانلود فایل"}
        </button>
      </form>
    </BottomSheetWrapper>
  );
};

export default ExelBottomSheet;
