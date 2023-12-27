import React from "react";
import Image from "next/image";

const RectangleData = ({ object }) => {
  console.log("objectRec", object);
  return (
    <div className="grid grid-cols-12 mb-5 items-center text-xs py-3 border-2 rounded-2xl whitespace-nowrap overflow-hidden">
      <>
        <div className="col-span-2  rounded-md flex justify-center items-center overflow-hidden">
          <Image
            src={object?.data[0]?.s3_icon_url}
            alt={object?.data[0]?.title}
            width={32}
            height={32}
            className="bg-white rounded-md invert p-1"
          />
        </div>
        <p className="col-span-3 font-semibold text-xs ms-1 overflow-hidden">
          {object?.data[0]?.title}:
        </p>
        <p className="col-span-7 font-semibold text-xs ms-1 overflow-hidden truncate">
          {object?.data[0]?.description}
        </p>
      </>
    </div>
  );
};

export default RectangleData;
