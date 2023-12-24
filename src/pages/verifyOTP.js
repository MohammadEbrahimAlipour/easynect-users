import Footer from "@/components/Footer";
import HeaderTwo from "@/components/HeaderTwo";
import { ConfirmEmailIcon, PasswordCircleImageIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { generateApiUrl } from "@/components/ApiUr";
import { useAccessToken } from "../../context/AccessTokenContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const VerifyOTP = () => {
  const inputRef = useRef(null);
  // Initialize state to store the user-entered code
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(120); // Initial timer value in seconds

  //   to send email to backend
  const router = useRouter();
  const { email } = router.query;

  // accessToken
  const { setAccessToken } = useAccessToken();

  // Initialize state to store the user-entered code
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [finalOtp, setFinalOtp] = useState("");

  const startTimer = () => {
    if (timer > 0) {
      setTimer((prevTimer) => prevTimer - 1);
      setTimeout(startTimer, 1000);
    }
  };

  // Start the timer when the component mounts and email has a value
  if (timer === 120 && email) {
    startTimer();
  }

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
        // redirect user to login page

        // Handle the successful response
        console.log("OTP code verification successful");
        const accessToken = response.data.access_token;
        setAccessToken(accessToken);
        router.push("/app/cards/profileCard");
        // Redirect to the confirmation page or perform other actions
      } else {
        // Handle other status codes, e.g., display an error message
        console.error("OTP code verification failed");
      }
    } catch (error) {
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
      <HeaderTwo href="/" className="!pb-0" />
      <Layout className="!mb-0 !pb-0">
        <div
          className="w-full h-[290px] rounded-[20px] bg-gold
       bg-[url('../../public/images/backgrounds/passwordImage.jpg')] bg-cover
          overflow-hidden "
        >
          <div className=" w-full h-full flex justify-center items-center relative">
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
          <div ref={inputRef} className="flex flex-row-reverse justify-between">
            {Array.from({ length: 6 }).map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={value}
                maxLength="1"
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="w-[50px] h-[50px] bg-[#EDEDED] 
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
          ارسال مجدد (۰۰:{timer < 10 ? `0${timer}` : timer} ثانیه دیگر)
        </p>
      </Layout>
      <Footer />
    </>
  );
};

export default VerifyOTP;
