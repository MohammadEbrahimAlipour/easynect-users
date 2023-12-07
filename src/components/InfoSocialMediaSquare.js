import React from "react";
import Link from "next/link";
import Image from "next/image";

const InfoSocialMediaSquare = ({ src, icon, title, address, href = "" }) => {
  return (
    <>
      {/* square */}
      <div className="px-4 py-3 border-2 rounded-2xl overflow-hidden">
        <div
          className="bg-dark w-[45px] h-[45px] rounded-full mb-3
        flex justify-center items-center overflow-hidden"
        >
          <Image
            src={src}
            alt={title}
            width={32}
            height={32}
            className="bg-white invert"
          />
        </div>
        <p className="font-medium text-xs text-dark ">{title}</p>
        <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
          {address}
        </p>
      </div>
    </>
  );
};

export default InfoSocialMediaSquare;
