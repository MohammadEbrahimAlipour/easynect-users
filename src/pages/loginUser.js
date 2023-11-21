import React, { useState } from "react";
import Link from "next/link";
import Devider from "@/components/Devider";
import { useRouter } from "next/router";
import { useAccessToken } from "../../context/AccessTokenContext";
import axios from "axios";
import { generateApiUrl } from "@/components/ApiUr";
import { toast } from "react-toastify";
import EasynecVertLogo from "@/components/icons/EasynecVertLogo";
import Image from "next/image";
import IconReg from "@/components/icons/IconReg";
import bgGradient from "../../public/images/backgrounds/bgGradient.jpg";

const LoginUser = () => {
  const router = useRouter();
  // const [serverErrorMessage, setServerErrorMessage] = useState("");

  // To fill access token
  const { setAccessToken } = useAccessToken();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Define the API endpoint URL
      const apiUrl = generateApiUrl("/api/v1/login/");

      // Define the headers object with the necessary headers
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "accept-language": "fa"
      };

      // Send a POST request with the form data and headers using Axios
      const response = await axios.post(apiUrl, formData, { headers });

      if (response.status === 200) {
        // Parse the JSON response to extract the access_token
        const data = response.data;
        const accessToken = data.access_token;

        // Set the accessToken using the context
        setAccessToken(accessToken);

        // Check if localStorage is available before using it
        if (typeof localStorage !== "undefined") {
          // Store the accessToken in localStorage
          localStorage.setItem("accessToken", accessToken);
        }

        // Redirect to cards page
        router.push("/profileCard");

        // Handle successful login, e.g., redirect or set user authentication state
        console.log("Login successful");
      } else {
        // Handle login error, e.g., display an error message
        console.error("Login failed");

        // const errorMessage = response.data?.detail || "An error occurred";
        // setServerErrorMessage(errorMessage);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("An error occurred:", error);
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
    <div className="container mb-10">
      <div>
        <div className="w-full h-[320px] rounded-[20px] mt-5 gradient relative overflow-hidden">
          <span className="absolute z-100 flex items-center justify-center w-full top-10">
            <EasynecVertLogo />
          </span>
          <Image className="rounded-[20px]" src={bgGradient} alt="img" />
          <div className="absolute bottom-12 w-full flex flex-col justify-center items-center">
            <div className="bg-white opacity-40  w-[54px] h-[15px] relative top-[620px] rounded-lg  "></div>
            <div className="bg-white opacity-10  w-[80%] h-[230px] relative top-[590px] rounded-lg  "></div>

            <div className="bg-white opacity-25 shadow-2xl w-[42%] h-[200px] relative top-[410px] rounded-lg  "></div>

            <div className="bg-white opacity-40 shadow-2xl w-[52%] h-[200px] relative top-[230px] rounded-lg "></div>
            {/* middle of the photo icon */}
            <div className="w-full relative bottom-[-55px]">
              <IconReg />
            </div>
            {/* end of icon */}
          </div>
        </div>

        <h3 className="font-semibold text-lg mt-7 mb-3">ورود</h3>
        <Link href="/registerUser" className="flex justify-start items-center">
          <span className="text-muted me-1">تازه اومدین؟ </span>
          ثبت‌نام کنید
        </Link>
      </div>

      <Devider className="mt-6 mb-8" text="یا ورود با استفاده از ایمیل" />

      <form onSubmit={handleSubmit}>
        {/* user/pass */}
        <div>
          {/* email */}
          <input
            name="username"
            placeholder="ایمیل"
            className="border-2 px-3 py-4 w-full rounded-lg mb-4 bg-lightMenu outline-none"
            onChange={handleChange}
          />

          {/* password */}
          <div
            className="border-2 px-3 py-3 w-full rounded-lg mb-4 bg-lightMenu overflow-hidden
          flex flex-row justify-between items-center"
          >
            <input
              name="password"
              type="password"
              className=" bg-lightMenu outline-none"
              placeholder=" انتخاب رمز عبور"
              onChange={handleChange}
            />
            <span className="text-sm bg-muted text-white rounded-md py-2 px-3">
              <Link href="/forgotPassword">فراموش کرده‌اید؟</Link>
            </span>
          </div>

          {/* register btn */}
          <div>
            <button
              type="submit"
              className="w-full mt-7 bg-dark text-white font-semibold
             text-lg py-3 rounded-lg"
            >
              ورود
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginUser;
