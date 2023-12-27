import {
  CloseIcon,
  Instagram,
  PenEditIcon,
  PlusSignPageView,
  Telegram
} from "@/components/Icons";
import InfoSocialMediaSquare from "@/components/InfoSocialMediaSquare";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import LoadingState from "@/components/LoadingState";
import EditHorzItems from "@/pages/app/contents/horz/editHorzItems";

const SquareDataExists = ({
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

  // Create an array to keep track of showOptionList state for each square
  const [showOptionListArray, setShowOptionListArray] = useState(
    Array(data.data.length).fill(false)
  );

  const [selectedItemsDetails, setSelectedItemsDetails] = useState(data?.data);

  const [showOptionListSquareOne, setShowOptionListSquareOne] = useState(false);
  const [selectedSquareOneOption, setSelectedSquareOneOption] = useState(null);
  const [showOptionListSquareTwo, setShowOptionListSquareTwo] = useState(false);
  const [saveItemIdForEdit, setSaveItemIdForEdit] = useState(null);

  const generateUniqueID = () => {
    return `id-${new Date().getTime()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  };

  const handleSquareClick = (index, itemId) => {
    setShowOptionListArray((currentShowOptionListArray) =>
      currentShowOptionListArray.map((value, i) =>
        i === index ? !value : false
      )
    );
    setSelectedId(itemId);
    setMyKey(index); // This will keep track of which square is being interacted with.
  };

  useEffect(() => {
    setExtractedData(extractedData);
  }, [extractedData, setExtractedData]);

  const handleItemSelect = (chosenId, title, icon_url) => {
    // Close all option lists
    setShowOptionListArray(Array(data.data.length).fill(false));

    // Correctly declared and constructed updatedItemDetails object within the function
    const updatedItemDetails = {
      id: chosenId, // assuming 'id' is the correct property name
      title: title,
      s3_icon_url: icon_url,
      description: "" // if description data is available, use it here
    };

    editItem(saveItemIdForEdit, updatedItemDetails);
    setSaveItemIdForEdit(null);
  };

  // handle adding square one items
  const handleSquareOneSelect = (chosenId, title, icon_url, squareOne) => {
    const newData = updatedExtractedData.map((item) => {
      if (Array.isArray(item.data)) {
        if (item.data?.[0]?.guid === squareOne.guid) {
          item.data.push({
            // Create the rectangle item detail object
            content_id: chosenId,
            title: title,
            s3_icon_url: icon_url,
            description: "", // Add description if available
            sub_order: 1, // Set sub_order if needed,
            main_order: squareOne.main_order,
            display_box_type: "square",
            beingEddited: true,
            addedItem: true,
            guid: generateUniqueID()
          });
        }
      }
      return item;
    });
    setUpdatedExtractedData([...newData]);
  };

  // handle adding square one items
  const handleSquareTwoSelect = (chosenId, title, icon_url, squareOne) => {
    const newData = updatedExtractedData.map((item) => {
      if (Array.isArray(item.data)) {
        if (item.data?.[0]?.guid === squareOne.guid) {
          item.data.push({
            // Create the rectangle item detail object
            content_id: chosenId,
            title: title,
            s3_icon_url: icon_url,
            description: "", // Add description if available
            sub_order: 2, // Set sub_order if needed,
            main_order: squareOne.main_order,
            display_box_type: "square",
            beingEddited: true,
            addedItem: true,
            guid: generateUniqueID()
          });
        }
      }
      return item;
    });
    setUpdatedExtractedData([...newData]);
  };

  // useEffect(() => {
  //   console.log("selectedItemsDetails", selectedItemsDetails);
  // }, [selectedItemsDetails]);

  const firstSquare = useMemo(() => {
    return data?.data?.filter((item) => item.sub_order === 1);
  }, [data]);

  const secondSquare = useMemo(() => {
    return data?.data?.filter((item) => item.sub_order === 2);
  }, [data]);

  return (
    <>
      {data.data ? (
        <>
          <div className="grid grid-cols-12 mt-5 gap-5">
            {/* first square */}
            <div className="col-span-6 relative">
              <>
                {firstSquare?.[0] ? (
                  // exists
                  <>
                    <div className=" px-4 py-3 border-2 rounded-2xl overflow-hidden  ">
                      <div className="flex items-center justify-center mt-3">
                        <span
                          onClick={() => removeItem(firstSquare[0])}
                          className="absolute left-[15px]"
                        >
                          <CloseIcon />
                        </span>
                        <span
                          onClick={() => {
                            setSaveItemIdForEdit(firstSquare[0]?.guid);
                            handleSquareClick(0, firstSquare[0]?.id);
                          }}
                          className="absolute left-[40px]"
                        >
                          <PenEditIcon />
                        </span>
                      </div>
                      <div
                        className="bg-dark w-[45px] h-[45px] rounded-full mb-3
flex justify-center items-center overflow-hidden"
                      >
                        <Image
                          src={firstSquare[0]?.s3_icon_url}
                          alt={firstSquare[0]?.title}
                          width={32}
                          height={32}
                          className="bg-white invert"
                        />
                      </div>
                      <p className="font-medium text-xs text-dark ">
                        {firstSquare[0]?.title}
                      </p>
                      <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
                        {firstSquare[0]?.description}
                      </p>
                    </div>

                    {/* list options */}
                    {showOptionListArray[0] && (
                      <div
                        className="bg-white shadow-2xl absolute left-[0px] top-0 right-0 p-4 max-h-[150px] overflow-y-scroll 
                             rounded-md border "
                      >
                        <span onClick={() => handleSquareClick(0)}>
                          <CloseIcon />
                        </span>
                        {listItems.map((item) => (
                          <div
                            key={item.id}
                            onClick={() =>
                              handleItemSelect(
                                item.id,
                                item.title,
                                item.s3_icon_url
                              )
                            }
                            className={`py-2 border-b `}
                          >
                            {item.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // empty
                  <div
                    onClick={() =>
                      setShowOptionListSquareOne(!showOptionListSquareOne)
                    }
                    className="col-span-6 px-4 py-3 rounded-2xl overflow-hidden h-[140px] bg-graySubmit border border-darkGray
                 flex justify-center items-center relative"
                  >
                    <PlusSignPageView />

                    <div>
                      {showOptionListSquareOne ? (
                        <div
                          className="bg-white absolute shadow-2xl  left-[0px] top-0 right-0 p-4 max-h-[150px] overflow-y-scroll 
                       rounded-md border "
                        >
                          <span
                            onClick={() => setShowOptionListSquareOne(false)}
                          >
                            <CloseIcon />
                          </span>
                          {listItems.map((item) => (
                            <div
                              key={item.id}
                              onClick={() =>
                                handleSquareOneSelect(
                                  item.id,
                                  item.title,
                                  item.s3_icon_url,
                                  secondSquare[0]
                                )
                              }
                              className={`py-2 border-b `}
                            >
                              {item.title}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </>
            </div>

            {/* second square */}
            <div className="col-span-6 relative">
              {secondSquare?.[0] ? (
                // exists
                <>
                  <div className="px-4 py-3 border-2 rounded-2xl overflow-hidden  ">
                    <div className="flex items-center justify-center mt-3">
                      <span
                        onClick={() => removeItem(secondSquare[0])}
                        className="absolute left-[15px]"
                      >
                        <CloseIcon />
                      </span>
                      <span
                        onClick={() => {
                          setSaveItemIdForEdit(secondSquare[0]?.guid);
                          handleSquareClick(1, secondSquare[0]?.id);
                        }}
                        className="absolute left-[40px]"
                      >
                        <PenEditIcon />
                      </span>
                    </div>

                    <div
                      className="bg-dark w-[45px] h-[45px] rounded-full mb-3
                  flex justify-center items-center overflow-hidden"
                    >
                      <Image
                        src={secondSquare[0]?.s3_icon_url}
                        alt={secondSquare[0]?.title}
                        width={32}
                        height={32}
                        className="bg-white invert"
                      />
                    </div>
                    <p className="font-medium text-xs text-dark ">
                      {secondSquare[0]?.title}
                    </p>
                    <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
                      {secondSquare[0].title}
                    </p>
                  </div>

                  {/* two */}

                  {/* list options */}
                  {showOptionListArray[1] && (
                    <div
                      className="bg-white shadow-2xl absolute left-[0px] top-0 right-0 p-4 max-h-[150px] overflow-y-scroll 
             rounded-md border "
                    >
                      <span onClick={() => handleSquareClick(1)}>
                        <CloseIcon />
                      </span>
                      {listItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() =>
                            handleItemSelect(
                              item.id,
                              item.title,
                              item.s3_icon_url
                            )
                          }
                          className={`py-2 border-b `}
                        >
                          {item.title}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                // empty
                <div
                  onClick={() =>
                    setShowOptionListSquareOne(!showOptionListSquareOne)
                  }
                  className="col-span-6 px-4 py-3 rounded-2xl overflow-hidden h-[140px] bg-graySubmit border border-darkGray
      flex justify-center items-center relative"
                >
                  <PlusSignPageView />

                  <div>
                    {showOptionListSquareOne ? (
                      <div
                        className="bg-white absolute shadow-2xl  left-[0px] top-0 right-0 p-4 max-h-[150px] overflow-y-scroll 
            rounded-md border "
                      >
                        <span onClick={() => setShowOptionListSquareOne(false)}>
                          <CloseIcon />
                        </span>
                        {listItems.map((item) => (
                          <div
                            key={item.id}
                            onClick={() =>
                              handleSquareTwoSelect(
                                item.id,
                                item.title,
                                item.s3_icon_url,
                                firstSquare[0]
                              )
                            }
                            className={`py-2 border-b `}
                          >
                            {item.title}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : // <LoadingState />
      null}
    </>
  );
};

export default SquareDataExists;
