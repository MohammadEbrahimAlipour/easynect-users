import React from "react";
import Link from "next/link";
import { PlusSignLight } from "./Icons";

const ProfileCardEmpty = () => {
  return (
    <>
      <div className="border-2 rounded-lg w-full ">
        <div className="p-5 relative">
          {/* two items left side */}
          <div className=" absolute left-5 top-5">
            {/* circle */}
            <div className="w-[28px] h-[28px] bg-mutedDark opacity-[17%] rounded-full " />
            <div
              className="w-[28px] h-[24px] bg-mutedDark opacity-[17%] rounded-md mt-3 flex flex-col
              justify-start "
            >
              <div className="w-full h-[40%] rounded-se-md rounded-ss-md bg-dark"></div>
            </div>
          </div>
          <div className="">
            {/* profile photo */}
            <div className="w-[80px] h-[80px] bg-mutedDark rounded-full opacity-90 mb-4" />
            {/* box under profile */}
            <div className="w-[173px] h-[18px] bg-mutedDark rounded-lg opacity-[35%] mb-2" />
            {/* smaller line */}
            <div className="w-[100px] h-[10px] bg-mutedDark rounded-lg opacity-20 " />
          </div>
        </div>

        {/* bottom section */}
        <div className="pb-5 border-t-[1px] w-full ">
          <div className="grid grid-cols-12">
            <div className="mt-5 mx-4 flex justify-center items-center lg:col-span-10 md:col-span-10">
              {/* box right 1 */}
              <div className="w-[28%] h-[32px] border-2 rounded-md flex justify-center items-center">
                <div className="w-[55%] h-[4px] bg-muted rounded-lg opacity-80" />
              </div>

              {/* box right 2 */}
              <div className="w-[46%] h-[32px] mx-1 border-2 rounded-md flex justify-center items-center">
                <div className="w-[55%] h-[4px] bg-muted rounded-lg opacity-80" />
              </div>

              {/* box right 3 */}
              <div className="w-[22%] h-[32px] border-2 rounded-md flex justify-center items-center">
                <div className="w-[55%] h-[4px] bg-muted rounded-lg opacity-80" />
              </div>
            </div>
            {/* left side more icon */}
            <div
              className="border-2 w-[32px] h-[32px] rounded-md lg:col-span-2 md:col-span-2 mt-5
            flex justify-center items-center"
            >
              <p className="text-muted">...</p>
            </div>
          </div>
        </div>
      </div>
      {/* bottom btn */}
      <div className="">
        <Link
          href="/app/cards/createCard"
          className="w-full flex justify-center items-center mt-7 bg-dark text-white font-semibold
    text-lg py-3 rounded-lg"
        >
          <span className="me-1">
            <PlusSignLight />
          </span>
          افزودن اولین کارت
        </Link>
      </div>
    </>
  );
};

export default ProfileCardEmpty;
