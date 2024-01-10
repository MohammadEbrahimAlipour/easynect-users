import { NextStartIcon } from "@/components/Icons";
import EasynectSquareLogo from "@/components/icons/EasynectSquareLogo";
import React, {
  useCallback,
  useDebugValue,
  useEffect,
  useImperativeHandle,
  useReducer,
  useState
} from "react";
import Link from "next/link";
import Image from "next/image";
import bgStartHere from "../../../public/images/startHere.jpg";
import IconReg from "@/components/icons/IconReg";
import { motion } from "framer-motion";
import ComingSoon from "@/components/ComingSoon";
import Head from "next/head";

const StartHere = () => {
  const progress = 100; // Set the progress percentage

  return (
    <div className="container mb-10">
      <Head>
        <title>ایزی‌نکت</title>
        <meta name="easynect business card" content="Powered by Easynect" />
      </Head>
      <div>
        <motion.div
          initial={{ height: "40vh" }}
          animate={{ height: "70vh" }}
          // exit={{ opacity: 0, y: "100%", scale: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full rounded-[20px] mt-5 gradient relative overflow-hidden"
        >
          <span className="absolute z-100 flex items-center justify-center w-full top-[90px]">
            <EasynectSquareLogo />
          </span>
          <Image className="rounded-[20px]" src={bgStartHere} alt="img" />

          {/* reappear */}

          <motion.div
            initial={{ opacity: 0, y: -50, scale: 2 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: "100%", scale: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute bottom-12 w-full flex flex-col justify-center items-center"
          >
            <div className="bg-white opacity-40 w-[54px] h-[15px] relative top-[275px] rounded-lg"></div>
            <div className="bg-white opacity-10 w-[80%] h-[230px] relative top-[250px] rounded-lg"></div>

            {/* middle of the photo icon */}
            <div className="w-full relative bottom-[-55px]">
              <IconReg />
            </div>
            {/* end of icon */}
          </motion.div>
        </motion.div>

        <h3 className="font-bold text-2xl mt-4 mb-3">آماده‌ای شروع کنیم؟</h3>

        <div className="flex justify-between items-center mt-5">
          {/* progress bar */}
          <div className="relative w-[100px]">
            <div className="flex items-center justify-between">
              {/* <div></div> */}
            </div>
            <div className="flex h-2  overflow-hidden text-xs bg-[#E3E3E3] rounded">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-dark"
              ></div>
            </div>
          </div>
          {/* next btn */}
          <Link
            href="/registration/signUp/registerUser"
            className=" bg-dark text-white py-3 px-14 rounded-md"
          >
            {/* <div className="bg-dark w-[50px] h-[50px] flex justify-center items-center rounded-full">

            </div> */}
            شروع کنیم
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartHere;
