import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Twitter,
  Instagram,
  LinkedIn,
  Telegram,
  TelegramDark,
  Maps,
  MapsDark,
  PhoneDark,
  Phone,
  Email,
  EmailDark,
  InstagramDark,
  Website,
  WebsiteDark
} from "./Icons"; // Import your icons

// import required modules
import Item from "./infoCarousel/Item";

const SwiperCarousel = () => {
  const [centeredItemIndex, setCenteredItemIndex] = useState(0);

  // Define your items with associated titles and icons
  const items = [
    {
      title: "اینستاگرام",
      icon: <Instagram />,
      iconDark: <InstagramDark />,
      href: "https://www.instagram.com/nikbakhtprint"
    },
    {
      title: "ایمیل",
      icon: <Email />,
      iconDark: <EmailDark />,
      href: "mailto:nikbakhtprint@gmail.com"
    },
    {
      title: "لوکیشن",
      icon: <Maps />,
      iconDark: <MapsDark />,
      href: "https://maps.app.goo.gl/mJSte6hmxcvH6ToJ7"
    },
    {
      title: "تلگرام",
      icon: <Telegram />,
      iconDark: <TelegramDark />,
      href: "https://t.me/nikbakhtprint"
    },
    {
      title: "وبسایت",
      icon: <Website />,
      iconDark: <WebsiteDark />,
      href: "https://nikbakhtprint.com/"
    },
    {
      title: "شماره تماس",
      icon: <Phone />,
      iconDark: <PhoneDark />,
      href: "tel:09150032020"
    }
  ];

  //   if the items numbers are odd the middle is shown, else the first index
  const middleIndex = Math.floor(items.length / 2);
  const initialSlide = middleIndex >= 0 ? middleIndex : 0;

  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        centeredSlides={true}
        className="mySwiper"
        initialSlide={initialSlide}
        // loop={true}
        onSlideChange={(swiper) => setCenteredItemIndex(swiper.activeIndex)}
        // onSlideChange={(swiper) => setCenteredItemIndex(swiper.realIndex)}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Item
              href={item.href}
              title={item.title}
              icon={item.icon}
              iconDark={item.iconDark}
              isCenter={index === centeredItemIndex}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperCarousel;
