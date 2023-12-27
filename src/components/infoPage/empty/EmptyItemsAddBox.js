import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import EmptyItemsPageView from "./EmptyItemsPageView";
import Image from "next/image";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import axios from "axios";
import { toast } from "react-toastify";
import plusSign from "../../../../public/images/add-circle.png";
import { CloseIcon } from "@/components/Icons";

const EmptyItemsAddBox = ({ horizontalData, pageId, listItems }) => {
  const [itemCounter, setItemCounter] = useState(horizontalData.length);
  const [centeredItemIndex, setCenteredItemIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(horizontalData.length);
  const accessToken = useAccessToken();

  const [isCenterGlobal, setIsCenterGlobal] = useState();
  const [showOptionList, setShowOptionList] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [dataToSend, setDataToSend] = useState([...horizontalData]);

  // Create an array with the length of itemCounter
  const itemsArray = Array.from({ length: itemCounter });

  // If the items numbers are odd, the middle is shown; else, the first index
  const middleIndex = Math.floor(itemsArray.length / 2);
  const initialSlide = middleIndex >= 0 ? middleIndex : 0;

  const handleSelectChange = (option) => {
    setSelectedOption(option);
    setShowOptions(false);

    // Get the current length of dataToSend
    const currentLength = dataToSend.length;

    // If the new option is greater than the current length, add extra objects
    if (option > currentLength) {
      // Calculate the number of items to add
      const itemsToAdd = option - currentLength;

      // Create extra objects and add them to the end of the array
      setDataToSend((prevData) => {
        const newData = [...prevData];
        for (let i = 0; i < itemsToAdd; i++) {
          const extraObject = {
            id: null,
            title: "",
            s3_icon_url: plusSign,
            order: centeredItemIndex + 1
          };
          newData.push(extraObject);
        }
        return newData;
      });
    } else if (option < currentLength) {
      // If the new option is less than the current length, remove the last items
      const itemsToRemove = currentLength - option;
      setDataToSend((prevData) => {
        const newData = [...prevData];
        newData.splice(-itemsToRemove);
        return newData;
      });
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // Function to handle item selection
  const handleItemSelect = (itemId, title, s3_icon_url) => {
    setSelectedId(itemId);
    setShowOptionList(false);
    // Find the center item that was clicked
    const centerItemIndex = centeredItemIndex;

    // Create an object with the selected id and title...
    const selectedObject = {
      id: itemId,
      title: title,
      s3_icon_url: s3_icon_url,
      order: centeredItemIndex + 1
    };

    // Make a copy of the current dataToSend array
    const newDataToSend = [...dataToSend];

    // Replace the center item with the selected object
    newDataToSend[centerItemIndex] = selectedObject;

    // Update the dataToSend state
    setDataToSend(newDataToSend);

    // Do something with the selected object, for example, log it
    console.log("Selected Object:", selectedObject);
  };

  // Function to submit the form
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for null values in the 'id' field of the objects in 'dataToSend'
    const hasNullIds = dataToSend.some((item) => item.id === null);

    if (hasNullIds) {
      // Display an error message and prevent form submission
      toast.error("پر کردن تمامی فیلد ها الظامیست");
      return;
    }

    if (pageId) {
      // Make an Axios PATCH request to update user data based on user_id
      const apiUrl = generateApiUrl(
        `/api/v1/page_view/horizontal_menu/order/${pageId}`
      );
      axios
        .patch(apiUrl, dataToSend, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Accept-Language": "fa"
          }
        })
        .then((response) => {
          // Handle the response as needed (e.g., show a success message)
          console.log("User data updated successfully.");
          toast.success("updated successfully");
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
          // Check if the error response contains a message
          if (
            error.response &&
            error.response.data &&
            error.response.data.detail
          ) {
            const errorMessage = error.response.data.detail;
            toast.error(errorMessage);
          } else {
            // If there is no specific error message, display a generic one
            toast.error("Error: An error occurred.");
          }
        });
    }
  };

  // Watch for changes in horizontalData and update dataToSend
  useEffect(() => {
    setDataToSend([...horizontalData]);
  }, [horizontalData]);

  return (
    <>
      {dataToSend ? (
        <>
          <div className="mb-3 mx-5 flex justify-between items-center ">
            <p className="text-xs text-muted">
              در این قسمت آیتم ها را اضافه کنید.
            </p>

            {/* select options */}
            <div className="relative inline-block">
              <button
                onClick={toggleOptions}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded inline-flex items-center"
              >
                <span className="mr-1">{selectedOption}</span>
                <svg
                  className="fill-current h-4 w-4 ms-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M0 0h20v20H0z" fill="none" />
                  <path
                    d="M10 3L2 12h16L10 3zm0 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                    fill="#4a5568"
                  />
                </svg>
              </button>
              {showOptions && (
                <div className="absolute left-[9px] bg-white z-10 -ml-4 mt-2 px-2 w-20">
                  {[4, 6].map((option) => (
                    <div
                      key={option}
                      className="bg-white shadow-md rounded py-1 px-3 text-gray-700 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSelectChange(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Swiper
            slidesPerView={selectedOption - 1}
            spaceBetween={30}
            centeredSlides={true}
            className="mySwiper"
            initialSlide={initialSlide}
            onSlideChange={(swiper) => setCenteredItemIndex(swiper.activeIndex)}
          >
            {dataToSend.map((item, index) => (
              <SwiperSlide key={index}>
                <EmptyItemsPageView
                  listItems={listItems}
                  showOptionList={showOptionList}
                  onClick={() =>
                    index === centeredItemIndex &&
                    setShowOptionList(!showOptionList)
                  }
                  title={item.title || ""}
                  icon={
                    <Image
                      src={item.s3_icon_url}
                      alt={item.title}
                      width={64}
                      height={64}
                      className={`bg-white p-2 rounded-md border border-black ${
                        index === centeredItemIndex
                          ? "bg-black invert"
                          : "bg-white "
                      }`}
                    />
                  }
                  iconDark={
                    <Image
                      width={64}
                      height={64}
                      src={item.s3_icon_url}
                      alt={item.title}
                      className="p-2"
                    />
                  }
                  isCenter={index === centeredItemIndex}
                  updateIsCenterGlobal={(isCenter) =>
                    setIsCenterGlobal(isCenter)
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* list options */}
          {showOptionList && isCenterGlobal && (
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
                  className={`py-2 border-b ${
                    item.id === selectedId ? "bg-gray-200" : ""
                  }`}
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mx-5 mt-8">
            <button
              type="submit"
              className="w-full bg-graySubmit rounded-md text-white py-2 "
            >
              Submit
            </button>
          </form>
        </>
      ) : null}
    </>
  );
};

export default EmptyItemsAddBox;
