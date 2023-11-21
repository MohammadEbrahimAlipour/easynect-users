import React, { useState } from "react";
import Slider from "react-slick";
import Item from "./Item";
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
} from "../Icons"; // Import your icons

const HorzCarousel = () => {
  const [centeredItemIndex, setCenteredItemIndex] = useState(0);

  // const settings = {
  //   className: "center",
  //   centerMode: true,
  //   infinite: true,
  //   centerPadding: "0",
  //   slidesToShow: 5,
  //   arrows: false,
  //   speed: 100,
  //   afterChange: (index) => {
  //     setCenteredItemIndex(index);
  //   }
  // };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 5,
    arrows: false,
    speed: 100,
    beforeChange: (oldIndex, newIndex) => {
      // Before the slide changes, set the index to the new one
      setCenteredItemIndex(newIndex);
    },
    afterChange: (index) => {
      // After the slide changes, update the index state
      setCenteredItemIndex(index);
    }
  };

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
      href: "tel:09150042020"
    }
    // { title: "Instagram", icon: <Instagram /> }
  ];

  return (
    <div className="">
      <Slider {...settings}>
        {items.map((item, index) => (
          <Item
            href={item.href}
            key={index}
            title={item.title}
            icon={item.icon}
            iconDark={item.iconDark}
            isCenter={index === centeredItemIndex}
          />
        ))}
      </Slider>
    </div>
  );
};

export default HorzCarousel;
