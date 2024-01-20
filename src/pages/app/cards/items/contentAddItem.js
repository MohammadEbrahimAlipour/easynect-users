import Footer from "@/components/Footer";
import HeaderTwo from "@/components/HeaderTwo";
import Layout from "@/components/Layout";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAccessToken } from "../../../../../context/AccessTokenContext";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import LoadingState from "@/components/LoadingState";
import { useRouter } from "next/router";
import Category from "@/components/contentStore/Category";
import { API_ROUTES } from "@/services/api";
import axiosInstance from "@/services/axiosInterceptors";
import Head from "next/head";

const ContentStoreAddItem = () => {
  const accessToken = useAccessToken();
  const [contentData, setContentData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const containerRef = useRef(null);
  const isDragging = useRef(false); // New ref to track dragging state

  useEffect(() => {
    const apiUrl = API_ROUTES.CARDS_CONTENTADDITEM_CONTENT_STORE;

    // Make an Axios GET request to fetch user data
    axiosInstance
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "Accept-Language": "fa"
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

  const handleMouseMove = useCallback((e) => {
    if (isDragging.current) {
      const deltaX = e.clientX - containerRef.current.initialX;
      containerRef.current.scrollLeft -= deltaX;
      containerRef.current.initialX = e.clientX; // Update initialX on every move
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    // Attach the mouse up listener only once
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      // Remove the event listeners when the component unmounts
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]); // Empty array ensures the effect runs only on mount and unmount

  const handleMouseDown = (e) => {
    e.preventDefault();
    containerRef.current.initialX = e.clientX;
    isDragging.current = true;
    // Attach the move event listener directly on mousedown
    window.addEventListener("mousemove", handleMouseMove);
  };

  return (
    <>
      <Head>
        <title>ایزی‌نکت - ساخت آیتم جدید</title>
        <meta name="easynect business card" content="Powered by Easynect" />
      </Head>
      {contentData && id ? (
        <>
          <HeaderTwo />
          <Layout>
            {/* container */}
            <div
              ref={containerRef}
              className="grid grid-flow-col auto-cols-[36%] overscroll-contain overflow-x-auto 
             hide-scrollbar gap-2 snap-x"
              onMouseDown={handleMouseDown}
            >
              {contentData.map((cat) => (
                <Category
                  key={cat.id}
                  cat={cat}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                />
              ))}
            </div>

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
                        href={`/app/cards/items/mediaSettingsHorz?id=${item.id}&pageId=${id}&type=${item.type_}`}
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

export default ContentStoreAddItem;
