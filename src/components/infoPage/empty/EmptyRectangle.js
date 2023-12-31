import { CloseIcon, PenEditIcon } from "@/components/Icons";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { kebabCase } from "lodash";

const EmptyRectangle = ({
  data,
  listItems,
  extractedData,
  setExtractedData,
  updatedExtractedData,
  setUpdatedExtractedData,
  removeItem,
  editItem
}) => {
  const [showOptionList, setShowOptionList] = useState(false);
  // const flattenedData = extractedData.flat();
  const [selectedId, setSelectedId] = useState(null); // New state for holding the selected id.
  const [myKey, setMyKey] = useState(0); // New state for holding the selected id.

  const [selectedItemsDetails, setSelectedItemsDetails] = useState(data.data);
  const [saveItemIdForEdit, setSaveItemIdForEdit] = useState(null);
  // console.log("selectedItemsDetails", selectedItemsDetails);
  console.log("$$$$$$$updatedExtractedData", updatedExtractedData);

  useEffect(() => {
    setExtractedData(extractedData);
  }, [extractedData, setExtractedData]);

  useEffect(() => {
    setSelectedItemsDetails(data.data);
  }, [data]);

  const handleItemSelect = (chosenId, title, icon_url) => {
    // Close the option list
    setShowOptionList(false);

    const updatedItemDetails = {
      id: chosenId, // assuming 'id' is the correct property name
      title: title,
      s3_icon_url: icon_url,
      description: "" // if description data is available, use it here
    };

    editItem(saveItemIdForEdit, updatedItemDetails);
    setSaveItemIdForEdit(null);
  };

  // logs

  // Use useEffect to log after the state has been updated
  useEffect(() => {
    console.log("selectedItemsDetails updated", selectedItemsDetails);

    console.log("updated", updatedExtractedData);
  }, [selectedItemsDetails, updatedExtractedData]);

  return (
    <>
      <div
        //   onClick={() => setShowOptionList(!showOptionList)}
        className="mt-4 overflow-hidden "
      >
        {selectedItemsDetails?.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-12 relative items-center text-xs py-3 border-2 rounded-2xl whitespace-nowrap overflow-hidden"
          >
            <>
              <div className=" col-span-2  rounded-md flex justify-center items-center overflow-hidden">
                <div className="absolute left-[10px] flex justify-center items-center">
                  {/* edit */}
                  <span
                    onClick={() => {
                      setSaveItemIdForEdit(item?.guid);
                      setShowOptionList(!showOptionList);
                      setSelectedId(item.id); // Store the selected id when the list is being opened
                    }}
                    className="me-[0.7px]"
                  >
                    <PenEditIcon />
                  </span>
                  {/* delete btn */}

                  <span onClick={() => removeItem(data?.data?.[0])}>
                    <CloseIcon />
                  </span>
                </div>

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
            </>
          </div>
        ))}

        {/* list options */}

        {showOptionList && (
          <div
            className="bg-white shadow-2xl absolute left-[142px] p-4 max-h-[150px] overflow-y-scroll 
                     rounded-md border z-10 "
          >
            <span onClick={() => setShowOptionList(false)}>
              <CloseIcon />
            </span>
            {listItems.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  handleItemSelect(item.id, item.title, item.s3_icon_url)
                }
                className={`py-2 border-b`}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default EmptyRectangle;
