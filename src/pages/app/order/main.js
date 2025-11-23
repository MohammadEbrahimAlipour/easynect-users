"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Head from "next/head";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { API_ROUTES } from "@/services/api";
import axiosInstance from "@/services/axiosInterceptors";

const Main = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = useAccessToken();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const apiUrl = API_ROUTES.CARDS_PROFILE_CARD_PAGES;

        const res = await axiosInstance.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "accept-language": "fa",
            suppress404Toast: true,
          },
        });

        setPages(res.data);
      } catch (error) {
        console.error("Error fetching pages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [accessToken]); 


return (
  <>
    <Head>
      <title>ایزی‌نکت - پروفایل‌ها</title>
    </Head>
    <Header />
    <Layout className="!px-9 py-6">
      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <ProfileCard key={page.id} page={page} />
          ))}
        </div>
      )}
    </Layout>
    <Footer />
  </>
);
};

const ProfileCard = ({ page }) => {
  return (
    <div className="border rounded-2xl p-4 bg-white shadow">
      <img
        src={page.profile_s3_url}
        alt="profile"
        className="w-20 h-20 rounded-full object-cover mb-3 mx-auto"
      />
      <h2 className="text-center text-lg font-bold mb-1">
        {page.user_first_name} {page.user_last_name}
      </h2>
      <p className="text-center text-gray-500">{page.job_title}</p>
      <a
        href={`/app/order/catalogs/${page.catalogs[0]?.id}`}
        className="block text-center text-blue-600 mt-3 underline"
      >
        مشاهده کاتالوگ‌ها
      </a>
    </div>
  );
};

export default Main;
