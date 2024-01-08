import React, { useState } from "react";
import Link from "next/link";
import Devider from "@/components/Devider";
import { useRouter } from "next/router";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import axios from "axios";
import { generateApiUrl } from "@/components/ApiUr";
import EasynecVertLogo from "@/components/icons/EasynecVertLogo";
import Image from "next/image";
import IconReg from "@/components/icons/IconReg";
import bgGradient from "../../../../public/images/backgrounds/bgGradient.jpg";
import { motion } from "framer-motion";
import { loginUser } from "@/services/api";

const LoginUser = () => {
  const router = useRouter();

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
      const accessToken = await loginUser(formData);

      if (accessToken) {
        setAccessToken(accessToken);

        if (typeof localStorage !== "undefined") {
          localStorage.setItem("accessToken", accessToken);
        }

        router.push("/app/cards/profileCard");
      }
    } catch (error) {
      // The error has already been logged in the `loginUser` function
      // You can add additional error handling here if needed
    }
  };

  return (
    <div className="container mb-10">
      <div>
        <div className="w-full h-[320px] rounded-[20px] mt-5 gradient relative overflow-hidden">
          <span className="absolute z-100 flex items-center justify-center w-full top-10">
            <EasynecVertLogo />
          </span>
          <Image
            className="rounded-[20px]"
            priority={true}
            src={bgGradient}
            alt="img"
          />
          {/* animated cards */}
          <div className="absolute bottom-12 w-full flex flex-col justify-center items-center">
            <div className="bg-white opacity-40  w-[54px] h-[15px] relative top-[620px] rounded-lg "></div>
            <motion.div
              initial={{ y: 80, scale: 2 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-white opacity-10  w-[80%] h-[230px] relative top-[590px] rounded-lg  "
            ></motion.div>

            <motion.div
              initial={{ y: 90 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-white opacity-25 shadow-2xl w-[42%] h-[200px] relative top-[410px] rounded-lg  "
            ></motion.div>

            <motion.div
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-white opacity-40 shadow-2xl w-[52%] h-[200px] relative top-[230px] rounded-lg "
            ></motion.div>
            {/* middle of the photo icon */}
            <motion.div
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full relative bottom-[-55px]"
            >
              <IconReg />
            </motion.div>
            {/* end of icon */}
          </div>
        </div>

        <h3 className="font-semibold text-lg mt-7 mb-3">ورود</h3>
        <Link
          href="/registration/signUp/registerUser"
          className="flex justify-start items-center"
        >
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
            className="relative border-2 px-3 py-3 w-full rounded-lg mb-4 bg-lightMenu overflow-hidden
          flex flex-row justify-between items-center"
          >
            <input
              name="password"
              type="password"
              className=" bg-lightMenu outline-none"
              placeholder=" انتخاب رمز عبور"
              onChange={handleChange}
            />
            <span className="absolute left-1 text-xs bg-muted text-white rounded-md py-2 px-3 overflow-hidden">
              <Link
                href="/registration/signIn/forgotPassword"
                className=" whitespace-nowrap "
              >
                فراموش کرده‌اید؟
              </Link>
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
