import React from "react";

const IconReg = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        {/* white card */}
        <div className=" rounded-lg bg-white w-[65%] shadow-2xl">
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
              <div className="w-[50px] h-[50px] bg-dark rounded-full opacity-80 mb-4" />
              {/* box under profile */}
              <div className="w-[153px] h-[14px] bg-mutedDark rounded-lg opacity-[35%] mb-2" />
              {/* smaller line */}
              <div className="w-[100px] h-[10px] bg-mutedDark rounded-lg opacity-20 " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IconReg;
