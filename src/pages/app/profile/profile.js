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
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { useRouter } from "next/router";
import { generateApiUrl } from "@/components/ApiUr";
import Head from "next/head";

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
  const { setAccessToken } = useAccessToken();

  // logout
  const handleLogout = async () => {
    const apiUrl = generateApiUrl("/api/v1/logout/");

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "accept-language": "fa"
        }
      });

      if (response.status === 204) {
        // Logout was successful, you can redirect to a signIn page or perform any other actions
        setAccessToken(null);
        localStorage.removeItem("accessToken");

        router.push("/registration/signIn/loginUser");
        console.log("Logout successful");
      } else {
        // Handle logout error, e.g., display an error message
        setAccessToken(null);
        localStorage.removeItem("accessToken");

        console.error("Logout failed");
      }
    } catch (error) {
      setAccessToken(null);
      localStorage.removeItem("accessToken");

      // Handle network errors or other exceptions
      console.error("An error occurred during logout:", error);
    }
  };
  return (
    <>
      <Head>
        <title>ایزی‌نکت - صفحه پروفایل</title>
        <meta name="easynect business card" content="Powered by Easynect" />
      </Head>
      <Header />
      <Layout className="!px-9">
        {/* menu */}
        <section className="w-full ">
          <ul>
            <li className="py-5 border-b-[1px] flex justify-start items-center">
              <ProfileInfoIcon />
              <CustomLinkProfile
                title="اطلاعات کاربری"
                href="/app/profile/info/profileInfo"
                className="ms-2"
              />
            </li>

            <li className="py-5 border-b-[1px] flex justify-start items-center">
              <ProfileChangePassIcon />
              <CustomLinkProfile
                title="تغییر ایمیل"
                href="/app/profile/changeMail/changeEmail"
                className="ms-2"
              />
            </li>
            <li className="py-5 border-b-[1px] flex justify-start items-center">
              <ProfileChangePassIcon />
              <CustomLinkProfile
                title="تغییر رمز عبور"
                href="/app/profile/changePass/changePassword"
                className="ms-2"
              />
            </li>

            {/* logout */}
            <li className="py-5 border-b-[1px] flex justify-start items-center font-semibold">
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
