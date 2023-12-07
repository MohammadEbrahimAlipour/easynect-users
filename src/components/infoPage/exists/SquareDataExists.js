import { CloseIcon, Instagram, Telegram } from "@/components/Icons";
import InfoSocialMediaSquare from "@/components/InfoSocialMediaSquare";
import React, { useState } from "react";
import Image from "next/image";

const SquareDataExists = ({ data, listItems }) => {
  // Create an array to keep track of showOptionList state for each square
  const [showOptionListArray, setShowOptionListArray] = useState(
    Array(data.data.length).fill(false)
  );

  const handleSquareClick = (index) => {
    // Update the showOptionList state for the clicked square
    const newArray = [...showOptionListArray];
    newArray[index] = !newArray[index];
    setShowOptionListArray(newArray);
  };

  return (
    <>
      <div className="grid grid-cols-2 mt-5 gap-5">
        {/* each square */}
        {data.data.map((item, index) => (
          <div
            key={item.id}
            className="px-4 py-3 border-2 rounded-2xl overflow-hidden relative "
            onClick={() => handleSquareClick(index)}
          >
            <div
              className="bg-dark w-[45px] h-[45px] rounded-full mb-3
      flex justify-center items-center overflow-hidden"
            >
              <Image
                src={item.s3_icon_url}
                alt={item.title}
                width={32}
                height={32}
                className="bg-white invert"
              />
            </div>
            <p className="font-medium text-xs text-dark ">{item.title}</p>
            <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
              {item.description}
            </p>

            {/* list options */}
            {showOptionListArray[index] && (
              <div
                className="bg-white shadow-2xl absolute left-[0px] top-0 right-0 p-4 max-h-[150px] overflow-y-scroll 
                     rounded-md border "
              >
                <span onClick={() => handleSquareClick(index)}>
                  <CloseIcon />
                </span>
                {listItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      handleItemSelect(item.id, item.title, item.icon_url)
                    }
                    className={`py-2 border-b `}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SquareDataExists;
