import {
  CloseIcon,
  Instagram,
  PenEditIcon,
  PlusSignPageView,
  Telegram
} from "@/components/Icons";
import InfoSocialMediaSquare from "@/components/InfoSocialMediaSquare";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoadingState from "@/components/LoadingState";
import EditHorzItems from "@/pages/app/contents/horz/editHorzItems";

const SquareDataExists = ({
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

  // Create an array to keep track of showOptionList state for each square
  const [showOptionListArray, setShowOptionListArray] = useState(
    Array(data.data.length).fill(false)
  );

  const [selectedItemsDetails, setSelectedItemsDetails] = useState(data.data);
  const [showOptionListSquareOne, setShowOptionListSquareOne] = useState(false);
  const [showOptionListSquareTwo, setShowOptionListSquareTwo] = useState(false);
  const [selectedSquareOneOption, setSelectedSquareOneOption] = useState(null);

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

  useEffect(() => {
    console.log("selectedItemsDetails&&&&&&&&&", selectedItemsDetails);
  }, [selectedItemsDetails]);

  const handleItemSelect = (
    chosenId,
    title,
    icon_url
    // sub_order,
    // main_order
  ) => {
    // Close all option lists
    setShowOptionListArray(Array(data.data.length).fill(false));

    const updatedData = [...extractedData].map((section) =>
      section.map((item) =>
        item.content_id === selectedId
          ? {
              ...item,
              content_id: chosenId,
              title,
              icon_url
            }
          : item
      )
    );

    // Correctly declared and constructed updatedItemDetails object within the function
    const updatedItemDetails = {
      id: chosenId, // assuming 'id' is the correct property name
      title: title,
      s3_icon_url: icon_url,
      description: "" // if description data is available, use it here
    };

    // Now updatedItemDetails is recognized within this scope
    setSelectedItemsDetails((currentDetails) =>
      currentDetails.map((item, index) =>
        index === myKey ? updatedItemDetails : item
      )
    );
    const updatedItemDetailsFromSelection = {
      // ... other fields ...
      description: "" // Add actual description if available
    };

    // Update the details for the correct square based on 'myKey'
    setSelectedItemsDetails((currentDetails) =>
      currentDetails.map((item, index) =>
        index === myKey ? { ...item, ...updatedItemDetailsFromSelection } : item
      )
    );

    // Identify the section that contains the item with the selectedId
    const sectionIndex = extractedData.findIndex((section) =>
      section.some((item) => item.content_id === selectedId)
    );

    setExtractedData(updatedData);

    if (updatedExtractedData.length !== 0 && sectionIndex !== -1) {
      // Note that I'm using a functional state update here because I'm relying
      // on the previous state value for updatedExtractedData
      setUpdatedExtractedData((prevData) => {
        const newData = [...prevData];
        newData[sectionIndex] = updatedData[sectionIndex];
        return newData;
      });
    } else {
      setUpdatedExtractedData(updatedData);
    }
  };

  const removeItem = (itemToRemove, index, mainOrder, type) => {
    const { sub_order, id } = itemToRemove;

    // Update selectedItemsDetails using the set function callback
    setSelectedItemsDetails((prevSelectedItemsDetails) => {
      // Create a copy of the array to avoid mutating the state directly
      const updatedDetails = [...prevSelectedItemsDetails];
      // Remove the item at the specified index
      updatedDetails.splice(index, 1);

      return updatedDetails;
    });

    const newUpdatedExtractedData = updatedExtractedData.length
      ? updatedExtractedData
      : [...extractedData];

    // Flatten the updatedExtractedData
    const flattenedUpdatedExtractedData = newUpdatedExtractedData.flatMap(
      (section) => section
    );

    // Filter out the item to remove based on conditions
    const updatedItems = flattenedUpdatedExtractedData.filter(
      (item) => !(item.content_id === id)
    );

    // Handling main order after delete
    let updatedData = [...updatedItems];

    if (sub_order === 1) {
      // Here you might renumber the main_order values for the remaining items,
      // as mentioned in the previous response
      const hasSquareWithSubOrder2 = updatedData.some(
        (item) =>
          item.main_order === mainOrder &&
          item.sub_order === 2 &&
          item.display_box_type === "square"
      );

      if (!hasSquareWithSubOrder2) {
        // Iterate over the remaining items and decrement main_order by 1
        updatedData = updatedData.map((item) => {
          if (item.main_order > mainOrder) {
            return {
              ...item,
              main_order: item.main_order - 1
            };
          }

          return item;
        });
      }
    }

    if (sub_order === 2) {
      // Here you might renumber the main_order values for the remaining items,
      // as mentioned in the previous response
      const hasSquareWithSubOrder1 = updatedData.some(
        (item) =>
          // 2 === 2 &&
          item.sub_order === 1 && item.display_box_type === "square"
      );

      if (!hasSquareWithSubOrder1) {
        // Iterate over the remaining items and decrement main_order by 1
        updatedData = updatedData.map((item) => {
          if (item.main_order > mainOrder) {
            return {
              ...item,
              main_order: item.main_order - 1
            };
          }

          return item;
        });
      }
    }

    // Group the updated items by main_order and update the state
    const groupedData = updatedData.reduce((acc, item) => {
      const sectionIndex = item.main_order - 1;
      if (!acc[sectionIndex]) {
        acc[sectionIndex] = [];
      }
      acc[sectionIndex].push(item);
      return acc;
    }, []);

    setUpdatedExtractedData(groupedData);
  };

  // handle adding square one items
  const handleSquareOneSelect = (chosenId, title, icon_url, mainOrder) => {
    // Create the rectangle item detail object
    const ItemDetails = {
      content_id: chosenId,
      title: title,
      s3_icon_url: icon_url,
      description: "", // Add description if available
      sub_order: 1, // Set sub_order if needed,
      main_order: mainOrder,
      display_box_type: "square",
      beingEddited: true,
      addedItem: true
    };

    // Set the selected option for square one
    setSelectedSquareOneOption({
      id: chosenId,
      title: title,
      s3_icon_url: icon_url,
      description: ""
    });

    setShowOptionList(false);
    // Update selectedItemsDetails with the selected option at index 0
    // const updateList = [selectedSquareOneOption].concat(selectedItemsDetails);
    // setSelectedItemsDetails(updateList);

    // Update selectedItemsDetails with the selected option at index 0
    setSelectedItemsDetails((prevDetails) => [ItemDetails, ...prevDetails]);
  };

  return (
    <>
      {data.data ? (
        <>
          <div className="grid grid-cols-12 mt-5 gap-5">
            {/* first square */}
            <div className="col-span-6 relative">
              {selectedItemsDetails[0]?.sub_order === 1 ? (
                <>
                  <div className=" px-4 py-3 border-2 rounded-2xl overflow-hidden  ">
                    <div className="flex items-center justify-center mt-3">
                      <span
                        onClick={() =>
                          removeItem(
                            selectedItemsDetails[0],
                            0,
                            data.main_order,
                            data.display_box_type
                          )
                        }
                        className="absolute left-[15px]"
                      >
                        <CloseIcon />
                      </span>
                      <span
                        onClick={() => handleSquareClick(0, data.data[0]?.id)}
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
                        src={selectedItemsDetails[0]?.s3_icon_url}
                        alt={selectedItemsDetails[0]?.title}
                        width={32}
                        height={32}
                        className="bg-white invert"
                      />
                    </div>
                    <p className="font-medium text-xs text-dark ">
                      {selectedItemsDetails[0]?.title}
                    </p>
                    <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
                      {selectedItemsDetails[0]?.description}
                    </p>
                  </div>

                  {/* two */}

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
                            handleItemSelect(item.id, item.title, item.icon_url)
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
                <>
                  {selectedSquareOneOption ? (
                    <>
                      {selectedSquareOneOption ? (
                        <>
                          <div
                            onClick={() =>
                              setShowOptionListSquareOne(
                                !showOptionListSquareOne
                              )
                            }
                            className="col-span-6 px-4 py-3 border-2 rounded-2xl overflow-hidden h-[140px] bg-graySubmit shadow-customInset
      flex justify-center items-center relative"
                          >
                            <PlusSignPageView />
                            <p>step3</p>

                            <div>
                              {showOptionListSquareOne ? (
                                <div
                                  className="bg-white absolute shadow-2xl  left-[0px] top-0 right-0 p-4 max-h-[150px] overflow-y-scroll 
                   rounded-md border "
                                >
                                  <span
                                    onClick={() =>
                                      setShowOptionListSquareOne(false)
                                    }
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
                                          selectedItemsDetails[0].main_order
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
                                      item.icon_url
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
                        <p>deleted</p>
                      )}
                    </>
                  ) : (
                    // empty square
                    <div
                      onClick={() =>
                        setShowOptionListSquareOne(!showOptionListSquareOne)
                      }
                      className="col-span-6 px-4 py-3 border-2 rounded-2xl overflow-hidden h-[140px] bg-graySubmit shadow-customInset
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
                                    selectedItemsDetails[0].main_order
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
              )}
            </div>

            {/* second square */}
            <div className="col-span-6 relative">
              {selectedItemsDetails[1]?.sub_order === 2 ||
              selectedItemsDetails[0]?.sub_order === 2 ? (
                <>
                  {/* first squre */}
                  <div className="px-4 py-3 border-2 rounded-2xl overflow-hidden  ">
                    <div className="flex items-center justify-center mt-3">
                      <span
                        onClick={() =>
                          removeItem(
                            selectedItemsDetails[1]?.sub_order === 2
                              ? selectedItemsDetails[1]
                              : selectedItemsDetails[0],

                            selectedItemsDetails[1]?.sub_order === 2 ? 1 : 0,

                            selectedItemsDetails[1]?.sub_order === 2
                              ? selectedItemsDetails[1].main_order
                              : selectedItemsDetails[0].main_order,

                            selectedItemsDetails[1]?.sub_order === 2
                              ? selectedItemsDetails[1].display_box_type
                              : selectedItemsDetails[0].display_box_type
                          )
                        }
                        className="absolute left-[15px]"
                      >
                        <CloseIcon />
                      </span>
                      <span
                        onClick={() => handleSquareClick(1, data.data[1]?.id)}
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
                        src={
                          selectedItemsDetails[1]?.sub_order === 2
                            ? selectedItemsDetails[1].s3_icon_url
                            : selectedItemsDetails[0].s3_icon_url
                        }
                        alt={
                          selectedItemsDetails[1]?.sub_order === 2
                            ? selectedItemsDetails[1].title
                            : selectedItemsDetails[0].title
                        }
                        width={32}
                        height={32}
                        className="bg-white invert"
                      />
                    </div>
                    <p className="font-medium text-xs text-dark ">
                      {selectedItemsDetails[1]?.sub_order === 2
                        ? selectedItemsDetails[1].title
                        : selectedItemsDetails[0].title}
                    </p>
                    <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
                      {selectedItemsDetails[1]?.sub_order === 2
                        ? selectedItemsDetails[1].description
                        : selectedItemsDetails[0].description}
                    </p>
                  </div>

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
                            handleItemSelect(item.id, item.title, item.icon_url)
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
                <div
                  onClick={() =>
                    setShowOptionListSquareTwo(!showOptionListSquareTwo)
                  }
                  className="col-span-6 px-4 py-3 border-2 rounded-2xl overflow-hidden h-[140px] bg-graySubmit shadow-customInset
          flex justify-center items-center relative
  
          "
                >
                  <PlusSignPageView />

                  <div>
                    {showOptionListSquareTwo ? (
                      <div
                        className="bg-white absolute shadow-2xl  left-[0px] top-0 right-0 p-4 max-h-[150px] overflow-y-scroll 
                       rounded-md border "
                      >
                        <span onClick={() => setShowOptionListSquareTwo(false)}>
                          <CloseIcon />
                        </span>
                        {listItems.map((item) => (
                          <div
                            key={item.id}
                            // onClick={() =>
                            //   handleSquareOneSelect(
                            //     item.id,
                            //     item.title,
                            //     item.s3_icon_url
                            //   )
                            // }
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
      ) : (
        <LoadingState />
      )}
    </>
  );
};

export default SquareDataExists;
