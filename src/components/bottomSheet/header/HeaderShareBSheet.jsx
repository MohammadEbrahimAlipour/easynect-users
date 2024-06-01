import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import BottomSheetWrapper from "../BottomSheetWrapper";
import axios from "axios";
import QRCode from "qrcode.react";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import { ArrowDownIcon } from "@/components/Icons";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";

const HeaderShareBSheet = ({ showSheet, setShowSheet, clickedCardId }) => {
  const accessToken = useAccessToken();
  const [showOptions, setShoOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [pagesData, setPagesData] = useState(null);
  const qrRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);

  const [isQrCodeReady, setIsQrCodeReady] = useState(false); // to check if QR code is ready

  // to fetch the data
  if (showSheet && !pagesData) {
    // Make an Axios GET request to fetch user data based on user_id
    const apiUrl = generateApiUrl(`/api/v1/pages/qrcode_info/`);
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "Accept-Language": "fa",
        },
      })
      .then((response) => {
        setIsQrCodeReady(true);
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

  const saveQRCode = () => {
    if (isQrCodeReady && qrRef.current) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const svgElement = qrRef.current.querySelector("svg");
      if (!svgElement) {
        console.error("SVG element not found");
        return;
      }
      const xml = new XMLSerializer().serializeToString(svgElement);
      const svg64 = btoa(unescape(encodeURIComponent(xml)));
      const image64 = "data:image/svg+xml;base64," + svg64;

      const image = new Image();

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        canvas.toBlob((blob) => {
          saveAs(blob, "qrcode.png"); // Uses file-saver's saveAs function
        }, "image/png");
      };

      image.src = image64;
    } else {
      console.error("QR Code is not yet available.");
    }
  };

  const copyLinkToClipboard = () => {
    if (navigator.clipboard && selectedOption) {
      navigator.clipboard
        .writeText(selectedOption.page_url)
        .then(() => {
          toast.success("لینک با موفقیت کپی شد.");
        })
        .catch((error) => {
          console.error("Error copying link to clipboard:", error);
          toast.error("خطا در کپی کردن لینک.");
        });
    } else {
      console.error("Clipboard API not supported or no selected option.");
    }
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
                onClick={({ currentTarget }) => {
                  setAnchorEl(currentTarget);
                  setShoOptions(!showOptions);
                }}
                className="bg-dark text-white rounded-2xl w-[40%] px-3 py-[6px] focus:outline-none
         text-sm flex justify-center items-center"
              >
                <span className="me-1">
                  {selectedOption ? selectedOption.card_title : "انتخاب کارت"}
                </span>
                <ArrowDownIcon />
              </button>

              <Menu
                anchorEl={anchorEl}
                open={showOptions}
                onClose={() => {
                  setShoOptions(false);
                }}
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  horizontal: "center",
                }}
              >
                {pagesData.map((data) => (
                  <MenuItem
                    key={data.id}
                    selected={selectedOption && selectedOption.id === data.id}
                    onClick={() => handleOptionClick(data)}
                  >
                    {data.card_title}
                  </MenuItem>
                ))}
              </Menu>
            </div>

            {/* qr code */}
            <div className="flex flex-col justify-center items-center my-4">
              {/* Add the ref to the QR code container */}
              <div ref={qrRef}>
                <QRCode
                  value={selectedOption ? selectedOption.page_url : ""}
                  size={200}
                  fgColor="#000"
                  bgColor="#fff"
                  level="H"
                  renderAs="svg"
                />
              </div>

              {/* save button */}
              <div className="flex flex-col">
                <button
                  onClick={saveQRCode}
                  className="flex items-center justify-center  px-[57px]
              bg-dark text-white py-3 leading-0 rounded-lg mt-4"
                >
                  ذخیره در گالری
                </button>

                {/* copy Link button */}
                <button
                  onClick={copyLinkToClipboard}
                  className="flex items-center justify-center  px-[57px]
              bg-dark text-white py-3 leading-0 rounded-lg mt-2"
                >
                  کپی لینک
                </button>
              </div>
            </div>
          </div>
        </BottomSheetWrapper>
      )}
    </>
  );
};

export default HeaderShareBSheet;
