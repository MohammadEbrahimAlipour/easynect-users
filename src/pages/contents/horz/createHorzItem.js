import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChosenTik, InfoIcon, LinkedIn } from "@/components/Icons";
import Footer from "@/components/Footer";
import HeaderTwo from "@/components/HeaderTwo";
import { useRouter } from "next/router";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import LoadingState from "@/components/LoadingState";

const CreateHorzItem = () => {
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
  const [showTooltip, setShowTooltip] = useState(false);

  const [type, setType] = useState(""); // to save the type and use it in urls

  const [formData, setFormData] = useState({
    title: "",
    content_val: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Concatenate baseUrl and content_val if the name is 'content_val'
    const updatedValue =
      name === "content_val" && baseUrl !== null ? baseUrl + value : value;

    setFormData({
      ...formData,
      [name]: updatedValue
    });
  };
  console.log("display", displayType); //clg here

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
      display_type: displayType
    }));
  }, [displayType]);

  useEffect(() => {
    const apiUrl = generateApiUrl(`/api/v1/contents_store/${id}`);

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
          setPlaceholder(response.data.placeholder);
          setType(response.data.type);
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

    if (id && pageId && mediaData.id && mediaData.type) {
      try {
        // Create form data object
        const formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }

        console.log("display sending", displayType); //clg here

        // Make a POST request to create a new user
        const apiUrl = generateApiUrl(
          `/api/v1/contents_store/horizontal_menu/${mediaData.id}/${pageId}`
        );
        console.log("apiUrl", apiUrl);
        const response = await axios.post(apiUrl, formDataToSend, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Language": "fa"
          }
        });

        if (response.status === 201) {
          // Handle success, for example, redirect to a success page
          console.log("User created successfully!");
          toast.success("updated successfully");
          router.back();
        } else {
          // Handle other status codes or show an error message if needed
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        // Handle any errors, e.g., display an error message to the user
        console.error("Error:", error);
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
      }
    }
  };

  console.log("media", mediaData);
  console.log("formData", formData);

  return (
    <>
      {mediaData && placeholder ? (
        <>
          <HeaderTwo />
          <Layout>
            <div className="bg-white rounded-lg container py-10">
              <form onSubmit={handleSubmit}>
                <div className="flex justify-end items-center">
                  {/* left side btns */}
                  <div className="text-sm flex">
                    <Link
                      href="/contentAddItem"
                      className="me-3 border-[1px] border-black px-4 py-1 rounded-lg"
                    >
                      انصراف
                    </Link>
                    <button
                      type="submit"
                      className="bg-dark text-white px-4 py-1 rounded-lg border-[1px] border-black font-ravi"
                    >
                      ذخیره
                    </button>
                  </div>
                </div>

                {/* preview */}
                <div className="mt-10">
                  <div className=" py-4 px-3 flex flex-col justify-center items-center">
                    <span className="bg-dark w-[70px] h-[70px] rounded-md flex justify-center items-center overflow-hidden me-1">
                      <Image
                        className="bg-white p-2 rounded-lg invert"
                        alt="icon"
                        src={mediaData.s3_icon_url}
                        width={60}
                        height={60}
                      />
                    </span>
                    <p className="font-medium text-xs text-dark my-2 me-1 whitespace-nowrap">
                      {livePreviewTitle !== ""
                        ? livePreviewTitle
                        : mediaData.title}
                    </p>
                  </div>

                  <div className="mt-10 flex flex-col w-full">
                    <label htmlFor="title" className="mb-2">
                      عنوان
                    </label>
                    <input
                      htmlFor="title"
                      name="title"
                      placeholder={mediaData.title}
                      onChange={(e) => {
                        handleInputChange(e);
                        setLivePreviewTitle(e.target.value);
                      }}
                      className="border-2 rounded-md text-sm py-1 px-1 mb-3 font-ravi"
                    />

                    <span className="flex justify-between items-center relative">
                      <label htmlFor="icon" className="mb-2">
                        اطلاعات را وارد کنید:
                      </label>

                      <span
                        className={`absolute z-10 w-[140px] left-[22px] -top-6 bg-dark text-white
                        rounded-md overflow-hidden text-xs p-2 opacity-0 transform scale-0 transition-opacity duration-700 
                        ${
                          showTooltip
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-0"
                        }`}
                      >
                        <p className="mb-2">{mediaData.hint_title}:</p>
                        <p>{mediaData.hint}:</p>
                      </span>
                      <span
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onMouseEnter={handleTouchStart}
                        onMouseLeave={handleTouchEnd}
                        onMouseDown={handleTouchStart}
                        onMouseUp={handleTouchEnd}
                      >
                        <InfoIcon />
                      </span>
                    </span>

                    <input
                      id="icon"
                      type="text"
                      name="content_val"
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      className="border-2 rounded-md text-sm py-1 px-1 font-ravi"
                      placeholder={mediaData.description}
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

export default CreateHorzItem;
