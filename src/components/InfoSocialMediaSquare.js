import React from "react";
import { Telegram } from "./Icons";
import Link from "next/link";

const InfoSocialMediaSquare = () => {
  return (
    <>
      {/* square */}
      <Link href="/" className="px-4 py-3 border-2 rounded-2xl">
        <Telegram />
        <p className="font-medium text-xs text-dark ">تلگرام</p>
        <p className="font-medium text-xs text-muted mt-2 mb-5">
          @iranbusiness.coach
        </p>
        {/* <Link href="/" className=" border-2 px-5 py-2 text-xs rounded-md">
          ارسال پیام
        </Link> */}
      </Link>
    </>
  );
};

export default InfoSocialMediaSquare;
