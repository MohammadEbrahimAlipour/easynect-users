import React from "react";
import Image from "next/image";

const SquareData = ({ object }) => {
  console.log("object", object);
  console.log("subOrder", object.data[0].sub_order);
  return (
    <>
      <div className="grid grid-cols-12 mb-5 gap-5">
        {/* first square */}
        <div className="col-span-6 relative">
          {object?.data[0]?.sub_order === 1 ? (
            // exists
            <>
              <div className="px-4 py-3 border-2 rounded-2xl overflow-hidden  ">
                <div
                  className="bg-dark w-[45px] h-[45px] rounded-full mb-3
                  flex justify-center items-center overflow-hidden"
                >
                  <Image
                    src={
                      object?.data[0]?.sub_order === 1 &&
                      object?.data[0]?.s3_icon_url
                    }
                    alt={
                      (object?.data[0]?.sub_order === 1 &&
                        object?.data[0]?.title) ||
                      "social Link"
                    }
                    width={32}
                    height={32}
                    className="bg-white invert"
                  />
                </div>
                <p className="font-medium text-xs text-dark ">
                  {object?.data[0]?.sub_order === 1 && object?.data[0]?.title}
                </p>
                <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
                  {object?.data[0]?.sub_order === 1 &&
                    object?.data[0]?.description}
                </p>
              </div>

              {/* two */}
            </>
          ) : // empty
          null}
        </div>

        {/* second square */}
        <div className="col-span-6 relative">
          {object?.data[0]?.sub_order === 2 ||
          object?.data[1]?.sub_order === 2 ? (
            // exists
            <>
              <div className="px-4 py-3 border-2 rounded-2xl overflow-hidden  ">
                <div
                  className="bg-dark w-[45px] h-[45px] rounded-full mb-3
                  flex justify-center items-center overflow-hidden"
                >
                  <Image
                    src={
                      object?.data[1]?.sub_order === 2
                        ? object?.data[1].s3_icon_url
                        : object?.data[0].s3_icon_url
                    }
                    alt={
                      object?.data[1]?.sub_order === 2
                        ? object?.data[1].s3_icon_url
                        : object?.data[0].title
                    }
                    width={32}
                    height={32}
                    className="bg-white invert"
                  />
                </div>
                <p className="font-medium text-xs text-dark ">
                  {object?.data[1]?.sub_order === 2
                    ? object?.data[1].title
                    : object?.data[0].title}
                </p>
                <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
                  {object?.data[1]?.sub_order === 2
                    ? object?.data[1].description
                    : object?.data[0].description}
                </p>
              </div>

              {/* two */}
            </>
          ) : // empty
          null}
        </div>
      </div>
    </>
  );
};

export default SquareData;
