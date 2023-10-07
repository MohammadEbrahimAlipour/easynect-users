import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import Devider from "@/components/Devider";
import Image from "next/image";
import bgGradient from "../../public/images/backgrounds/bgGradient.jpg";
import { useRouter } from "next/router";
import { generateApiUrl } from "@/components/ApiUr";

const RegisterUser = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: ""
  });
  const { email, password1, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Convert form data to a plain object

    const formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    try {
      // api url
      const apiUrl = generateApiUrl("/api/v1/users/");
      const response = await axios.post(
        apiUrl, //api url
        formObject,
        {
          headers: {
            "Content-Type": "application/json",
            "accept-language": "fa"
          }
        }
      );

      if (response.status === 201) {
        // Handle a successful response (e.g., show a success message)
        console.log("Registration successful");

        // Redirect to OTP confirm page with email as a query parameter
        router.push(`/verifyOTP?email=${encodeURIComponent(email)}`);
      } else {
        // Handle errors (e.g., show an error message)
        console.log("Registration failed");
      }
    } catch (error) {
      // Handle network errors
      console.log("Network error:");
    }
  };

  return (
    <>
      <div className="container mb-10">
        <div className="w-full h-[320px] rounded-[20px] mt-5 gradient relative">
          <Image className="rounded-[20px]" src={bgGradient} alt="img" />
          <div className="bg-white absolute bottom-0">
            {/* middle of the photo icon */}
            <span></span>
            {/* end of icon */}
          </div>
        </div>

        {/* register */}
        <h3 className="font-semibold text-lg mt-7 mb-3">ثبت‌نام</h3>
        <Link href="/loginUser" className="flex justify-start items-center">
          <span className="text-muted me-1">قبلا ثبت‌نام کرده‌اید؟ </span>
          وارد شوید
        </Link>
        <Devider className="mt-6 mb-8" text="یا ثبت نام با استفاده از ایمیل" />

        <form method="" onSubmit={onSubmit}>
          {/* user/pass */}
          <div>
            {/* email */}
            <input
              onChange={onChange}
              name="email"
              value={email}
              placeholder="ایمیل"
              className="border-2 px-3 py-4 w-full rounded-lg mb-4 bg-lightMenu outline-none"
            />

            {/* password */}
            <div className="border-2 px-3 py-4 w-full rounded-lg mb-4 bg-lightMenu">
              <input
                onChange={onChange}
                name="password1"
                value={password1}
                className="bg-lightMenu outline-none"
                placeholder=" انتخاب رمز عبور"
              />
            </div>
            {/* password2 */}
            <div className="border-2 px-3 py-4 w-full rounded-lg bg-lightMenu">
              <input
                onChange={onChange}
                name="password2"
                value={password2}
                className="bg-lightMenu outline-none"
                placeholder=" تکرار رمز عبور"
              />
            </div>

            {/* register btn */}
            <div>
              <button
                type="submit"
                className="w-full mt-7 bg-dark text-white font-semibold
            text-lg py-3 rounded-lg"
              >
                ثبت‌نام
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterUser;
