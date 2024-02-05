import React from "react";
import { Rings } from "react-loader-spinner";

const LoaderOverlay = () => {
  return (
    <Rings
      height="30"
      width="30"
      color="#fff"
      radius="6"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="rings-loading"
    />
  );
};

export default LoaderOverlay;
