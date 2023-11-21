import HeaderTwo from "@/components/HeaderTwo";
import Layout from "@/components/Layout";
import Link from "next/link";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import axios from "axios";
import { useAccessToken } from "../../context/AccessTokenContext"; // Import your access token context hook
import { generateApiUrl } from "@/components/ApiUr";

const ChangePassword = () => {
  const { accessToken } = useAccessToken(); // Get the access token from your context

  const [formData, setFormData] = useState({
    current_password: "",
    password1: "",
    password2: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password1 and password2 match
    if (formData.password1 !== formData.password2) {
      console.error("Passwords do not match");
      return; // Stop form submission if passwords do not match
    }

    try {
      // Define the API endpoint URL
      const apiUrl = generateApiUrl("/api/v1/users/change_password/");

      // Define the headers object with the necessary headers
      const headers = {
        "Content-Type": "application/json",
        "accept-language": "fa",
        Authorization: `Bearer ${accessToken}` // Include the access token in the request headers
      };

      // Send a POST request with the form data and headers using Axios
      const response = await axios.post(apiUrl, formData, { headers });

      if (response.status === 200) {
        // Handle successful password change, e.g., redirect or show a success message
        console.log("Password changed successfully");
      } else {
        // Handle password change error, e.g., display an error message
        console.error("Password change failed");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <HeaderTwo href="/profile" />
      <Layout>
        <p className="text-lg ps-3 font-semibold mb-3">تغییر رمز عبور</p>

        <form onSubmit={handleSubmit}>
          {/* current password */}
          <div className="bg-lightMenu rounded-lg  mb-4 border-2 box-border">
            <div className="flex justify-start items-center py-3">
              <label
                className="font-medium text-sm border-e-2 text-muted me-2 pe-2 ps-4"
                htmlFor="current_password"
              >
                رمز عبور فعلی
              </label>
              <input
                type="password"
                id="current_password"
                name="current_password"
                value={formData.current_password}
                onChange={handleChange}
                className="bg-lightMenu outline-0 py-1 text-sm font-medium "
              />
            </div>
          </div>

          {/* new pass1 */}
          <div className="bg-lightMenu rounded-lg  mb-4 border-2 box-border">
            <div className="flex justify-start items-center py-3">
              <label
                className="font-medium text-sm border-e-2 text-muted me-2 pe-2 ps-4"
                htmlFor="password1"
              >
                رمز عبور جدید
              </label>
              <input
                type="password"
                id="password1"
                name="password1"
                value={formData.password1}
                onChange={handleChange}
                className="bg-lightMenu outline-0 py-1 text-sm font-medium "
              />
            </div>
          </div>

          {/* new pass2 */}
          <div className="bg-lightMenu rounded-lg  mb-3 border-2 box-border">
            <div className="flex justify-start items-center py-3">
              <label
                className="font-medium text-sm border-e-2 text-muted me-2 pe-2 ps-4"
                htmlFor="password2"
              >
                تکرار رمز عبور جدید
              </label>
              <input
                type="password"
                id="password2"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                className="bg-lightMenu outline-0 py-1 text-sm font-medium "
              />
            </div>
          </div>

          {/* button */}
          <button
            type="submit"
            className="flex items-center justify-center w-full bg-dark text-white py-3 leading-0 rounded-lg mt-7"
          >
            تغییر رمز عبور
          </button>
        </form>
      </Layout>
      <Footer />
    </>
  );
};

export default ChangePassword;
