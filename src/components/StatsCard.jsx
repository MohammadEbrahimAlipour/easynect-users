import React from "react";
import ProfileImage from "./ProfileImage";
import testImage from "../../public/images/cljokljin00rp3d5zrpjtjgmm.png";

const StatsCard = ({ item }) => {
  return (
    <>
      <div
        className="flex flex-col justify-start items-start overflow-hidden
       bg-white p-2 rounded-lg snap-start"
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
