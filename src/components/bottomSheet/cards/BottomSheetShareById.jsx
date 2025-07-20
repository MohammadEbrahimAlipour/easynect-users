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
import { CircularProgress, Typography } from "@mui/material";
import tw from "tailwind-styled-components";

const QR_CODE_TYPE = Object.freeze({
  offline: "offline",
  online: "online",
});

const BottomSheetShareById = ({ clickedCardId }) => {
  const accessToken = useAccessToken();
  const [showOptions, setShoOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [pagesData, setPagesData] = useState(null);
  const [offlineQRCode, setOfflineQRCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isQrCodeReady, setIsQrCodeReady] = useState(false); // to check if QR code is ready
  const [qrCodeValue, setQRCodeValue] = useState(""); // State to hold the QR code value
  const qrRef = useRef();
  const offlineQrRef = useRef();

  const saveQRCode = (qrCodeType) => {
    if (isQrCodeReady && qrRef.current) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let svgElement = qrRef.current.querySelector("svg");
      if (qrCodeType === QR_CODE_TYPE.offline) {
        svgElement = offlineQrRef.current.querySelector("svg");
      }
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

      getOfflineQRCodeRequest();
    }

    getQrCodeInfo();
  }, [pagesData, clickedCardId]); // Run the effect whenever pagesData or clickedCardId changes

  const copyLinkToClipboard = async (qrCodeType) => {
    if (qrCodeValue) {
      // Use qrCodeValue which is already set for the QR code value
      try {
        let value = qrCodeValue;
        if (qrCodeType === QR_CODE_TYPE.offline) {
          value = offlineQRCode;
        }
        console.log(value, 'value')
        await navigator.clipboard.writeText(value);
        toast.success("لینک کارت کپی شد"); // The link is copied successfully
      } catch (err) {
        console.error("خطایی رخ داده است:", err); // An error occurred
      }
    }
  };

  const getOfflineQRCodeRequest = () => {
    if (!clickedCardId.id) return;

    const apiUrl = generateApiUrl(
      `/api/v1/pages/offlineqr/${clickedCardId.id}`
    );

    setIsLoading(true);
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "Accept-Language": "fa",
        },
      })
      .then((response) => {
        if (response.status === 200) generateOfflineQRCode(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const generateOfflineQRCode = (data) => {
    let vCardData = data.links
      .map((item) => {
        switch (item.type) {
          case "phone":
            return `TEL;TYPE=${item.title}:${item.content_val}`;
          case "email":
            return `EMAIL;TYPE=${item.title}:${item.content_val}`;
          case "link":
            return `URL;TYPE=${item.title}:${item.content_val}`;
          case "file":
            return `URL;TYPE=${item.title}:${item.content_val}`;
          default:
            return "";
        }
      })
      .join("\n");

    const vCardString = `BEGIN:VCARD\nVERSION:3.0\nN;CHARSET=utf-8:${data.owner_last_name};${data.owner_first_name};;;\n${vCardData}\nEND:VCARD`;

    setOfflineQRCode(vCardString);
  };

  const getQrCodeInfo = () => {
    // to fetch the data
    if (!pagesData) {
      // Make an Axios GET request to fetch user data based on user_id
      const apiUrl = generateApiUrl(`/api/v1/pages/qrcode_info/`);

      setIsLoading(true);

      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Accept-Language": "fa",
          },
        })
        .then((response) => {
          // Handle the data once it's received
          setPagesData(response.data);
          // Set the first option as selected
          setSelectedOption(response.data.length > 0 ? response.data[0] : null);
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-28">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {clickedCardId && isQrCodeReady && (
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
          <div className="flex justify-around">
            {/* online qr code */}
            <div className=" flex flex-col justify-center items-center my-4">
              <Typography className="mb-4">آنلاین</Typography>
              {/* Add the ref to the QR code container */}
              <div ref={qrRef}>
                <QRCode
                  value={qrCodeValue}
                  size={150}
                  fgColor="#000"
                  bgColor="#fff"
                  level="H"
                  renderAs="svg"
                />
              </div>

              {/* button */}
              <Button onClick={() => saveQRCode(QR_CODE_TYPE.online)}>
                ذخیره در گالری
              </Button>
              <Button onClick={() => copyLinkToClipboard(QR_CODE_TYPE.online)}>
                کپی لینک کارت
              </Button>
            </div>
            {/* end of online qr code */}

            {/* offline qr code */}
            <div className="flex flex-col justify-center items-center my-4">
              <Typography className="mb-4">آفلاین</Typography>
              {/* Add the ref to the QR code container */}
              <div ref={offlineQrRef}>
                <QRCode
                  value={offlineQRCode}
                  size={150}
                  fgColor="#000"
                  bgColor="#fff"
                  level="H"
                  renderAs="svg"
                />
              </div>

              {/* button */}
              <Button
                onClick={() => saveQRCode(QR_CODE_TYPE.offline)}
                className=""
              >
                ذخیره در گالری
              </Button>
              <Button onClick={() => copyLinkToClipboard(QR_CODE_TYPE.offline)}>
                کپی لینک کارت
              </Button>
            </div>
            {/* end of online qr code */}
          </div>
        </div>
      )}
    </>
  );
};

export default BottomSheetShareById;

const Button = tw.div`
  flex
  items-center
  justify-center
  w-full
  bg-dark
  text-white
  py-3
  leading-0
  rounded-lg
  mt-4
  text-xs
`;
