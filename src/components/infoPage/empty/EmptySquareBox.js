import { CloseIcon, PlusSignPageView } from "@/components/Icons";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const EmptySquareBox = ({
  setUpdatedExtractedData,
  setExtractedData,
  extractedData,
  updatedExtractedData,
  listItems
}) => {
  const [boxType, setBoxType] = useState("");
  const [showAddPopUp, setShowAddPopUp] = useState(false);
  const [showAddSquareOnePopUp, setShowAddSquareOnePopUp] = useState(false);
  const [showRecPopUp, setShowRecPopUp] = useState(false);
  const [showOptionList, setShowOptionList] = useState(false);
  const [localItemsSelected, setLocalItemsSelected] = useState([]);

  const [showOptionListSquare, setShowOptionListSquare] = useState(false);
  const [showOptionListSquareTwo, setShowOptionListSquareTwo] = useState(false);
  const [showOptionListArray, setShowOptionListArray] = useState();
  // Assume we have a state to hold the history of all changes to localItemsSelected
  const [localItemsHistory, setLocalItemsHistory] = useState([]);

  const HandleSquareType = () => {
    setBoxType("squareBox");
    setShowAddPopUp(false);
  };

  const HandleRecType = () => {
    setBoxType("recBox");
    setShowAddPopUp(false);
  };

  const HandleShowAddPopUp = () => {
    setShowAddPopUp(true);
  };

  // Use useEffect to initialize localItemsSelected with existing `extractedData`
  useEffect(() => {
    // Flattening the `extractedData` as we don't want nested arrays here
    // Assuming `extractedData` is an array of arrays based on your previously shared code
    const flatExtractedData = extractedData.flat();
    setLocalItemsSelected(flatExtractedData);
  }, [extractedData]);

  const getNextMainOrder = () => {
    // Extract all the main_order numbers into a new array
    const mainOrders = localItemsSelected.map((item) => item.main_order);

    // Find the max value in the mainOrders array
    const maxOrder = mainOrders.length > 0 ? Math.max(...mainOrders) : 0;

    return maxOrder + 1; // Increment the maxOrder by one to get the next order
  };

  const handleRecSelect = (chosenId, title, icon_url) => {
    // Create the rectangle item detail object
    const rectangleItemDetails = {
      id: chosenId,
      title: title,
      s3_icon_url: icon_url,
      description: "", // Add description if available
      main_order: getNextMainOrder(), // Assign the next order number in sequence
      sub_order: 1, // Set sub_order if needed
      display_box_type: "rectangle",
      beingEddited: true
    };

    // Append the new item to localItemsSelected
    setLocalItemsSelected((prevItems) => [...prevItems, rectangleItemDetails]);

    setShowOptionList(false);
  };

  const handleSquareOneSelect = (chosenId, title, icon_url) => {
    // Create the rectangle item detail object
    const rectangleItemDetails = {
      id: chosenId,
      title: title,
      s3_icon_url: icon_url,
      description: "", // Add description if available
      main_order: getNextMainOrder(), // Assign the next order number in sequence
      sub_order: 1, // Set sub_order if needed
      display_box_type: "square",
      beingEddited: true
    };

    // Append the new item to localItemsSelected
    setLocalItemsSelected((prevItems) => [...prevItems, rectangleItemDetails]);

    setShowOptionList(false);
  };

  const handleSquareTwoSelect = (chosenId, title, icon_url) => {
    // Create the rectangle item detail object
    const rectangleItemDetails = {
      id: chosenId,
      title: title,
      s3_icon_url: icon_url,
      description: "", // Add description if available
      main_order: getNextMainOrder(), // Assign the next order number in sequence
      sub_order: 2, // Set sub_order if needed
      display_box_type: "square",
      beingEddited: true
    };

    // Append the new item to localItemsSelected
    setLocalItemsSelected((prevItems) => [...prevItems, rectangleItemDetails]);

    setShowOptionList(false);
  };

  const removeItem = (mainOrder, subOrder, type, index) => {
    // handling main order after delete
    if (type === "square" && subOrder === 1) {
      // Here you might renumber the main_order values for the remaining items,
      // as mentioned in the previous response
      const hasSquareWithSubOrder2 = localItemsSelected.some(
        (item) =>
          item.main_order === mainOrder &&
          item.sub_order === 2 &&
          item.display_box_type === "square"
      );

      if (!hasSquareWithSubOrder2) {
        // Iterate over the remaining items and decrement main_order by 1
        const updatedItems = localItemsSelected.map((item) => {
          if (item.main_order > mainOrder) {
            return {
              ...item,
              main_order: item.main_order - 1
            };
          }

          return item;
        });

        updatedItems.splice(index, 1);
        setLocalItemsSelected(updatedItems);
        setUpdatedExtractedData(updatedItems);
        // You might also want to update the corresponding data if needed
      }
    }

    if (type === "square" && subOrder === 2) {
      const hasSquareWithSubOrder1 = localItemsSelected.some(
        (item) =>
          item.main_order === mainOrder &&
          item.sub_order === 1 &&
          item.display_box_type === "square"
      );

      if (!hasSquareWithSubOrder1) {
        // Iterate over the remaining items and decrement main_order by 1
        const updatedItems = localItemsSelected.map((item) => {
          if (item.main_order > mainOrder) {
            return {
              ...item,
              main_order: item.main_order - 1
            };
          }

          return item;
        });

        updatedItems.splice(index, 1);
        setLocalItemsSelected(updatedItems);
        setUpdatedExtractedData(updatedItems);
        // You might also want to update the corresponding data if needed
      }
    }

    if (type === "rectangle") {
      // Iterate over the remaining items and decrement main_order by 1
      const updatedItems = localItemsSelected.map((item) => {
        if (item.main_order > mainOrder) {
          return {
            ...item,
            main_order: item.main_order - 1
          };
        }

        return item;
      });

      updatedItems.splice(index, 1);
      setLocalItemsSelected(updatedItems);
      setUpdatedExtractedData(updatedItems);
      // You might also want to update the corresponding data if needed
    }
  };

  return (
    <>
      {/* preview */}

      {localItemsSelected?.map((object, index) => (
        <div key={`${object.main_order}-${object.sub_order}`} className="my-3">
          {/* square section */}

          {object.display_box_type === "square" && object.beingEddited ? (
            <div className="grid grid-cols-12 mt-5 gap-5">
              {/* first square */}
              <div className="col-span-6 relative">
                {object.sub_order === 1 ? (
                  <div className=" px-4 py-3 border-2 rounded-2xl overflow-hidden  ">
                    {/* delete btn */}
                    <span
                      onClick={() =>
                        removeItem(
                          object.main_order,
                          object.sub_order,
                          object.display_box_type,
                          index
                        )
                      }
                      className="absolute left-[15px]"
                    >
                      <CloseIcon />
                    </span>
                    <div
                      className="bg-dark w-[45px] h-[45px] rounded-full mb-3
     flex justify-center items-center overflow-hidden"
                    >
                      <Image
                        src={object?.s3_icon_url}
                        alt={object?.title}
                        width={32}
                        height={32}
                        className="bg-white invert"
                      />
                    </div>
                    <p className="font-medium text-xs text-dark ">
                      {object?.title}
                    </p>
                    <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
                      {object?.description}
                    </p>
                  </div>
                ) : null}

                {/* second square */}
              </div>
              <div className="col-span-6 relative">
                {object.sub_order === 2 ? (
                  <div className=" px-4 py-3 border-2 rounded-2xl overflow-hidden  ">
                    {/* delete btn */}
                    <span
                      onClick={() =>
                        removeItem(
                          object.main_order,
                          object.sub_order,
                          object.display_box_type,
                          index
                        )
                      }
                      className="absolute left-[15px]"
                    >
                      <CloseIcon />
                    </span>
                    <div
                      className="bg-dark w-[45px] h-[45px] rounded-full mb-3
     flex justify-center items-center overflow-hidden"
                    >
                      <Image
                        src={object?.s3_icon_url}
                        alt={object?.title}
                        width={32}
                        height={32}
                        className="bg-white invert"
                      />
                    </div>
                    <p className="font-medium text-xs text-dark ">
                      {object?.title}
                    </p>
                    <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
                      {object?.description}
                    </p>
                  </div>
                ) : null}

                {/* two */}
              </div>
            </div>
          ) : null}

          {/* rectangle */}

          {object.display_box_type === "rectangle" && object.beingEddited ? (
            <div className=" grid grid-cols-12 relative items-center text-xs py-3 border-2 rounded-2xl whitespace-nowrap overflow-hidden">
              {/* delete btn */}
              <span
                onClick={() =>
                  removeItem(
                    object.main_order,
                    object.sub_order,
                    object.display_box_type,
                    index
                  )
                }
                className="absolute left-[15px]"
              >
                <CloseIcon />
              </span>
              <div className="col-span-2  rounded-md flex justify-center items-center overflow-hidden">
                <Image
                  src={object.s3_icon_url}
                  alt={object.title}
                  width={32}
                  height={32}
                  className="bg-white rounded-md invert p-1"
                />
              </div>
              <p className="col-span-3 font-semibold text-xs ms-1 overflow-hidden">
                {object.title}:
              </p>
              <p className="col-span-7 font-semibold text-xs ms-1 overflow-hidden truncate">
                {object.description}
              </p>
            </div>
          ) : null}
        </div>
      ))}

      {/* end of preview */}

      {boxType === "squareBox" ? (
        <>
          {/* square box */}
          <div className="grid grid-cols-12 gap-5 mb-4  relative ">
            {/* square box popup */}

            <div
              onClick={() => setShowOptionListSquare(!showOptionListSquare)}
              className="col-span-6 px-4 py-3 border-2 rounded-2xl overflow-hidden h-[140px] bg-graySubmit shadow-customInset
        flex justify-center items-center relative

        "
            >
              <PlusSignPageView />

              <div>
                {showOptionListSquare && (
                  <div
                    className="bg-white absolute shadow-2xl  left-[0px] top-0 right-0 p-4 max-h-[150px] overflow-y-scroll 
                     rounded-md border "
                  >
                    <span onClick={() => setShowOptionListSquare(false)}>
                      <CloseIcon />
                    </span>
                    {listItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() =>
                          handleSquareOneSelect(
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
              </div>
            </div>

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
                {showOptionListSquareTwo && (
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
                        onClick={() =>
                          handleSquareTwoSelect(
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
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* rectangle */}
      {boxType === "recBox" ? (
        <>
          <div className="bg-graySubmit shadow-customInset relative rounded-md py-3 flex justify-center items-center mb-4">
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
                      handleRecSelect(item.id, item.title, item.icon_url)
                    }
                    className={`py-2 border-b `}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            )}

            <span onClick={() => setShowOptionList(true)}>
              <PlusSignPageView />
            </span>
          </div>
        </>
      ) : null}

      {/* add data */}
      <div className="bg-graySubmit relative rounded-md py-1 flex justify-center items-center">
        {/* popUp */}
        <div
          className={`absolute bg-white border shadow-2xl rounded-md px-6 py-3 items-center justify-center  transition-all duration-300 ${
            showAddPopUp ? "" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* close BTN */}
          <div className="mb-3" onClick={() => setShowAddPopUp(false)}>
            <CloseIcon />
          </div>

          <div className="flex flex-col">
            <div
              onClick={HandleSquareType}
              className="text-sm border border-dark rounded-md px-2 py-1 text-dark font-ravi mb-2"
            >
              باکس مربع ای
            </div>
            <div
              onClick={HandleRecType}
              className="text-sm border border-dark rounded-md px-2 py-1 text-dark font-ravi"
            >
              باکس مستطیل
            </div>
          </div>
        </div>

        {/* add pop up  */}
        <span onClick={HandleShowAddPopUp}>
          <PlusSignPageView />
        </span>
      </div>
    </>
  );
};

export default EmptySquareBox;
