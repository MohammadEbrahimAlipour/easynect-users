import React from "react";
import Image from "next/image";
import bgStartHere from "../../../public/images/intro.jpg";
import EasynectSquareLogo from "@/components/icons/EasynectSquareLogo";
import Link from "next/link";
import { NextStartIcon } from "@/components/Icons";

const InfoLanding = () => {
  const progress = 50; // Set the progress percentage
  return (
    <div className="container mb-10">
      <div>
        <div className="w-full h-[450px] rounded-[20px] mt-5 gradient relative overflow-hidden">
          <span className="absolute z-100 flex items-center justify-center w-full top-[130px]">
            <EasynectSquareLogo />
          </span>
          <Image className="rounded-[20px]" src={bgStartHere} alt="img" />
        </div>

        <h3 className="font-bold text-2xl mt-4 mb-3">همه کارت‌ها در یک جیب!</h3>
        <p className="text-lg text-muted">
          به جای داشتن یک دسته‌بندی از کارت‌های ویزیت فیزیکی که به راحتی گم یا
          فراموش می‌شوند، این اپ امکان ایجاد و طراحی کارت‌های ویزیت دیجیتال با
          انعطاف‌پذیری بیشتر، به اشتراک‌گذاری آسان و مدیریت بهتر را فراهم
          می‌کند.
        </p>

        <div className="flex justify-between items-center mt-5">
          {/* progress bar */}
          <div className="relative w-[100px]">
            <div className="flex items-center justify-between">
              <div></div>
            </div>
            <div className="flex h-2  overflow-hidden text-xs bg-[#E3E3E3] rounded">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-dark"
              ></div>
            </div>
          </div>
          {/* next btn */}
          <Link href="/startHere/startHere" className="">
            <div
              className="bg-dark w-[50px] h-[50px] flex justify-center items-center rounded-full 
        
         "
            >
              <NextStartIcon />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoLanding;
