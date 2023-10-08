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
        <ProfileImage src={item.profile_s3_url} width={36} height={36} />

        <p className="text-xs mt-2 font-medium whitespace-nowrap truncate w-full">
          {item.card_title}
        </p>
      </div>
    </>
  );
};

export default StatsCard;
