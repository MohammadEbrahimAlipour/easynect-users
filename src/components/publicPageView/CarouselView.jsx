import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import CarouselItems from "./CarouselItems";

const CarouselView = ({ horizontalData, handleCountingItemClicks }) => {
  const [itemCounter, setItemCounter] = useState(horizontalData.length);
  const [centeredItemIndex, setCenteredItemIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(horizontalData.length);

  const [isCenterGlobal, setIsCenterGlobal] = useState();
  const [showOptionList, setShowOptionList] = useState(false);
  const [dataToSend, setDataToSend] = useState([...horizontalData]);

  // Create an array with the length of itemCounter
  const itemsArray = Array.from({ length: itemCounter });

  // If the items numbers are odd, the middle is shown; else, the first index
  const middleIndex = Math.floor(itemsArray.length / 2);
  const initialSlide = middleIndex >= 0 ? middleIndex : 0;

  // Utility function to handle redirection
  const handleRedirection = (url, isExternal) => {
    const link = document.createElement("a");
    link.href = url;
    if (isExternal) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.target = "_self";
    }
    // Append to the body, click and then remove to accommodate iOS security restrictions
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleItemTypeDetection = async (item) => {
    // First, check if item has required properties

    if (!item || !item.content_val) return;

    try {
      const isAnalyticsCounted = await handleCountingItemClicks(item);
      if (!isAnalyticsCounted) {
        console.error("There was an error processing your request.");
        return;
      }

      if (item.type) {
        if (item.type === "phone") {
          handleRedirection(`tel:${item.content_val}`);
        } else if (item.type === "link") {
          handleRedirection(item.content_val, true);
        } else if (item.type === "file") {
          handleRedirection(item.content_val);
        } else if (item.type === "email") {
          handleRedirection(`mailto:${item.content_val}`);
        }
      }
    } catch (error) {
      console.error("Error during item type detection", error);
    }
  };

  return (
    <>
      {dataToSend ? (
        <>
          <Swiper
            slidesPerView={selectedOption - 1}
            spaceBetween={30}
            centeredSlides={true}
            className="mySwiper"
            initialSlide={initialSlide}
            onSlideChange={(swiper) => setCenteredItemIndex(swiper.activeIndex)}
          >
            {dataToSend.map((item, index) => (
              <SwiperSlide
                key={index}
                // onClick={() => handleItemTypeDetection(item)}
                onClick={() => handleItemTypeDetection(item)}
              >
                <CarouselItems
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
        </>
      ) : null}
    </>
  );
};

export default CarouselView;
