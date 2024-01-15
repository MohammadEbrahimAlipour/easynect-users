import React, { useState } from "react";

import {
  ArrowRight,
  PasswordCircleImageIcon,
  PasswordImageIcon
} from "@/components/Icons";
import { motion } from "framer-motion";
import EasynecVertLogo from "@/components/icons/EasynecVertLogo";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { generateApiUrl } from "@/components/ApiUr";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import Head from "next/head";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const accessToken = useAccessToken();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to create a new device
      const apiUrl = generateApiUrl(`/api/v1/users/forgot_password/`);
      const response = await axios.post(
        apiUrl,
        { email },
        {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Content-Type": "application/json",
            "Accept-Language": "fa"
          }
        }
      );

      if (response.status === 200) {
        // Handle success, for example, redirect to a success page
        console.log("Password sent successfully");
        toast.success("ایمیل بازیابی رمز عبور با موفقیت ارسال شد");
        router.push("/registration/signIn/forgotPasswordSuccessful");
      } else {
        // Handle other status codes or show an error message if needed
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      // Handle any errors, e.g., display an error message to the user
      console.error("Error:", error);
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

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="container">
      <Head>
        <title>ایزی‌نکت - فراموشسی رمز</title>
        <meta name="easynect business card" content="Powered by Easynect" />
      </Head>
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

      <form onSubmit={handleSubmit}>
        {/* user/pass */}
        <div>
          {/* email */}
          <input
            name="email"
            type="email"
            value={email}
            placeholder="ایمیل"
            className="border-2 px-3 py-4 w-full rounded-lg bg-lightMenu outline-none"
            onChange={(e) => setEmail(e.target.value)}
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
