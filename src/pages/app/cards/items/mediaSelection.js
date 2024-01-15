import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { PlusSign } from "@/components/Icons";
import Footer from "@/components/Footer";
import HeaderTwo from "@/components/HeaderTwo";
import { useRouter } from "next/router";
import { useAccessToken } from "../../../../../context/AccessTokenContext";
import { toast } from "react-toastify";
import MediaOptions from "@/components/MediaOptions";
import { API_ROUTES } from "@/services/api";
import axiosInstance from "@/services/axiosInterceptors";
import Head from "next/head";

const MediaSelection = () => {
  const router = useRouter();
  const { id } = router.query;
  const accessToken = useAccessToken();
  const [mediaData, setMediaData] = useState([]);

  useEffect(() => {
    const apiUrl = API_ROUTES.CARDS_MEDIASELECTION_CONTENTS_PAGE(id);

    if (id) {
      // Make an Axios GET request to fetch user data
      axiosInstance
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`, // Add your access token here
            "Accept-Language": "fa" // Language header
          },
          suppress404Toast: true
        })
        .then((response) => {
          // Handle the data once it's received
          setMediaData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);

          if (error.response && error.response.status !== 404) {
            // Show toast for other non-404 errors
            if (
              error.response &&
              error.response.data &&
              error.response.data.detail
            ) {
              const errorMessage = error.response.data.detail;
              toast.error(errorMessage);
            } else if (error.response && error.response.status !== 404) {
              // If there is no specific error message from the backend, display a generic one
              toast.error("Error: An error occurred.");
            }
          }
        });
    }
  }, [accessToken.accessToken, id]);

  return (
    <>
      <Head>
        <title>ایزی‌نکت - لیست آیتم ها</title>
        <meta name="easynect business card" content="Powered by Easynect" />
      </Head>
      {/* add id to back route */}
      <HeaderTwo href="/app/cards/profileCard" />
      <Layout>
        <div className="bg-white rounded-lg container py-10">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">لیست آیتم‌ها</h3>
          </div>

          {/* items */}
          <div className="mt-10">
            {mediaData.map((item) => (
              <MediaOptions key={item.id} item={item} />
            ))}
          </div>
          {/* bottom side btns */}
          <div className="text-sm text-center w-full flex flex-col mt-5">
            <Link
              href={`/app/cards/items/contentAddItem?id=${id}`}
              className="border-[1px] border-black px-4 py-3 rounded-lg mb-2 flex justify-center
              items-center"
            >
              <span className="me-1">
                <PlusSign />
              </span>
              آیتم جدید
            </Link>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default MediaSelection;
