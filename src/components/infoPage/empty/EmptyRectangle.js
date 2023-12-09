import { CloseIcon } from "@/components/Icons";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { kebabCase } from "lodash";

const EmptyRectangle = ({
  data,
  listItems,
  extractedData,
  setExtractedData,
  updatedExtractedData,
  setUpdatedExtractedData
}) => {
  const [showOptionList, setShowOptionList] = useState(false);
  const flattenedData = extractedData.flat();
  const [selectedId, setSelectedId] = useState(null); // New state for holding the selected id.
  const [myKey, setMyKey] = useState(0); // New state for holding the selected id.

  useEffect(() => {
    setExtractedData(extractedData);
  }, [extractedData, setExtractedData]);

  const handleItemSelect = (chosenId, title, icon_url) => {
    // Close the option list
    setShowOptionList(false);

    const updatedData = extractedData.map((section, key) =>
      section.map((item) => {
        // For each item, check if it's the one that needs updating
        if (item.content_id === selectedId) {
          //   console.log(key);
          console.log(key);

          console.log(true);
          setMyKey(key);
          console.log(myKey);
          return { ...item, content_id: chosenId, title, icon_url };
          // If it is, return a new object with the updated details from the chosen option
        }
        // Otherwise, return the item unmodified

        return item;
      })
    );

    // setExtractedData(updatedData);
    if (updatedExtractedData.length !== 0) {
      const data = updatedExtractedData;
      data[myKey] = updatedData[myKey];
      setUpdatedExtractedData(data);
    } else {
      setUpdatedExtractedData(updatedData);
    }
  };

  return (
    <div
      //   onClick={() => setShowOptionList(!showOptionList)}
      className="mt-4 overflow-hidden"
    >
      {data.data.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            setShowOptionList(!showOptionList);
            setSelectedId(item.id); // Store the selected id when the list is being opened
          }}
          className="grid grid-cols-12 items-center text-xs py-3 border-2 rounded-2xl whitespace-nowrap overflow-hidden"
        >
          <div className="col-span-2  rounded-md flex justify-center items-center overflow-hidden">
            <Image
              src={item.s3_icon_url}
              alt={item.title}
              width={32}
              height={32}
              className="bg-white rounded-md invert p-1"
            />
          </div>
          <p className="col-span-3 font-semibold text-xs ms-1 overflow-hidden">
            {item.title}:
          </p>
          <p className="col-span-7 font-semibold text-xs ms-1 overflow-hidden truncate">
            {item.description}
          </p>
        </div>
      ))}

      {/* list options */}
      {showOptionList && (
        <div
          className="bg-white shadow-2xl absolute left-[142px] p-4 max-h-[150px] overflow-y-scroll 
                     rounded-md border z-10"
        >
          <span onClick={() => setShowOptionList(false)}>
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
  );
};

export default EmptyRectangle;
