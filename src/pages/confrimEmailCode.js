import Footer from "@/components/Footer";
import HeaderTwo from "@/components/HeaderTwo";
import { ConfirmEmailIcon, PasswordCircleImageIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useState } from "react";

const ConfrimEmailCode = () => {
  // Initialize state to store the user-entered code
  const [code, setCode] = useState("");

  return (
    <>
      <HeaderTwo href="/changeEmail" className="!pb-0" />
      <Layout className="!mb-0 !pb-0">
        <div
          className="w-full h-[290px] rounded-[20px] bg-gold
       bg-[url('../../public/images/backgrounds/passwordImage.jpg')] bg-cover
       "
        >
          <div className=" w-full h-full flex justify-center items-center relative">
            <span className=" absolute bottom-[60px] ">
              <PasswordCircleImageIcon />
            </span>
            <span className=" absolute -bottom-[45px] flex justify-center items-center w-full h-full">
              <ConfirmEmailIcon />
            </span>
          </div>
        </div>

        {/* title */}
        <div className="mt-5 mb-4">
          <h3 className="text-lg font-semibold">تایید ایمیل</h3>
          <p className="text-xs text-muted mt-2">
            لطفا کد تایید فرستاده شده به
            <span className="text-dark mx-1">info@sample.com</span>
            را وارد نمایید.
          </p>
        </div>

        {/* code input fields */}
        <div className="flex justify-between">
          {/* {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-[55px] h-[55px] bg-mutedDark opacity-10 border-opacity-75
              border-2 border-black
               text-center rounded-md"
              value={code[index] || ""}
              onChange={(e) => {
                const newCode = code.slice();
                newCode[index] = e.target.value;
                setCode(newCode.join(""));
              }}
            />
          ))} */}

          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-[55px] h-[55px] bg-[#EDEDED] 
              border-[1px] border-muted border-opacity-40
               text-center rounded-md text-2xl font-semibold"
            />
          ))}
        </div>
        {/* button */}
        <Link
          href="/confrimEmailCode"
          className="flex items-center justify-center w-full
                  bg-dark text-white py-3 leading-0 rounded-lg mt-7"
        >
          تایید کد
        </Link>
        {/* timer */}
        <p className="text-center mt-3 text-muted">
          ارسال مجدد (۰۰:۵۶ ثانیه دیگر)
        </p>
      </Layout>
      <Footer />
    </>
  );
};

export default ConfrimEmailCode;
