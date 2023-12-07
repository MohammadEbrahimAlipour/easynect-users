import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";

const ProfileCardCarousel = () => {
  // State to check if we are in the browser
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set the isClient state to true once component has mounted
    setIsClient(true);
  }, []);

  if (!isClient) {
    // If we're not in the client (browser) yet, render nothing or a placeholder
    return null;
  }

  // Now we are in the browser, render Swiper component
  return (
    <>
      {/* <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper> */}
    </>
  );
};

export default ProfileCardCarousel;
