import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const MediaOptions = ({ item }) => {
  return (
    <>
      <div
        className={`bg-lightMenu rounded-lg mb-3 border-2 box-border overflow-hidden`}
      >
        <div className="flex justify-start items-center py-3">
          <label
            className="font-semibold border-e-2 text-muted me-2 pe-2 ps-4"
            htmlFor="data_inp"
          >
            {/* icon/text */}
            <div className="w-[28px] h-[28px] bg-dark rounded-lg">
              <Image
                className="bg-white invert p-1 rounded-lg mb-2"
                alt="icon"
                src={item.s3_icon_url}
                width={60}
                height={60}
              />
            </div>
          </label>
          <div className="flex flex-row w-full justify-between items-center pe-3">
            <Link
              href={`/editMediaSettingsHorz?id=${item.id}`}
              className="bg-lightMenu outline-0 font-semibold text-sm"
            >
              {item.title}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaOptions;
