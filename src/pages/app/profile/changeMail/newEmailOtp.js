import Footer from "@/components/Footer";
import HeaderTwo from "@/components/HeaderTwo";
import { ConfirmEmailIcon, PasswordCircleImageIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { generateApiUrl } from "@/components/ApiUr";
import { useAccessToken } from "../../../../../context/AccessTokenContext";
import Head from "next/head";
import { motion } from "framer-motion";
import EasynecVertLogo from "@/components/icons/EasynecVertLogo";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  // Initialize state to store the user-entered code
  const accessToken = useAccessToken();
  const inputRef = useRef(null);

  //   to send email to backend
  const router = useRouter();
  const { email } = router.query;

  // Initialize state to store the user-entered code
  // Function to generate OTP code

  // Initialize state to store the user-entered code
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);

  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      toast.error("no time left");
      setTimeLeft(null);
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  // redirect
  useEffect(
    () => {
      if (timeLeft === 0) {
        router.push("/app/profile/changeMail/changeEmail");
      }
    },
    [timeLeft, router],
    3000
  );

  const handleInputChange = (index, value) => {
    // Create a copy of the current OTP array
    const updatedOTP = [...otp];

    // Update the value at the specified index
    updatedOTP[index] = value;

    // Set the updated OTP array in state
    setOTP(updatedOTP);

    // Move focus to the next input if not the last one and the current input is filled
    if (index < otp.length - 1 && value !== "") {
      inputRef.current.childNodes[index + 1].focus();
    }
  };

  const generateOTP = () => {
    return otp.join("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const new_otp = otp;
    try {
      // Define the API endpoint URL
      const apiUrl = generateApiUrl("/api/v1/users/verify_new_email/");
      // Define the headers object with the Authorization header
      const headers = {
        "Content-Type": "application/json", // Set the content type
        "accept-language": "fa",
        Authorization: `Bearer ${accessToken.accessToken}`
      };
      const finalOtp = generateOTP().split("").join("");

      // Send a POST request with the OTP code and headers
      const response = await axios.post(
        apiUrl,
        { otp: finalOtp, email: email },
        { headers }
      );

      if (response.status === 200) {
        // redirect user to signIn page
        router.push("/app/profile/profile");

        // Handle the successful response
        console.log("OTP code verification successful");

        // Redirect to the confirmation page or perform other actions
      } else {
        // Handle other status codes, e.g., display an error message
        console.error("OTP code verification failed");
      }
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Head>
        <title>ایزی‌نکت - رمز یک بار مصرف</title>
        <meta name="easynect business card" content="Powered by Easynect" />
      </Head>
      <HeaderTwo href="/" className="!pb-0" />
      <Layout className="!mb-0 !pb-0">
        <div
          className="w-full h-[290px] rounded-[20px] bg-gold
       bg-[url('../../public/images/backgrounds/passwordImage.jpg')] bg-cover
          overflow-hidden "
        >
          <span className="relative z-100 flex items-center justify-center w-full top-[60px]">
            <EasynecVertLogo />
          </span>

          <div className="w-full h-full flex justify-center items-center relative  bottom-[20px]">
            <motion.span
              initial={{ y: 0, scale: 3 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className=" absolute bottom-[60px] "
            >
              <PasswordCircleImageIcon />
            </motion.span>
            <motion.span
              initial={{ y: 0, scale: -2 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className=" absolute -bottom-[45px] flex justify-center items-center w-full h-full"
            >
              <ConfirmEmailIcon />
            </motion.span>
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

        {/* code input field */}
        <form onSubmit={handleSubmit}>
          {/* test */}
          <div
            ref={inputRef}
            className="flex flex-row-reverse justify-between "
          >
            {Array.from({ length: 6 }).map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="tel"
                // value={value}
                // value={otp[index]}
                defaultValue={otp[index]}
                maxLength="1"
                pattern="[0-9]*"
                inputMode="numeric" // ensures iOS brings up the numeric keypad
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                }}
                autoComplete="off" // aid to prevent browsers from autocompleting values
                autoFocus={index === 0} // autofocus on the first input
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="w-[50px] h-[50px] 2xs:w-[42px] 2xs:h-[45px] bg-[#EDEDED] 
              border-[1px] border-muted border-opacity-40
               text-center rounded-md text-2xl font-semibold"
              />
            ))}
          </div>

          {/* button */}
          <button
            type="submit"
            className="flex items-center justify-center w-full
                    bg-dark text-white py-3 leading-0 rounded-lg mt-7"
          >
            تایید کد
          </button>
        </form>
        {/* timer */}

        <p className="text-center mt-3 text-muted">
          ارسال مجدد ({timeLeft < 10 ? `0${timeLeft}` : timeLeft} ثانیه دیگر)
        </p>
      </Layout>
      <Footer />
    </>
  );
};

export default VerifyOTP;
