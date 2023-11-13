import React from "react";
import { CardsCardIcon, CardsWifiIcon } from "./Icons";
import ProfileImage from "./ProfileImage";

const CardsCarousel = ({ cardData, isCenter }) => {
  return (
    <div
      className={`p-5 bg-white rounded-lg border-b-2 mb-5 border-t-2
    ${isCenter ? "slick-center" : ""}
    `}
    >
      {/* two items left side */}
      <div className=" absolute left-5 top-5">
        {/* circle */}
        <div className="w-[28px] h-[28px] bg-black rounded-full flex justify-center items-center ">
          <CardsWifiIcon />
        </div>

        <div
          className="w-[28px] h-[24px] bg-white rounded-md mt-3 flex flex-col
                justify-start "
        >
          <div className="w-full h-[40%] rounded-se-md rounded-ss-md">
            <CardsCardIcon />
          </div>
        </div>
      </div>

      {/* profile items right side */}
      <div className="">
        {/* profile photo */}
        <div className="w-[80px] h-[80px] bg-mutedDark rounded-full opacity-90 mb-4 overflow-hidden">
          <ProfileImage id={cardData.id} src={cardData.profile_s3_url} />
        </div>
        {/* box under profile */}
        <div className="mb-2 text-xl font-semibold">
          <p className="text-start">{cardData.card_title}</p>
        </div>
        {/* smaller line */}
        <div className="text-xs text-muted">
          <p className="text-right">{cardData.job_title}</p>
        </div>
      </div>
    </div>
  );
};

export default CardsCarousel;
