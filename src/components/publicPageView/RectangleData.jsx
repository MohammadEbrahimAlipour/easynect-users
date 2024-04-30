import React, { useState } from "react";
import Image from "next/image";

// utils
import { checkIsPDForImage, downloadFile } from "@/utils/file";

// components
import FilePreviewBottomSheet from "@/components/FilePreviewBottomSheet";
import CopyButton from "./CopyButton";

const RectangleData = ({ handleCountingItemClicks, object }) => {
  const [isPreviewSheetOpen, setIsPreviewSheetOpen] = useState(false);
  const [currentFileURL, setCurrentFileURL] = useState(null);

  const handleRecTypeDetection = (squareIndex) => {
    // Early return if handleCountingItemClicks has not been called
    if (!handleCountingItemClicks(object?.data[squareIndex])) {
      return;
    }

    const squareData = object?.data[squareIndex];
    // Early return to handle any potential 'null' or 'undefined'
    if (!squareData) return;

    if (squareData.type === "phone" && squareData.content_val) {
      const telLink = `tel:${squareData.content_val}`;
      window.location.href = telLink;
    } else if (squareData.type === "link" && squareData.content_val) {
      const externalLink = squareData.content_val;
      window.open(externalLink, "_blank", "noopener,noreferrer");
    } else if (squareData.type === "file" && squareData.content_val) {
      const isPDForImage = checkIsPDForImage(squareData.content_val);

      if (isPDForImage) {
        setCurrentFileURL(squareData.content_val);
        setIsPreviewSheetOpen(true);
        return;
      }

      downloadFile(squareData.content_val);
    } else if (squareData.type === "email" && squareData.content_val) {
      const emailLink = `mailto:${squareData.content_val}`;
      window.location.href = emailLink;
    }
  };

  const handleBottomSheetClose = () => {
    setIsPreviewSheetOpen(false);
  };

  return (
    <>
      <div
        onClick={() => handleRecTypeDetection(0)}
        className="grid grid-cols-12 mb-5 items-center text-xs py-3 border-2 rounded-2xl whitespace-nowrap overflow-hidden relative"
      >
        <>
          {object?.data[0].type === "string" && (
            <CopyButton
              title={object?.data[0]?.title}
              content={object?.data[0].content_val}
            />
          )}
          <div className="col-span-2  rounded-md flex justify-center items-center overflow-hidden">
            <Image
              src={object?.data[0]?.s3_icon_url}
              alt={object?.data[0]?.title}
              width={32}
              height={32}
              className="bg-white rounded-md invert p-1"
            />
          </div>
          <p className="col-span-3 font-semibold text-xs ms-1 overflow-hidden">
            {object?.data[0]?.title}
          </p>
        </>
      </div>
      <FilePreviewBottomSheet
        url={currentFileURL}
        isOpen={isPreviewSheetOpen}
        onClose={handleBottomSheetClose}
      />
    </>
  );
};

export default RectangleData;
