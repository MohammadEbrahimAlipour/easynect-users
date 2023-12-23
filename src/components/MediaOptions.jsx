import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAccessToken } from "../../context/AccessTokenContext";
import { generateApiUrl } from "./ApiUr";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const MediaOptions = ({ item }) => {
  const accessToken = useAccessToken();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(item.is_hide || false);

  const handleIsHide = async () => {
    console.log("Checkbox clicked");
    try {
      const apiUrl = generateApiUrl(
        `/api/v1/contents/change_is_hide_state/${item.id}`
      );

      // Make an Axios GET request to fetch user data
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "Accept-Language": "fa"
        }
      });

      // Update the state of the checkbox
      setIsChecked(response.data.is_hide || false);
      router.reload();
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Check if the error response contains a message
      if (error.response && error.response.data && error.response.data.detail) {
        const errorMessage = error.response.data.detail;
        toast.error(errorMessage);
      } else {
        // If there is no specific error message, display a generic one
        toast.error("Error: An error occurred.");
      }
    }
  };

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
            {/* checkbox */}

            <div className="text-lg font-medium flex items-center">
              <label className="relative inline-flex items-center cursor-pointer ">
                <input
                  type="checkbox"
                  className="sr-only peer "
                  onChange={handleIsHide}
                  checked={isChecked}
                />
                <div className="w-11 h-6  bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-dark peer-checked:bg-dark"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaOptions;
