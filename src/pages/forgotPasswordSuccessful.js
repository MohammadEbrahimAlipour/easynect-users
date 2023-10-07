import { TickSuccsess } from "@/components/Icons";
import Link from "next/link";
import React from "react";

const ForgotPasswordSuccessful = () => {
  return (
    <div className="container">
      <div className="w-full h-[320px] rounded-[20px] mt-5 bg-gold mb-8">
        photo
      </div>

      <div className="mb-7 w-full flex flex-col justify-center items-center px-10">
        <TickSuccsess />
        <p className="mt-3 mb-2">ایمیل ارسال شد</p>
        <p className="text-muted text-xs">
          ایمیل بازنشانی رمز عبور برای شما ارسال شد. درصورتی که در صندوق اصلی
          نبود، پوشه اسپم را نیز چک کنید.
        </p>
      </div>

      <Link
        href="/"
        className="w-full flex justify-center items-center mt-7 bg-dark text-white font-semibold
    text-lg py-3 rounded-lg"
      >
        ورود
      </Link>
    </div>
  );
};

export default ForgotPasswordSuccessful;
