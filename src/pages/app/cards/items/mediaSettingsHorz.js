import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChosenTik, InfoIcon, LinkedIn } from "@/components/Icons";
import Footer from "@/components/Footer";
import HeaderTwo from "@/components/HeaderTwo";
import { useRouter } from "next/router";
import { useAccessToken } from "../../../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import LoadingState from "@/components/LoadingState";
import UnifiedData from "@/components/mediaItems/UnifiedData";
import File from "@/components/mediaItems/File";

import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axiosInstance from "@/services/axiosInterceptors";
import { API_ROUTES } from "@/services/api";
import Head from "next/head";

const MediaSettingsHorz = () => {
  const router = useRouter();
  const { id } = router.query;
  const { pageId } = router.query;
  const accessToken = useAccessToken();
  const [mediaData, setMediaData] = useState(null);
  const [placeholder, setPlaceholder] = useState("");
  const [livePreviewDesc, setLivePreviewDesc] = useState("");
  const [livePreviewTitle, setLivePreviewTitle] = useState("");
  const [is_square, setIsSquare] = useState(true);
  const [baseUrl, setBaseUrl] = useState("");
  const [displayType, setDisplayType] = useState("square");
  const { type } = router.query;
  const [showTooltip, setShowTooltip] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content_val: "",
  });

  const onUploadProgress = (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setUploadProgress(percentCompleted);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value; // Declare updatedValue with initial value

    // Concatenate baseUrl and content_val if the name is 'content_val'
    // and if baseUrl is not null or empty
    if (baseUrl && name === "content_val") {
      updatedValue = baseUrl + value;
    } else if (name === "content_val") {
      updatedValue = value;
    }

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleIsSquare = () => {
    setIsSquare(true);
    setDisplayType("square");
  };
  const handleNotSquare = () => {
    setIsSquare(false);
    setDisplayType("highlight");
  };

  // to handle showing tips
  const handleTouchStart = () => {
    setShowTooltip(true);
  };

  const handleTouchEnd = () => {
    setShowTooltip(false);
  };

  // useEffect to update formData when displayType changes
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      display_type: displayType,
    }));
  }, [displayType]);

  useEffect(() => {
    const apiUrl = API_ROUTES.CARDS_MEDIASETTINGHORZ_CONTENTS_STORE(id);

    if (id) {
      // Make an Axios GET request to fetch user data
      axiosInstance
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`, // Add your access token here
            "Accept-Language": "fa", // Language header
          },
        })
        .then((response) => {
          // Handle the data once it's received
          setMediaData(response.data);
          setPlaceholder(response.data.placeholder);

          setBaseUrl(response.data.base_url);
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
    }
  }, [accessToken.accessToken, id]);

  // to post the data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    if (id && pageId && mediaData.id && mediaData.type) {
      try {
        setIsLoading(true);
        // Create form data object
        const formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
          console.log(formDataToSend,formData, 'formDataToSend')
        }

        // Append the file to formData before sending
        if (file) {
          formDataToSend.append("file", file); // 'file' is the field name for the uploaded file
        }

        // Make a POST request to create a new user
        const apiUrl = generateApiUrl(
          `/api/v1/contents_store/${mediaData.type}/${mediaData.id}/${pageId}`
        );
        const response = await axios.post(apiUrl, formDataToSend, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Language": "fa",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        });

        if (response.status === 201) {
          // Handle success, for example, redirect to a success page
          console.log("User created successfully!");
          toast.success("updated successfully");
          router.push(`/app/cards/items/mediaSelection?id=${pageId}`);
        } else {
          // Handle other status codes or show an error message if needed
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        // Log the error object
        console.error("Error:", error);

        if (axios.isAxiosError(error)) {
          // The error is related to axios
          if (error.response) {
            if (error.response.status === 422) {
              // Handle specific error when status is 422
              const errorMessage = error.response.data.detail[0].msg;
              toast.error(`Error 422: ${errorMessage}`);
            } else if (error.response.data && error.response.data.detail) {
              // Handle general case with details
              const errorMessage = error.response.data.detail;
              toast.error(errorMessage);
            } else {
              // Handle general case without details
              toast.error("An error occurred while processing your request.");
            }
          } else if (error.request) {
            // The request was made, but no response was received
            toast.error("No response received from the server.");
          } else {
            // Something happened in setting up the request that triggered an error
            toast.error("Error: " + error.message);
          }
        } else {
          // The error is not related to axios
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setUploadProgress(null);
        setIsLoading(false);
      }
    }
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };

  const goBack = () => {
    if (isLoading) return;

    router.back();
  };

  return (
    <>
      <Head>
        <title>ایزی‌نکت - ساخت آیتم جدید</title>
        <meta name="easynect business card" content="Powered by Easynect" />
      </Head>
      {mediaData && placeholder && id && type ? (
        <>
          <HeaderTwo />
          <Layout>
            <div className="bg-white rounded-lg container py-10">
              <form onSubmit={handleSubmit}>
                <div className="flex justify-end items-center">
                  {/* left side btns */}
                  <div className="text-sm flex">
                    <span
                      onClick={goBack}
                      className="me-3 border-[1px] border-black px-4 py-1 rounded-lg"
                    >
                      انصراف
                    </span>
                    <button
                      type="submit"
                      className="bg-dark text-white px-4 py-1 rounded-lg border-[1px] border-black"
                    >
                      {isLoading ? "در حال ارسال..." : "ذخیره"}
                    </button>
                  </div>
                </div>

                <div className="mt-10 flex flex-col items-center">
                  {/* preview */}
                  <div
                    className={`border-2 rounded-md py-4 px-3 w-[170px] overflow-hidden 
                  ${
                    is_square
                      ? "flex flex-col"
                      : "flex justify-start items-center w-[300px]"
                  }`}
                  >
                    <span className="bg-dark w-[45px] h-[45px] rounded-full flex justify-center items-center overflow-hidden me-1">
                      <Image
                        className="bg-white p-2 rounded-lg invert"
                        alt="icon"
                        src={mediaData.s3_icon_url}
                        width={60}
                        height={60}
                      />
                    </span>
                    <p className="font-medium text-xs text-dark my-2 me-1 whitespace-nowrap truncate overflow-hidden">
                      {livePreviewTitle !== ""
                        ? livePreviewTitle
                        : mediaData.title}
                    </p>
                    <p
                      className={` text-xs overflow-hidden line-clamp-2 ${
                        is_square ? "text-muted" : "hidden"
                      }`}
                    >
                      {livePreviewDesc !== ""
                        ? livePreviewDesc
                        : mediaData.description}
                    </p>
                  </div>

                  <>
                    {type !== "file" ? (
                      //  unified input data

                      <UnifiedData
                        setShowTooltip={setShowTooltip}
                        mediaData={mediaData}
                        showTooltip={showTooltip}
                        is_square={is_square}
                        handleTouchStart={handleTouchStart}
                        handleTouchEnd={handleTouchEnd}
                        handleInputChange={handleInputChange}
                        setLivePreviewTitle={setLivePreviewTitle}
                        setLivePreviewDesc={setLivePreviewDesc}
                      />
                    ) : (
                      //  file input data
                      <File
                        mediaData={mediaData}
                        showTooltip={showTooltip}
                        is_square={is_square}
                        handleTouchStart={handleTouchStart}
                        handleTouchEnd={handleTouchEnd}
                        handleInputChange={handleInputChange}
                        setLivePreviewTitle={setLivePreviewTitle}
                        setLivePreviewDesc={setLivePreviewDesc}
                        setFile={setFile}
                        uploadProgress={uploadProgress}
                      />
                    )}
                  </>
                </div>

                <div className="mt-10 py-3 border-[1px] rounded-lg px-2 flex flex-col justify-between overflow-hidden ">
                  <h3 className="text-sm mb-2">حالت های مختلف نمایش</h3>
                  <div className="flex justify-between overflow-hidden">
                    {/* chosen for rectengle */}
                    <span
                      className={`relative left-[-134px] top-[2px] opacity-0 transform scale-0 transition-opacity duration-1000
                    ${
                      is_square ? "opacity-0 scale-0" : "opacity-100 scale-100"
                    } `}
                    >
                      <ChosenTik />
                    </span>

                    {/* chosen for square */}
                    <span
                      className={`relative  left-[-223px] top-[20px] opacity-0 transform scale-0 transition-opacity duration-1000 
                    ${
                      is_square ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                    >
                      <ChosenTik />
                    </span>

                    {/* rectengle */}
                    <span
                      onClick={handleNotSquare}
                      className="w-[120px] h-[20px] bg-muted me-4 rounded-sm opacity-40"
                    />

                    {/* square */}
                    <span
                      onClick={handleIsSquare}
                      className="w-[55px] h-[55px] bg-muted rounded-sm opacity-40 "
                    />
                  </div>
                </div>
              </form>
            </div>
          </Layout>
          <Footer />
        </>
      ) : (
        <LoadingState />
      )}
    </>
  );
};

export default MediaSettingsHorz;
