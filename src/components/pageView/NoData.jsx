import React from "react";
import Link from "next/link";

const NoData = () => {
  return (
    <div className="mt-20 flex items-center justify-center mx-5 bg-[#eee] rounded-lg">
      <Link className=" px-3 py-5 text-center  text-sm text-mutedDark" href="/">
        برای این صفحه هیچ آیتمی اضافه نشده است. به صفحه
        <span className="mx-1 font-bold underline"> آیتم </span>
        ها بروید
      </Link>
    </div>
  );
};

export default NoData;
