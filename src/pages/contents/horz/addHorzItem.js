import Footer from "@/components/Footer";
import HeaderTwo from "@/components/HeaderTwo";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { toast } from "react-toastify";
import { generateApiUrl } from "@/components/ApiUr";
import Link from "next/link";
import Image from "next/image";
import ContentHorizontalItems from "@/components/contentHorizontalItems";
import LoadingState from "@/components/LoadingState";
import { useRouter } from "next/router";

const AddHorzItem = () => {
  const accessToken = useAccessToken();
  const [contentData, setContentData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const apiUrl = generateApiUrl(
      `/api/v1/contents_store/?type_=${"horizontal"}`
    );

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
        setContentData(response.data);

        // Set the initial selectedCategory to the category of the first item (if available)
        const firstCategory =
          response.data.length > 0 ? response.data[0].category : "";
        setSelectedCategory(firstCategory);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // Check if the error response contains a message
        if (
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
  }, [accessToken.accessToken]);
  return (
    <>
      {contentData ? (
        <>
          <HeaderTwo />
          <Layout>
            {/* top filters */}
            <div
              className="grid grid-flow-col auto-cols-[36%] overscroll-contain overflow-x-auto
     hide-scrollbar gap-2 snap-x"
            >
              {contentData.map((cat) => (
                <ContentHorizontalItems
                  key={cat.title}
                  cat={cat}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                />
              ))}
            </div>

            {/* page data */}

            {selectedCategory && (
              <div>
                <h3 className="my-8 font-semibold text-lg">
                  {selectedCategory}:
                </h3>
                <div className="flex flex-wrap ">
                  {contentData
                    .find((cat) => cat.category === selectedCategory)
                    .contents_store.map((item) => (
                      <Link
                        href={`/contents/horz/createHorzItem?id=${item.id}&pageId=${id}`}
                        key={item.id}
                        className="flex flex-col justify-center items-center me-3 mb-5"
                      >
                        <Image
                          className="bg-white invert p-2 rounded-lg mb-2"
                          alt="icon"
                          src={item.s3_icon_url}
                          width={60}
                          height={60}
                        />
                        <p className="text-xs font-medium">{item.title}</p>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </Layout>
          <Footer />
        </>
      ) : (
        <LoadingState />
      )}
    </>
  );
};

export default AddHorzItem;
