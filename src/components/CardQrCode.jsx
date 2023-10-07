import React, { useState, useRef } from "react";
import QRCode from "qrcode.react";
import { CopyIcon, SaveIcon } from "./Icons";

const CardQrCode = ({ closeCardQrCode }) => {
  const [isCopied, setIsCopied] = useState(false);
  const qrCodeRef = useRef(null); // Ref for the QR code container

  const handleButtonClick = () => {
    console.log("Button clicked");
    closeCardQrCode();
  };

  const handleCopyLink = () => {
    // Copy the QR code link to the clipboard
    const qrCodeLink = "https://github.com/gcoro/react-qrcode-logo";
    navigator.clipboard.writeText(qrCodeLink).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    });
  };

  console.log("Rendering CardQrCode");

  // Sample photo URL (replace with your actual logo image URL)
  const samplePhotoURL = "";

  return (
    <div className="pt-5 pb-8 container !px-6">
      {/* top line close btn*/}
      <div className="w-full flex justify-center pb-6">
        <button
          onClick={handleButtonClick}
          id="closeBTN"
          className="w-[36px] h-[5px] rounded-2xl opacity-25 bg-muted"
        />
      </div>

      {/* "Copied to Clipboard" message */}
      {isCopied && <div className="text-muted text-xs mb-2">لینک کپی شد</div>}

      {/* options */}
      <select className="bg-dark text-white text-sm px-2 py-1 rounded-2xl">
        <option>محمدامین خاکشوری</option>
        <option>محمدامین خاکشوری</option>
        <option>محمدامین خاکشوری</option>
      </select>

      {/* qr */}
      <div className="flex flex-col justify-center items-center my-4">
        {/* Add the ref to the QR code container */}
        <div ref={qrCodeRef}>
          <QRCode
            value="https://github.com/gcoro/react-qrcode-logo"
            size={200}
            fgColor="#000"
            bgColor="#fff"
            level="H"
            renderAs="svg"
            // imageSettings={{
            //   src: samplePhotoURL,
            //   height: 60,
            //   width: 60
            // }}
          />
        </div>

        {/* button */}
        <button
          onClick={handleButtonClick}
          className="flex items-center justify-center  px-[57px]
              bg-dark text-white py-3 leading-0 rounded-lg mt-4"
        >
          اشتراک گذاری
        </button>
      </div>

      {/* bottom btns */}
      <div className="mt-8">
        <button
          onClick={handleCopyLink}
          className="flex justify-center w-full items-center border-2 rounded-lg py-3 font-medium"
        >
          <span className="me-1">
            <CopyIcon />
          </span>
          کپی لینک کارت
        </button>
        <button className="flex justify-center items-center border-2 rounded-lg py-3 font-medium mt-3 w-full">
          <span className="me-1">
            <SaveIcon />
          </span>
          ذخیره کد در گالری
        </button>
      </div>
    </div>
  );
};

export default CardQrCode;
