import React from "react";
import { Rings } from "react-loader-spinner";

const LoadingState = () => {
  return (
    <div className="w-full z-[1000 flex justify-center items-center my-[4rem]">
      <Rings
        height="80"
        width="80"
        color="black"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default LoadingState;
