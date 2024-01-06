import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import axios from "axios";
import { LinkedIn, PlusSign } from "@/components/Icons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeaderTwo from "@/components/HeaderTwo";
import { useRouter } from "next/router";
import { useAccessToken } from "../../../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import { toast } from "react-toastify";
import Image from "next/image";
import MediaOptions from "@/components/MediaOptions";

const MediaSelection = () => {
  const router = useRouter();
  const { id } = router.query;
  const accessToken = useAccessToken();
  const [mediaData, setMediaData] = useState([]);

  useEffect(() => {
    const apiUrl = generateApiUrl(`/api/v1/contents/page/${id}`);

    if (id) {
      // Make an Axios GET request to fetch user data
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`, // Add your access token here
            "Accept-Language": "fa" // Language header
          }
        })
        .then((response) => {
          // Handle the data once it's received
          setMediaData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);

          // Check if the response is 404 and ignore the toast if it is
          if (error.response && error.response.status === 404) {
            // Maybe handle the 404 error by updating the state or routing the user elsewhere
            // DO NOT show the toast
          } else if (
            error.response &&
            error.response.data &&
            error.response.data.detail
          ) {
            const errorMessage = error.response.data.detail;
            toast.error(errorMessage);
          } else {
            // If there is no specific error message, display a generic one
            toast.error("Error: An error occurred.");
          }
        });
    }
  }, [accessToken.accessToken, id]);

  return (
    <>
      {/* add id to back route */}
      <HeaderTwo />
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
