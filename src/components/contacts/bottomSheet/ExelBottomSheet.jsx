import { generateApiUrl } from "@/components/ApiUr";
import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";
import React, { useState, useEffect } from "react";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import axios from "axios";
import { toast } from "react-toastify";

const ExelBottomSheet = ({ showExelSheet, setShowExelSheet, pageID }) => {
  const accessToken = useAccessToken();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [exelFile, setExelFile] = useState(null);
  const [downloading, setDownloading] = useState(false);

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

  // Optionally, use this to programmatically start a file download
  const downloadFile = (fileURL) => {
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", "filename.xlsx"); // Set the file name
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
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
          <div className="flex justify-between">
            <span
              onClick={() => {
                setFromDate(formatDate(thirtyDaysAgo));
                setToDate(formatDate(today));
              }}
              className={`text-xs border-[1px] border-black text-white py-2 px-3 rounded-lg whitespace-nowrap overflow-hidden
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
              className={`text-xs border-[1px] border-black text-white py-2 px-3 rounded-lg mx-2 whitespace-nowrap overflow-hidden
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
              className={`text-xs border-[1px]  border-black text-white py-2 px-3 rounded-lg whitespace-nowrap overflow-hidden
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
          <div className="mt-5">
            <span
              onClick={handleBottomSheetSwitch}
              className="flex justify-center items-center w-full py-2 rounded-lg border-[1px]
           border-black text-sm font-medium"
            >
              تنظیمات دلخواه
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
