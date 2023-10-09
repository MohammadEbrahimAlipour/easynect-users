import React from "react";
import { StatsInstagramIcon } from "./Icons";
import Link from "next/link";

const StatsListItems = ({ title, href, className = "" }) => {
  return (
    <>
      <div className={`${className} bg-white rounded-lg py-3 mb-3`}>
        <Link href="/" className="flex justify-between px-4 items-center">
          <span className="flex justify-start items-center font-medium">
            <span className="me-2">
              <StatsInstagramIcon />
            </span>
            {title}
          </span>
          <span className="font-semibold text-lg">۲۱</span>
        </Link>
      </div>
    </>
  );
};

export default StatsListItems;
