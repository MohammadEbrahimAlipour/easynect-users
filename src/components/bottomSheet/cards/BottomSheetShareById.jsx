import React, { useState, useEffect } from "react";
import BottomSheetWrapper from "../BottomSheetWrapper";
import axios from "axios";
import QRCode from "qrcode.react";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import { ArrowDownIcon } from "@/components/Icons";
import LoadingState from "@/components/LoadingState";
import { toast } from "react-toastify";

const BottomSheetShareById = ({ showSheet, setShowSheet, clickedCardId }) => {
  const accessToken = useAccessToken();
  const [showOptions, setShoOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [pagesData, setPagesData] = useState(null);

  const copyLinkToClipboard = async () => {
    if (selectedOption && selectedOption.page_url) {
      try {
        await navigator.clipboard.writeText(selectedOption.page_url);
        toast.success("لینک کارت کپی شد"); // You can handle the UI feedback here instead of alert
      } catch (err) {
        console.error("خطایی رخ داده است:", err);
      }
    }
  };

  // to fetch the data
  if (showSheet && !pagesData) {
    // Make an Axios GET request to fetch user data based on user_id
    const apiUrl = generateApiUrl(`/api/v1/pages/qrcode_info/`);
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "Accept-Language": "fa"
        }
      })
      .then((response) => {
        // Handle the data once it's received
        setPagesData(response.data);
        // Set the first option as selected
        setSelectedOption(response.data.length > 0 ? response.data[0] : null);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  return (
    <>
      {clickedCardId && (
        <BottomSheetWrapper
          open={showSheet}
          onClose={() => setShowSheet(false)}
        >
          <div className="flex py-6 flex-col">
            {/* top line */}
            <div className="w-full  flex justify-center pb-4">
              <span
                //   onClick={handleButtonClick}
                id="closeBTN"
                className="w-[36px] h-[5px] rounded-2xl opacity-25 bg-muted"
              />
            </div>
            <h3 className="text-center font-bold text-lg">
              {clickedCardId.card_title}
            </h3>
            {/* qr code */}
            <div className="flex flex-col justify-center items-center my-4">
              {/* Add the ref to the QR code container */}
              <div>
                <QRCode
                  value={selectedOption ? selectedOption.page_url : ""}
                  size={200}
                  fgColor="#000"
                  bgColor="#fff"
                  level="H"
                  renderAs="svg"
                />
              </div>

              {/* button */}
              <button
                onClick={copyLinkToClipboard}
                className="flex items-center justify-center  px-[57px]
              bg-dark text-white py-3 leading-0 rounded-lg mt-4"
              >
                کپی لینک کارت
              </button>
            </div>
          </div>
        </BottomSheetWrapper>
      )}
    </>
  );
};

export default BottomSheetShareById;
