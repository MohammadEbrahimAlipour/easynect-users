import {PasswordCircleImageIcon, PasswordImageIcon, TickSuccsess} from "@/components/Icons";
import Link from "next/link";
import React from "react";
import EasynecVertLogo from "@/components/icons/EasynecVertLogo";
import {motion} from "framer-motion";

const ForgotPasswordSuccessful = () => {
  return (
    <div className="container">
        <div
            className="w-full h-[320px] rounded-[20px] mt-5 bg-gold
       bg-[url('../../public/images/backgrounds/passwordImage.jpg')] bg-cover
       "
        >
            <div className=" w-full h-full flex justify-center items-center relative overflow-hidden">
          <span className="absolute z-100 flex items-center justify-center w-full top-[60px]">
            <EasynecVertLogo />
          </span>

                <motion.span
                    initial={{ y: 0, scale: 3 }}
                    animate={{ y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className=" absolute bottom-[70px] "
                >
                    <PasswordCircleImageIcon />
                </motion.span>
                <span className=" absolute -bottom-[50px] flex justify-center items-center w-full h-full overflow-hidden">
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

      <div className="mb-7 mt-10 w-full flex flex-col justify-center items-center px-10">
        <TickSuccsess />
        <p className="mt-3 mb-2">ایمیل ارسال شد</p>
        <p className="text-muted text-xs">
          ایمیل بازنشانی رمز عبور برای شما ارسال شد. درصورتی که در صندوق اصلی
          نبود، پوشه اسپم را نیز چک کنید.
        </p>
      </div>

      <Link
        href="/registration/signIn/loginUser"
        className="w-full flex justify-center items-center mt-7 bg-dark text-white font-semibold
    text-lg py-3 rounded-lg"
      >
        ورود
      </Link>
    </div>
  );
};

export default ForgotPasswordSuccessful;
