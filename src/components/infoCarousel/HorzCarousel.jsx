import React, { useState } from "react";
import Slider from "react-slick";
import Item from "./Item";
import { Twitter, Instagram, LinkedIn } from "../Icons"; // Import your icons

const HorzCarousel = () => {
  const [centeredItemIndex, setCenteredItemIndex] = useState(0);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 5,
    arrows: true,
    speed: 100,
    afterChange: (index) => {
      setCenteredItemIndex(index);
    }
  };

  // Define your items with associated titles and icons
  const items = [
    { title: "Twitter", icon: <Twitter /> },
    { title: "LinkedIn", icon: <LinkedIn /> },
    { title: "Instagram", icon: <Instagram /> },
    { title: "Twitter", icon: <Twitter /> },
    { title: "LinkedIn", icon: <LinkedIn /> },
    { title: "Instagram", icon: <Instagram /> }
  ];

  return (
    <div className="">
      <Slider {...settings}>
        {items.map((item, index) => (
          <Item
            key={index}
            title={item.title}
            icon={item.icon}
            isCenter={index === centeredItemIndex}
          />
        ))}
      </Slider>
    </div>
  );
};

export default HorzCarousel;
