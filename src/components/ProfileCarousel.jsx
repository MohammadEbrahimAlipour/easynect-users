import Link from "next/link";
import React from "react";
import ProfileImage from "./ProfileImage";

const ProfileCarousel = ({
  card,
  isCardSelected,
  toggleSubMenu,
  isActive,
  opacity
}) => {
  return (
    <div
      className={`carousel-slide bg-white mb-5 ${
        isActive ? "active" : "non-active"
      }`}
      style={{ zIndex: isActive ? 2 : 1, opacity }}
    >
      {/* Left side content */}
      <div className="absolute left-5 top-5">
        {/* Add your left side content here */}
      </div>

      {/* Right side content */}
      <div>
        {/* Profile photo */}
        <div className="w-[80px] h-[80px] bg-mutedDark rounded-full opacity-90 mb-4 overflow-hidden">
          <ProfileImage imageUrl={card.profile_s3_url} />
        </div>
        {/* Box under profile */}
        <div className="mb-2 text-xl font-semibold">
          <p className="text-start">{card.card_title}</p>
        </div>
        {/* Smaller line */}
        <div className="text-xs text-muted">
          <p className="text-right">{card.job_title}</p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="pb-5 border-t-[1px] w-full">
        <div className="grid grid-cols-12">
          <div className="mt-5 mx-4 flex justify-center items-center lg:col-span-10 md:col-span-10">
            {/* Box right 1 */}
            <Link
              href={`/editProfileInfo?id=${card.id}`}
              passHref
              className="w-[28%] h-[32px] border-2 rounded-md flex justify-center items-center"
            >
              <div>
                <p className="text-xs">ویرایش</p>
              </div>
            </Link>

            {/* Box right 2 */}
            <div className="w-[46%] h-[32px] mx-1 border-2 rounded-md flex justify-center items-center">
              <button className="text-xs">اشتراک گذاری</button>
            </div>

            {/* Box right 3 */}
            <Link
              href="/"
              passHref
              className="w-[22%] h-[32px] border-2 rounded-md flex justify-center items-center"
            >
              <div>
                <p className="text-xs">آمار</p>
              </div>
            </Link>
          </div>
          {/* Left side more icon */}
          <button
            href="/"
            className="border-2 w-[32px] h-[32px] rounded-md lg:col-span-2 md:col-span-2 mt-5
        flex justify-center items-center"
            onClick={toggleSubMenu}
          >
            ...
          </button>
        </div>
      </div>
      {/* End of bottom section */}
    </div>
  );
};

export default ProfileCarousel;
