import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";

const ContentHorzItems = ({ item }) => {
  return (
    <>
      <Link href={`/contents/horz/editHorzItems?id=${item.id}`}>
        <div className={`bg-lightMenu rounded-lg mb-3 border-2 box-border`}>
          <div className="flex justify-start items-center py-3">
            <label
              className="font-semibold border-e-2 text-muted me-2 pe-2 ps-4"
              for="data_inp"
            >
              {/* icon/text */}
              <div className="w-[28px] h-[28px] bg-dark rounded-lg">
                <Image
                  className="bg-white invert p-1 rounded-lg mb-2"
                  alt="icon"
                  src={item.icon_url}
                  width={60}
                  height={60}
                />
              </div>
            </label>
            <div className="flex flex-row w-full justify-between items-center pe-5">
              <p className="bg-lightMenu outline-0 font-semibold text-sm">
                {item.title}
              </p>

              {/* checkbox */}

              <div className="text-lg font-medium">
                <label className="relative inline-flex items-center cursor-pointer ">
                  <input
                    type="checkbox"
                    className="sr-only peer "
                    // onChange={toggleBan}
                    checked={item.is_hide}
                  />
                  <div className="w-11 h-6  bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-dark peer-checked:bg-dark"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ContentHorzItems;
