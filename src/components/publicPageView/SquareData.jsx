import React, { useState } from "react";
import Image from "next/image";

// components
import FilePreviewBottomSheet from "@/components/FilePreviewBottomSheet";

// utils
import { checkIsPDForImage, downloadFile } from "@/utils/file";

const SquareData = ({ handleCountingItemClicks, object }) => {
  const [isPreviewSheetOpen, setIsPreviewSheetOpen] = useState(false);
  const [currentFileURL, setCurrentFileURL] = useState(null);

  // condition to detect type of each squares data and redirect based on type
  const handleSquareTypeDetection = (squareIndex) => {
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
      <div className="grid grid-cols-12 mb-5 gap-5">
        {/* first square */}
        <div
          onClick={() => handleSquareTypeDetection(0)} // adjusted for first square
          className="col-span-6 relative"
        >
          {object?.data[0]?.sub_order === 1 ? (
            // exists
            <>
              <div className="px-4 py-3 border-2 rounded-2xl overflow-hidden  ">
                <div
                  className="bg-dark w-[45px] h-[45px] rounded-full mb-3
                  flex justify-center items-center overflow-hidden"
                >
                  <Image
                    src={
                      object?.data[0]?.sub_order === 1 &&
                      object?.data[0]?.s3_icon_url
                    }
                    alt={
                      (object?.data[0]?.sub_order === 1 &&
                        object?.data[0]?.title) ||
                      "social Link"
                    }
                    width={32}
                    height={32}
                    className="bg-white invert"
                  />
                </div>
                <p className="font-medium text-xs text-dark ">
                  {object?.data[0]?.sub_order === 1 && object?.data[0]?.title}
                </p>
                <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
                  {object?.data[0]?.sub_order === 1 &&
                    object?.data[0]?.description}
                  {/* empty space to keep the hight */}
                  {"\u00A0"}
                </p>
              </div>

              {/* two */}
            </>
          ) : // empty
          null}
        </div>

        {/* second square */}
        <div
          onClick={() => handleSquareTypeDetection(1)} // adjusted for second square
          className="col-span-6 relative"
        >
          {object?.data[0]?.sub_order === 2 ||
          object?.data[1]?.sub_order === 2 ? (
            // exists
            <>
              <div className="px-4 py-3 border-2 rounded-2xl overflow-hidden  ">
                <div
                  className="bg-dark w-[45px] h-[45px] rounded-full mb-3
                  flex justify-center items-center overflow-hidden"
                >
                  <Image
                    src={
                      object?.data[1]?.sub_order === 2
                        ? object?.data[1].s3_icon_url
                        : object?.data[0].s3_icon_url
                    }
                    alt={
                      object?.data[1]?.sub_order === 2
                        ? object?.data[1].s3_icon_url
                        : object?.data[0].title
                    }
                    width={32}
                    height={32}
                    className="bg-white invert"
                  />
                </div>
                <p className="font-medium text-xs text-dark ">
                  {object?.data[1]?.sub_order === 2
                    ? object?.data[1].title
                    : object?.data[0].title}
                </p>
                <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
                  {object?.data[1]?.sub_order === 2
                    ? object?.data[1].description
                    : object?.data[0].description}
                  {/* empty space to keep the hight */}
                  {"\u00A0"}
                </p>
              </div>

              {/* two */}
            </>
          ) : // empty
          null}
        </div>
      </div>
      <FilePreviewBottomSheet
        url={currentFileURL}
        isOpen={isPreviewSheetOpen}
        onClose={handleBottomSheetClose}
      />
    </>
  );
};

export default SquareData;
