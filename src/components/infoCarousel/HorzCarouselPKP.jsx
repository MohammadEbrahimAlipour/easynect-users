import React, { useState } from "react";
import Slider from "react-slick";
import Item from "./Item";
import {
  Telegram,
  TelegramDark,
  Maps,
  MapsDark,
  PhoneDark,
  Phone,
  Email,
  EmailDark,
  Website,
  WebsiteDark
} from "../Icons"; // Import your icons
import { Whatsapp, WhatsappDark } from "../Icons";

const HorzCarouselPKP = () => {
  const [centeredItemIndex, setCenteredItemIndex] = useState(0);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 3,
    arrows: false,
    speed: 100,
    afterChange: (index) => {
      setCenteredItemIndex(index);
    }
  };

  // Define your items with associated titles and icons
  const items = [
    {
      title: "واتس اپ",
      icon: <Whatsapp />,
      iconDark: <WhatsappDark />,
      href: "https://api.whatsapp.com/send?phone=989155122158&text="
    },
    {
      title: "ایمیل",
      icon: <Email />,
      iconDark: <EmailDark />,
      href: "mailto:info@pkp-paper.com"
    },
    {
      title: "لوکیشن",
      icon: <Maps />,
      iconDark: <MapsDark />,
      href: "https://www.google.com/maps/place/35%C2%B057'15.6%22N+59%C2%B020'36.1%22E/@35.9543398,59.3407816,17z/data=!3m1!4b1!4m4!3m3!8m2!3d35.9543398!4d59.3433565?hl=en-IR&entry=ttu"
    },

    {
      title: "وبسایت",
      icon: <Website />,
      iconDark: <WebsiteDark />,
      href: "https://pkp-paper.ir/"
    },
    {
      title: "شماره تماس",
      icon: <Phone />,
      iconDark: <PhoneDark />,
      href: "tel:05131532"
    }
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

export default HorzCarouselPKP;
