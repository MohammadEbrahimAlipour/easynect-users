import Footer from "@/components/Footer";
import HeaderTwo from "@/components/HeaderTwo";
import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useState } from "react";
import { generateApiUrl } from "@/components/ApiUr";
import axios from "axios";
import { useAccessToken } from "../../../../../context/AccessTokenContext";
import { useRouter } from "next/router";

const ChangeEmail = () => {
  const accessToken = useAccessToken();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  //   fill input values
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);

    const formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    try {
      // api url
      const apiUrl = generateApiUrl("/api/v1/users/change_email/");

      const response = await axios.post(
        apiUrl, //api url
        formObject,
        {
          headers: {
            "Content-Type": "application/json",
            "accept-language": "fa",
            Authorization: `Bearer ${accessToken.accessToken}`
          }
        }
      );
      if (response.status === 200) {
        // Handle a successful response (e.g., show a success message)
        console.log("email changed successfuly");

        // Redirect to OTP confirm page with email as a query parameter
        router.push(
          `/app/profile/changeMail/newEmailOtp?email=${encodeURIComponent(
            email
          )}`
        );
        router.push("/app/profile/changeMail/newEmailOtp");
      } else {
        // Handle errors (e.g., show an error message)
        console.log("Registration failed");
      }
    } catch (error) {
      // Handle network errors
      console.log("Network error:", error);
    }
  };

  return (
    <>
      <HeaderTwo href="/profile" />
      <Layout>
        <p className="text-lg ps-3 font-semibold mb-3">تغییر ایمیل </p>

        <form onSubmit={onSubmit}>
          {/* new email */}
          <div className="bg-lightMenu rounded-lg  mb-4 border-2 box-border">
            <div className="flex justify-start items-center py-3">
              <label
                className="font-medium text-sm border-e-2 text-muted me-2 pe-2 ps-4"
                htmlFor="data_inp"
              >
                ایمیل جدید
              </label>
              <input
                required={true}
                id="data_inp"
                placeholder="example@gmail.com"
                name="email"
                onChange={onChange}
                value={email}
                className="bg-lightMenu outline-0 py-1 text-sm font-medium "
              />
            </div>
          </div>

          {/* current password */}
          <div className="bg-lightMenu rounded-lg  mb-4 border-2 box-border">
            <div className="flex justify-start items-center py-3">
              <label
                className="font-medium text-sm border-e-2 text-muted me-2 pe-2 ps-4"
                htmlFor="password"
              >
                رمز عبور
              </label>
              <input
                required={true}
                type="password"
                id="password"
                placeholder="Example123!"
                name="password"
                onChange={onChange}
                value={password}
                className="bg-lightMenu outline-0 py-1 text-sm font-medium "
              />
            </div>
          </div>

          {/* button */}
          <button
            href="/confrimEmailCode"
            className="flex items-center justify-center w-full
                      bg-dark text-white py-3 leading-0 rounded-lg mt-7"
          >
            تغییر ایمیل
          </button>
        </form>
      </Layout>
      <Footer />
    </>
  );
};

export default ChangeEmail;
