import ProfileImage from "@/components/ProfileImage";
import React from "react";
import Slider from "react-slick";
import sampleImage from "../../public/images/cljokljin00rp3d5zrpjtjgmm.png";
const TestOne = () => {
  const settings = {
    className: "center",
    centerMode: true,
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    beforeChange: function (currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log("after change", currentSlide);
    }
  };
  return (
    <div className="h-600px w-full">
      <div className="carousel-container">
        <Slider {...settings}>
          <div className="carousel-item h-[250px] bg-red-400">
            <ProfileImage src={sampleImage} width={80} height={80} />
            <h3>title</h3>
          </div>

          <div className="carousel-item h-[250px] bg-red-400 shadow-lg">
            <ProfileImage src={sampleImage} width={80} height={80} />
            <h3>title</h3>
          </div>

          <div className="carousel-item h-[250px] bg-red-400">
            <ProfileImage src={sampleImage} width={80} height={80} />
            <h3>title</h3>
          </div>
          <div className="carousel-item h-[250px] bg-red-400">
            <ProfileImage src={sampleImage} width={80} height={80} />
            <h3>title</h3>
          </div>

          <div className="carousel-item h-[250px] bg-violet-500">
            <ProfileImage src={sampleImage} width={80} height={80} />
            <h3>title</h3>
          </div>

          <div className="carousel-item h-[250px] bg-red-400">
            <ProfileImage src={sampleImage} width={80} height={80} />
            <h3>title</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default TestOne;
