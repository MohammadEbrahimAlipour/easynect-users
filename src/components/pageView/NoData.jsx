import React from "react";
import Link from "next/link";

const NoData = () => {
  return (
    <div className="mt-20 flex items-center justify-center mx-5 bg-[#eee] rounded-lg ">
      <p className=" px-3 py-5 text-center  text-sm text-mutedDark">
        هنوز محتوایی برای این صفحه ساخته نشده است.
      </p>
    </div>
  );
};

export default NoData;
