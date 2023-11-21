import Footer from "@/components/Footer";
import HeaderTwo from "@/components/HeaderTwo";
import { ConfirmEmailIcon, PasswordCircleImageIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { generateApiUrl } from "@/components/ApiUr";
import { useAccessToken } from "../../context/AccessTokenContext";

const VerifyOTP = () => {
  // Initialize state to store the user-entered code
  const [code, setCode] = useState("");
  const accessToken = useAccessToken();

  //   to send email to backend
  const router = useRouter();
  const { email } = router.query;

  // Initialize state to store the user-entered code
  // Function to generate OTP code

  // Initialize state to store the user-entered code
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [finalOtp, setFinalOtp] = useState("");
  const handleInputChange = (index, value) => {
    // Create a copy of the current OTP array
    const updatedOTP = [...otp];

    // Update the value at the specified index
    updatedOTP[index] = value;

    // Set the updated OTP array in state
    setOTP(updatedOTP);
  };

  const generateOTP = () => {
    return otp.join("");
  };

  // console.log(otp);
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
      const finalOtp = generateOTP().split("").reverse().join("");
      console.log(finalOtp);

      // Send a POST request with the OTP code and headers
      const response = await axios.post(
        apiUrl,
        { otp: finalOtp, email: email },
        { headers }
      );
      // console.log(response);

      if (response.status === 200) {
        // redirect user to login page
        router.push("/profile");

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
      <HeaderTwo href="/" className="!pb-0" />
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

        {/* code input field */}
        <form onSubmit={handleSubmit}>
          {/* test */}
          <div className="flex justify-between">
            {Array.from({ length: 6 }).map((value, index) => (
              <input
                key={index}
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
          ارسال مجدد (۰۰:۵۶ ثانیه دیگر)
        </p>
      </Layout>
      <Footer />
    </>
  );
};

export default VerifyOTP;
