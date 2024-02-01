import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import CarouselItems from "./CarouselItems";

const CarouselView = ({ handleCountingItemClicks, horizontalData }) => {
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

  const handleItemTypeDetection = (item) => {
    // Early return if handleCountingItemClicks has not been called
    if (!handleCountingItemClicks(item)) {
      return;
    }

    const itemData = item;
    console.log();
    // Early return to handle any potential 'null' or 'undefined'
    if (!itemData) return;

    if (itemData.type === "phone" && itemData.content_val) {
      const telLink = `tel:${squareData.content_val}`;
      window.location.href = telLink;
    } else if (itemData.type === "link" && itemData.content_val) {
      const externalLink = itemData.content_val;
      window.open(externalLink, "_blank", "noopener,noreferrer");
    } else if (itemData.type === "file" && itemData.content_val) {
      const fileLink = itemData.content_val;
      const a = document.createElement("a");
      a.href = fileLink;
      a.download = itemData.content_val.split("/").pop(); // Set a custom filename or fallback
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (itemData.type === "email" && itemData.content_val) {
      const emailLink = `mailto:${itemData.content_val}`;
      window.location.href = emailLink;
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
