import React from "react";
import StatsListItems from "./StatsListItems";
import Image from "next/image";
import Link from "next/link";

export const StatsVert = ({ item, className }) => {
  return (
    <div className="">
      <div className={`${className} bg-white rounded-lg py-3 mb-3`}>
        <Link href="/" className="flex justify-between px-4 items-center">
          <span className="flex justify-start items-center font-medium">
            <Image
              className="me-2"
              src={item.s3_icon_url}
              alt="test"
              width={36}
              height={35}
            />
            {item.title}
          </span>
          <span className="font-semibold text-lg">{item.taps}</span>
        </Link>
      </div>
    </div>
  );
};
