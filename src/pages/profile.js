import React, { useEffect } from "react";
import Footer from "@/components/Footer";
import {
  ProfileChangePassIcon,
  ProfileExitIcon,
  ProfileInfoIcon,
  ProfileLeadIcon,
  ProfileNoticesIcon
} from "@/components/Icons";
import Layout from "@/components/Layout";
import ProfileImage from "@/components/ProfileImage";
import Link from "next/link";
import Header from "@/components/Header";
import axios from "axios";
import { useAccessToken } from "../../context/AccessTokenContext";
import { useRouter } from "next/router";

const CustomLinkProfile = ({ href, title, className = "" }) => {
  return (
    <Link href={href} className={`font-medium text-lg ${className}`}>
      {title}
    </Link>
  );
};

const Profile = () => {
  const router = useRouter();
  // const { accessToken, setAccessToken } = useAccessToken();
  const accessToken = useAccessToken();
  console.log(accessToken);

  // logout
  const handleLogout = async () => {
    console.log("Logout clicked"); // Add this line
    console.log(accessToken.accessToken);
    try {
      const response = await axios.get(
        "http://188.121.115.0:8000/api/v1/logout/",
        {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "accept-language": "fa"
          }
        }
      );

      if (response.status === 204) {
        // Logout was successful, you can redirect to a login page or perform any other actions
        router.push("/loginUser");
        console.log("Logout successful");

        // Clear the access token by setting it to null
        // setAccessToken(null);

        //  redirect to register page
        // router.push("/regiserUser");
      } else {
        // Handle logout error, e.g., display an error message
        console.error("Logout failed");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("An error occurred during logout:", error);
    }
  };
  return (
    <>
      <Header />
      <Layout className="!px-9">
        {/* <div className="flex flex-col justify-center items-center w-full overflow-hidden border-b-[1px]">
          <ProfileImage />
          <h1 className="mt-4 mb-9 text-lg font-semibold ">محمدامین خاکشوری</h1>
        </div> */}

        {/* menu */}
        <section className="w-full ">
          <ul>
            <li className="py-5 border-b-[1px] flex justify-start items-center">
              <ProfileInfoIcon />
              <CustomLinkProfile
                title="اطلاعات کاربری"
                href="/profileInfo"
                className="ms-2"
              />
            </li>
            <li className="py-5 border-b-[1px] flex justify-start items-center">
              <ProfileLeadIcon />
              <CustomLinkProfile
                title="مدیریت فرم‌های لید"
                href="/"
                className="ms-2"
              />
            </li>
            <li className="py-5 border-b-[1px] flex justify-start items-center">
              <ProfileChangePassIcon />
              <CustomLinkProfile
                title="تغییر ایمیل"
                href="/changeEmail"
                className="ms-2"
              />
            </li>
            <li className="py-5 border-b-[1px] flex justify-start items-center">
              <ProfileChangePassIcon />
              <CustomLinkProfile
                title="تغییر رمز عبور"
                href="/changePassword"
                className="ms-2"
              />
            </li>

            {/* logout */}
            <li className="py-5 border-b-[1px] flex justify-start items-center">
              <ProfileExitIcon />
              <button className="text-[#CB3434] ms-2" onClick={handleLogout}>
                خروج از حساب کاربری
              </button>
            </li>
          </ul>
        </section>
      </Layout>
      <Footer />
    </>
  );
};

export default Profile;
