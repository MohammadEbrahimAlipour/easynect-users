import React, { useState, useEffect } from "react";
import BottomSheetWrapper from "../BottomSheetWrapper";
import axios from "axios";
import QRCode from "qrcode.react";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import { ArrowDownIcon } from "@/components/Icons";
import LoadingState from "@/components/LoadingState";

const HeaderShareBSheet = ({ showSheet, setShowSheet, clickedCardId }) => {
  const accessToken = useAccessToken();
  const [showOptions, setShoOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [pagesData, setPagesData] = useState(null);
  console.log("selectedOption", selectedOption);

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

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShoOptions(false);
  };
  return (
    <>
      {selectedOption && (
        <BottomSheetWrapper
          open={showSheet}
          onClose={() => setShowSheet(false)}
        >
          <div className="flex py-6 flex-col">
            {/* top line */}
            <div className="w-full  flex justify-center pb-6">
              <span
                //   onClick={handleButtonClick}
                id="closeBTN"
                className="w-[36px] h-[5px] rounded-2xl opacity-25 bg-muted"
              />
            </div>

            {/* chose */}
            <div className="flex justify-center relative">
              <button
                onClick={() => setShoOptions(!showOptions)}
                className="bg-dark text-white rounded-2xl w-[40%] px-3 py-[6px] focus:outline-none
         text-sm flex justify-center items-center"
              >
                <span className="me-1">
                  {selectedOption ? selectedOption.card_title : "انتخاب کارت"}
                </span>
                <ArrowDownIcon />
              </button>

              {/* options */}
              {showOptions && (
                <div className="absolute bg-white shadow-2xl border py-2 px-4 rounded-md top-8">
                  {pagesData.map((data) => (
                    <div
                      key={data.id}
                      className={`py-1 border-b ${
                        selectedOption && selectedOption.id === data.id
                          ? "font-bold"
                          : ""
                      }`}
                      onClick={() => handleOptionClick(data)}
                    >
                      {data.card_title}
                    </div>
                  ))}
                </div>
              )}
            </div>

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
                className="flex items-center justify-center  px-[57px]
              bg-dark text-white py-3 leading-0 rounded-lg mt-4"
              >
                اشتراک گذاری
              </button>
            </div>
          </div>
        </BottomSheetWrapper>
      )}
    </>
  );
};

export default HeaderShareBSheet;
