import Footer from "@/components/Footer";
import HeaderTwo from "@/components/HeaderTwo";
import { ConfirmEmailIcon, PasswordCircleImageIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { generateApiUrl } from "@/components/ApiUr";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Head from "next/head";
import EasynecVertLogo from "@/components/icons/EasynecVertLogo";

const VerifyOTP = () => {
  const inputRef = useRef(null);
  // Initialize state to store the user-entered code
  const [timer, setTimer] = useState(120); // Initial timer value in seconds

  //   to send email to backend
  const router = useRouter();
  const { email } = router.query;

  // accessToken
  const { setAccessToken } = useAccessToken();

  // Initialize state to store the user-entered code
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);

  const [timeLeft, setTimeLeft] = useState(120);

  const [loading, setLoading] = useState(false);

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
        router.push("/registration/signUp/registerUser");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Join otp array into a single string
    const concatenatedOtp = otp.join("");
    try {
      // Define the API endpoint URL
      const apiUrl = generateApiUrl("/api/v1/users/verify_otp/");
      // Define the headers object with the Authorization header
      const headers = {
        "Content-Type": "application/json", // Set the content type
        // Authorization: `Bearer ${email}`
        "accept-language": "fa"
      };

      // Send a POST request with the OTP code and headers
      const response = await axios.post(
        apiUrl,
        { otp: concatenatedOtp, email: email },
        { headers }
      );

      if (response.status === 200) {
        setLoading(false);
        // redirect user to signIn page

        // Handle the successful response
        console.log("OTP code verification successful");
        const accessToken = response.data.access_token;
        setAccessToken(accessToken);
        router.push("/app/cards/profileCard");
        // Redirect to the confirmation page or perform other actions
      } else {
        setLoading(false);
        // Handle other status codes, e.g., display an error message
        console.error("OTP code verification failed");
      }
    } catch (error) {
      setLoading(false);
      // Handle errors, e.g., display an error message
      console.error("Error:", error);
      // Check if the error response contains a message
      if (error.response && error.response.data && error.response.data.detail) {
        const errorMessage = error.response.data.detail;
        toast.error(errorMessage);
      } else {
        // If there is no specific error message, display a generic one
        toast.error("ارور ناشناخته");
      }
    }
  };

  return (
    <>
      <Head>
        <title>ایزی‌نکت - رمز یک بار مصرف</title>
        <meta name="easynect business card" content="Powered by Easynect" />
      </Head>
      <Layout className="!mb-0 !pb-0">
        <div
          className="w-full h-[290px] rounded-[20px] bg-gold
       bg-[url('../../public/images/backgrounds/passwordImage.jpg')] bg-cover
          overflow-hidden "
        >
          <span className="relative z-100 flex items-center justify-center w-full top-[60px]">
            <EasynecVertLogo />
          </span>
          <div className="bottom-[20px] w-full h-full flex justify-center items-center relative">
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
            <span className="text-dark mx-1">
              {email ? email : "info@sample.com"}
            </span>
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
                  if (!/[0-9]/.test(e.key)) {
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
            disabled={loading}
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
    </>
  );
};

export default VerifyOTP;
