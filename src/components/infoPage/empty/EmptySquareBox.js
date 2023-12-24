import { CloseIcon, PlusSignPageView } from "@/components/Icons";
import React, { useState, useEffect, useRef, Fragment } from "react";
import Image from "next/image";
import { set } from "lodash";

const EmptySquareBox = ({
  setUpdatedExtractedData,
  setExtractedData,
  extractedData,
  updatedExtractedData,
  listItems,
  setAddedItems,
  localItemsSelected,
  setLocalItemsSelected
}) => {
  const [boxType, setBoxType] = useState("");
  const [showAddPopUp, setShowAddPopUp] = useState(false);
  const [showAddSquareOnePopUp, setShowAddSquareOnePopUp] = useState(false);
  const [showRecPopUp, setShowRecPopUp] = useState(false);
  const [showOptionList, setShowOptionList] = useState(false);

  const [showOptionListSquare, setShowOptionListSquare] = useState(false);
  const [showOptionListSquareTwo, setShowOptionListSquareTwo] = useState(false);
  const [showOptionListArray, setShowOptionListArray] = useState();
  // Assume we have a state to hold the history of all changes to localItemsSelected
  const [localItemsHistory, setLocalItemsHistory] = useState([]);
  const [showOptionListSquareOneAdded, setShowOptionListSquareOneAdded] =
    useState(false);
  const [showOptionListSquareTwoAdded, setShowOptionListSquareTwoAdded] =
    useState(false);

  // addedItems to send
  useEffect(() => {
    // Filter out items that don't have the addedItem property
    const itemsToAdd = localItemsSelected.filter((item) => item.addedItem);
    setAddedItems(itemsToAdd);
    // Use itemsToAdd for further processing or saving

    // You might want to perform additional actions with the filtered items, e.g., save to the server
  }, [localItemsSelected, setAddedItems]);

  const generateUniqueID = () => {
    return `id-${new Date().getTime()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  };

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

  const getNextMainOrder = () => {
    // Extract all the main_order numbers into a new array

    const mainOrders = [...updatedExtractedData, ...localItemsSelected].map(
      (item) => item.main_order
    );

    // Find the max value in the mainOrders array
    const maxOrder = mainOrders.length > 0 ? Math.max(...mainOrders) : 0;

    return maxOrder + 1; // Increment the maxOrder by one to get the next order
  };

  const removeItem = (item) => {
    console.log("item => ", item);
    const oldData = [...localItemsSelected];
    const result = oldData.filter((row) => {
      return row?.guid != item.guid ? row : undefined;
    });

    setLocalItemsSelected([...result]);
  };

  const handleRecSelect = (chosenId, title, icon_url) => {
    // Create the rectangle item detail object
    const rectangleItemDetails = {
      content_id: chosenId,
      title: title,
      s3_icon_url: icon_url,
      description: "", // Add description if available
      main_order: getNextMainOrder(), // Assign the next order number in sequence
      sub_order: 1, // Set sub_order if needed
      display_box_type: "rectangle",
      beingEddited: true,
      addedItem: true,
      guid: generateUniqueID()
    };

    // Append the new item to localItemsSelected
    setLocalItemsSelected((prevItems) => [...prevItems, rectangleItemDetails]);

    setShowOptionList(false);
  };

  const handleSquareOneSelect = (chosenId, title, icon_url) => {
    // Create the rectangle item detail object
    const rectangleItemDetails = {
      content_id: chosenId,
      title: title,
      s3_icon_url: icon_url,
      description: "", // Add description if available
      main_order: getNextMainOrder(), // Assign the next order number in sequence
      sub_order: 1, // Set sub_order if needed
      display_box_type: "square",
      beingEddited: true,
      addedItem: true,
      guid: generateUniqueID()
    };

    // Append the new item to localItemsSelected
    setLocalItemsSelected((prevItems) => [rectangleItemDetails, ...prevItems]);

    setShowOptionList(false);

    setShowAddPopUp(false);
  };

  const handleSquareTwoSelect = (chosenId, title, icon_url) => {
    // Create the rectangle item detail object
    const rectangleItemDetails = {
      content_id: chosenId,
      title: title,
      s3_icon_url: icon_url,
      description: "", // Add description if available
      main_order: getNextMainOrder(), // Assign the next order number in sequence
      sub_order: 2, // Set sub_order if needed
      display_box_type: "square",
      beingEddited: true,
      addedItem: true,
      guid: generateUniqueID()
    };

    // Append the new item to localItemsSelected
    setLocalItemsSelected((prevItems) => [...prevItems, rectangleItemDetails]);

    setShowOptionList(false);
  };

  const handleSquareOneSelectAdded = (chosenId, title, icon_url, mainOrder) => {
    // Check if there is an existing square with sub_order 2 and the same main_order
    const existingSquareTwo = localItemsSelected.find(
      (item) =>
        item.display_box_type === "square" &&
        item.sub_order === 1 &&
        item.main_order === mainOrder
    );

    // If there is an existing square with the same main_order and sub_order 2, create a new main_order
    const newMainOrder = existingSquareTwo ? getNextMainOrder() : mainOrder;

    // Create the rectangle item detail object for square two
    const itemDetailsSquareTwo = {
      content_id: chosenId,
      title: title,
      s3_icon_url: icon_url,
      description: "", // Add description if available
      sub_order: 1, // Set sub_order to 2 for square two
      main_order: newMainOrder,
      display_box_type: "square",
      beingEddited: true,
      addedItem: true,
      guid: generateUniqueID()
    };

    // Append the new item to localItemsSelected
    setLocalItemsSelected((prevItems) => [itemDetailsSquareTwo, ...prevItems]);

    setShowOptionList(false);
    setShowOptionListSquareTwoAdded(false);
  };

  const handleSquareTwoSelectAdded = (chosenId, title, icon_url, mainOrder) => {
    // Check if there is an existing square with sub_order 2 and the same main_order
    const existingSquareTwo = localItemsSelected.find(
      (item) =>
        item.display_box_type === "square" &&
        item.sub_order === 2 &&
        item.main_order === mainOrder
    );

    // If there is an existing square with the same main_order and sub_order 2, create a new main_order
    const newMainOrder = existingSquareTwo ? getNextMainOrder() : mainOrder;

    // Create the rectangle item detail object for square two
    const itemDetailsSquareTwo = {
      content_id: chosenId,
      title: title,
      s3_icon_url: icon_url,
      description: "", // Add description if available
      sub_order: 2, // Set sub_order to 2 for square two
      main_order: newMainOrder,
      display_box_type: "square",
      beingEddited: true,
      addedItem: true,
      guid: generateUniqueID()
    };

    // Append the new item to localItemsSelected
    setLocalItemsSelected((prevItems) => [...prevItems, itemDetailsSquareTwo]);

    setShowOptionList(false);
    setShowOptionListSquareTwoAdded(false);
  };

  const groupedSquares = localItemsSelected.reduce((acc, item) => {
    if (!acc[item.main_order]) {
      acc[item.main_order] = { 1: null, 2: null }; // Initialize null squares for each main_order
    }
    acc[item.main_order][item.sub_order] = item; // Assign the item to its sub_order
    return acc;
  }, {});

  console.log("localItemsSelected", localItemsSelected);
  console.log("object main order", groupedSquares);

  return (
    <>
      {/* Preview heading */}
      {localItemsSelected.some((item) => item.beingEddited) && (
        <h3 className="text-sm font-medium mt-7 mb-3">پیش نمایش</h3>
      )}

      {/* Preview display */}
      {Object.entries(groupedSquares).map(([mainOrder, squares]) => (
        <Fragment key={`group-main-order-${mainOrder}-${squares}`}>
          <div className="grid grid-cols-12 overflow-hidden gap-5 mb-4">
            {/* rec */}
            {squares?.[1]?.display_box_type == "rectangle" ? (
              <div className=" col-span-12 flex ps-3  relative items-center  text-xs py-3 border-2 rounded-2xl whitespace-nowrap overflow-hidden">
                {/* delete btn */}
                <span
                  onClick={() => removeItem(squares?.[1])}
                  className="absolute left-[15px]"
                >
                  <CloseIcon />
                </span>
                <div className="col-span-2  rounded-md flex justify-center items-center overflow-hidden">
                  <Image
                    src={squares?.[1]?.s3_icon_url}
                    alt={squares?.[1]?.title}
                    width={32}
                    height={32}
                    className="bg-white rounded-md invert p-1"
                  />
                </div>
                <p className="col-span-3 font-semibold text-xs ms-1 overflow-hidden">
                  {squares?.[1]?.title}:
                </p>
                <p className="col-span-7 font-semibold text-xs ms-1 overflow-hidden truncate">
                  {squares?.[1]?.description}
                </p>
              </div>
            ) : (
              <>
                {/* square 1 */}
                <div className="col-span-6 relative">
                  {squares[1] ? (
                    <div className="px-4 py-3 border-2 rounded-2xl overflow-hidden">
                      {/* Delete button */}
                      <span
                        onClick={() => removeItem(squares[1])}
                        className="absolute left-[15px]"
                      >
                        <CloseIcon />
                      </span>
                      <div className="bg-dark w-[45px] h-[45px] rounded-full mb-3 flex justify-center items-center overflow-hidden">
                        <Image
                          src={squares[1]?.s3_icon_url}
                          alt={squares[1]?.title}
                          width={32}
                          height={32}
                          className="bg-white invert"
                        />
                      </div>
                      <p className="font-medium text-xs text-dark">
                        {squares[1]?.title}
                      </p>
                      <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
                        {squares[1]?.description}
                      </p>
                    </div>
                  ) : (
                    // empty add
                    <div
                      onClick={() =>
                        setShowOptionListSquareOneAdded(
                          !showOptionListSquareOneAdded
                        )
                      }
                      className="col-span-6 px-4 py-3 border border-darkGray rounded-2xl overflow-hidden h-[140px] bg-graySubmit 
            flex justify-center items-center relative"
                    >
                      <PlusSignPageView />

                      <div>
                        {showOptionListSquareOneAdded ? (
                          <div
                            className="bg-white absolute shadow-2xl  left-[0px] top-0 right-0 p-4 max-h-[150px] overflow-y-scroll 
              rounded-md border "
                          >
                            <span
                              onClick={() =>
                                setShowOptionListSquareOneAdded(false)
                              }
                            >
                              <CloseIcon />
                            </span>
                            {listItems.map((item) => (
                              <div
                                key={item.id}
                                onClick={() =>
                                  handleSquareOneSelectAdded(
                                    item.id,
                                    item.title,
                                    item.s3_icon_url,
                                    squares[2]?.main_order
                                  )
                                }
                                className={`py-2 border-b`}
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

                {/* Second Square */}
                <div className="col-span-6 overflow-hidden relative">
                  {squares[2] ? (
                    <div className="px-4 py-3 border-2 rounded-2xl overflow-hidden">
                      {/* Delete button */}
                      <span
                        onClick={() => removeItem(squares[2])}
                        className="absolute left-[15px]"
                      >
                        <CloseIcon />
                      </span>
                      <div className="bg-dark w-[45px] h-[45px] rounded-full mb-3 flex justify-center items-center overflow-hidden">
                        <Image
                          src={squares[2]?.s3_icon_url}
                          alt={squares[2]?.title}
                          width={32}
                          height={32}
                          className="bg-white invert"
                        />
                      </div>
                      <p className="font-medium text-xs text-dark">
                        {squares[2]?.title}
                      </p>
                      <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
                        {squares[2]?.description}
                      </p>
                    </div>
                  ) : (
                    // empty add
                    <div
                      onClick={() =>
                        setShowOptionListSquareTwoAdded(
                          !showOptionListSquareTwoAdded
                        )
                      }
                      className="col-span-6 px-4 py-3 border border-darkGray rounded-2xl overflow-hidden h-[140px] bg-graySubmit 
           flex justify-center items-center relative"
                    >
                      <PlusSignPageView />

                      <div>
                        {showOptionListSquareTwoAdded ? (
                          <div
                            className="bg-white absolute shadow-2xl  left-[0px] top-0 right-0 p-4 max-h-[150px] overflow-y-scroll 
             rounded-md border "
                          >
                            <span
                              onClick={() =>
                                setShowOptionListSquareTwoAdded(false)
                              }
                            >
                              <CloseIcon />
                            </span>
                            {listItems.map((item) => (
                              <div
                                key={item.id}
                                onClick={() =>
                                  handleSquareTwoSelectAdded(
                                    item.id,
                                    item.title,
                                    item.s3_icon_url,
                                    squares[1]?.main_order
                                  )
                                }
                                className={`py-2 border-b`}
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
              </>
            )}

            {/* squares */}
            {/* First Square */}
          </div>
        </Fragment>
      ))}

      {/* rec */}

      {/* rectangle */}

      {Object.display_box_type === "rectangle" && object.beingEddited ? (
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
      ) : (
        <span className="hidden" />
      )}

      {/* end of preview */}

      {boxType === "squareBox" ? (
        <>
          {/* square box */}
          <div className="grid grid-cols-12 gap-5 mb-4  relative ">
            {/* square box popup */}

            <div
              onClick={() => setShowOptionListSquare(!showOptionListSquare)}
              className="col-span-6 px-4 py-3 rounded-2xl overflow-hidden h-[140px] bg-graySubmit border border-darkGray
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
              </div>
            </div>

            <div
              onClick={() =>
                setShowOptionListSquareTwo(!showOptionListSquareTwo)
              }
              className="col-span-6 px-4 py-3 rounded-2xl overflow-hidden h-[140px] bg-graySubmit border border-darkGray
              flex justify-center items-center relative"
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
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* rectangle */}
      {boxType === "recBox" ? (
        <>
          <div className="bg-graySubmit border border-darkGray relative rounded-xl py-3 flex justify-center items-center mb-4">
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
                      handleRecSelect(item.id, item.title, item.s3_icon_url)
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
      <div className="bg-graySubmit relative rounded-md py-1 flex justify-center items-center border border-darkGray">
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
