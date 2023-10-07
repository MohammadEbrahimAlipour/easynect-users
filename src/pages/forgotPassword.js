import React from "react";

import {
  ArrowRight,
  PasswordCircleImageIcon,
  PasswordImageIcon
} from "@/components/Icons";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <div className="container">
      <div
        className="w-full h-[320px] rounded-[20px] mt-5 bg-gold
       bg-[url('../../public/images/backgrounds/passwordImage.jpg')] bg-cover
       "
      >
        <div className=" w-full h-full flex justify-center items-center relative">
          <span className=" absolute bottom-[70px] ">
            <PasswordCircleImageIcon />
          </span>
          <span className=" absolute -bottom-[50px] flex justify-center items-center w-full h-full">
            <PasswordImageIcon />
          </span>
        </div>
      </div>

      <div className="mt-7">
        <div className=" text-muted text-sm">
          <Link href="/loginUser" className="flex justify-start">
            <span className="me-1">
              <ArrowRight />
            </span>
            بازگشت
          </Link>
        </div>
        <h3 className="font-semibold text-lg mt-3 mb-6">فراموشی رمز عبور</h3>
      </div>

      <form method="">
        {/* user/pass */}
        <div>
          {/* email */}
          <input
            name="email"
            placeholder="ایمیل"
            className="border-2 px-3 py-4 w-full rounded-lg bg-lightMenu outline-none"
          />

          {/* register btn */}
          <div>
            <button
              type="submit"
              className="w-full mt-7 bg-dark text-white font-semibold
    text-lg py-3 rounded-lg"
            >
              ارسال ایمیل
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
