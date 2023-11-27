import React from "react";
import { Telegram } from "./Icons";
import Link from "next/link";

const InfoSocialMediaSquare = ({ icon, title, address, href = "" }) => {
  return (
    <>
      {/* square */}
      <Link
        href={href}
        target="_blank"
        className="px-4 py-3 border-2 rounded-2xl overflow-hidden"
      >
        <div
          className="bg-dark w-[45px] h-[45px] rounded-full mb-3
        flex justify-center items-center overflow-hidden"
        >
          <div className="text-white">{icon}</div>
        </div>
        <p className="font-medium text-xs text-dark ">{title}</p>
        <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
          {address}
        </p>
      </Link>
    </>
  );
};

export default InfoSocialMediaSquare;
