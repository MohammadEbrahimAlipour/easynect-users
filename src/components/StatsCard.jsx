import React from "react";
import ProfileImage from "./ProfileImage";

const StatsCard = ({ item, onClick, selectedCardId }) => {
  const isSelected = selectedCardId === item.id;
  return (
    <>
      <div
        onClick={onClick}
        className={`flex flex-col justify-start items-start overflow-hidden
         p-2 rounded-lg snap-start bg-white ${
           isSelected ? "border-2 border-dark " : "border-2 border-white"
         }`}
      >
        {/* Profile image display */}
        <div className=" w-[36px] h-[36px] rounded-full overflow-hidden">
          <ProfileImage
            width={36}
            height={36}
            alt={item.card_title}
            src={item.profile_s3_url}
            className="w-[80px] h-[80px]"
          />
        </div>
        {/* <div className="w-[36px] h-[36px] overflow-hidden">
          <ProfileImage src={item.profile_s3_url} width={36} height={36} />
        </div> */}
        <p className="text-xs mt-2 font-medium whitespace-nowrap truncate w-full">
          {item.card_title}
        </p>
      </div>
    </>
  );
};

export default StatsCard;
