import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const slides = [
  {
    key: 1,
    content: "1"
  },
  {
    key: 2,
    content: "2"
  },
  {
    key: 3,
    content: "3"
  },
  {
    key: 1,
    content: "4"
  },
  {
    key: 2,
    content: "5"
  },
  {
    key: 3,
    content: "6"
  }
  // Add more slides as needed
];

const ProfileCardCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const offsetRadius = 2;
  const showNavigation = true;
  const animationConfig = {
    damping: 5,
    stiffness: 80
  };

  const handleSlideChange = (newSlide) => {
    setCurrentSlide(newSlide);
  };

  return (
    <div className="w-full flex flex-col justify-center ">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.key}
          className="carousel-slide mb-5 bg-red-300"
          style={{
            transform: `rotateY(${
              (index - currentSlide) * 360
            }deg) translateZ(${offsetRadius * 100}px)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={animationConfig}
        >
          {slide.content}
        </motion.div>
      ))}
      {showNavigation && (
        <div className="carousel-navigation mt-4 flex justify-center">
          <button
            className="bg-blue-500 text-white rounded-full px-4 py-2 mr-2"
            onClick={() => handleSlideChange(currentSlide - 1)}
          >
            &lt;
          </button>
          <button
            className="bg-blue-500 text-white rounded-full px-4 py-2"
            onClick={() => handleSlideChange(currentSlide + 1)}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCardCarousel;
