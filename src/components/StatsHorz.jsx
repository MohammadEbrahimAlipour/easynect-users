import React from "react";
import StatsListItems from "./StatsListItems";
import Link from "next/link";
import Image from "next/image";

const StatsHorz = ({ item, className }) => {
  return (
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
        <span className="font-semibold text-lg">۲۱</span>
      </Link>
    </div>
  );
};

export default StatsHorz;
