import React, { useState, useEffect, useRef } from "react";
import BottomSheetWrapper from "../BottomSheetWrapper";
import axios from "axios";
import QRCode from "qrcode.react";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import { ArrowDownIcon } from "@/components/Icons";
import LoadingState from "@/components/LoadingState";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

const BottomSheetShareById = ({ showSheet, setShowSheet, clickedCardId }) => {
  const accessToken = useAccessToken();
  const [showOptions, setShoOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [pagesData, setPagesData] = useState(null);

  const [isQrCodeReady, setIsQrCodeReady] = useState(false); // to check if QR code is ready
  const [qrCodeValue, setQRCodeValue] = useState(""); // State to hold the QR code value
  const qrRef = useRef();

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
    console.log("ref", qrRef.current);
  };

  useEffect(() => {
    if (pagesData && clickedCardId) {
      // Filter pagesData to find the page with matching id
      const matchedPage = pagesData.find(
        (page) => page.id === clickedCardId.id
      );
      // If a match is found, update the QR code value
      if (matchedPage) {
        setQRCodeValue(matchedPage.page_url);
        setIsQrCodeReady(true);
      }
    }
  }, [pagesData, clickedCardId]); // Run the effect whenever pagesData or clickedCardId changes

  const copyLinkToClipboard = async () => {
    if (qrCodeValue) {
      // Use qrCodeValue which is already set for the QR code value
      try {
        await navigator.clipboard.writeText(qrCodeValue);
        toast.success("لینک کارت کپی شد"); // The link is copied successfully
      } catch (err) {
        console.error("خطایی رخ داده است:", err); // An error occurred
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
      {clickedCardId && isQrCodeReady && (
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
              <div ref={qrRef}>
                <QRCode
                  value={qrCodeValue}
                  size={200}
                  fgColor="#000"
                  bgColor="#fff"
                  level="H"
                  renderAs="svg"
                />
              </div>

              {/* button */}
              <button
                onClick={saveQRCode}
                className="flex items-center justify-center  px-[57px]
              bg-dark text-white py-3 leading-0 rounded-lg mt-4"
              >
                ذخیره در گالری
              </button>
              <button
                onClick={copyLinkToClipboard}
                className="flex items-center justify-center  px-[57px]
              bg-dark text-white py-3 leading-0 rounded-lg mt-2"
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
