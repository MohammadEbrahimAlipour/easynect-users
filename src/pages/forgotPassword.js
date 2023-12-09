import React from "react";

import {
  ArrowRight,
  PasswordCircleImageIcon,
  PasswordImageIcon
} from "@/components/Icons";
import Link from "next/link";
import { motion } from "framer-motion";
import EasynectSquareLogo from "@/components/icons/EasynectSquareLogo";
import EasynecVertLogo from "@/components/icons/EasynecVertLogo";
import {useRouter} from "next/router";

const ForgotPassword = () => {
  const router=useRouter()
  const handleBack = () => {
    router.back();
    console.log("btn clicked")
  };



  return (
    <div className="container">
      <div
        className="w-full h-[320px] rounded-[20px] mt-5 bg-gold
       bg-[url('../../public/images/backgrounds/passwordImage.jpg')] bg-cover
       "
      >

        <div className=" w-full h-full flex justify-center items-center relative overflow-hidden">

             <span className="absolute z-100 flex items-center justify-center w-full top-[60px]">
        <EasynecVertLogo/>
        </span>

          <motion.span
            initial={{ y: 0, scale: 3 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className=" absolute bottom-[70px] "
          >
            <PasswordCircleImageIcon />
          </motion.span>
          <span className=" absolute -bottom-[50px] flex justify-center items-center w-full h-full overflow-hidden" >
            <motion.span
              initial={{ y: 0, scale: -2 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <PasswordImageIcon />
            </motion.span>
          </span>
        </div>
      </div>

      <div className="mt-7">
        <div className=" text-muted text-sm">
          <button onClick={handleBack} className="flex justify-start">
            <span className="me-1">
              <ArrowRight />
            </span>
            بازگشت
          </button>
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
