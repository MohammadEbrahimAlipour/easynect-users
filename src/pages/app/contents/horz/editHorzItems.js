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

const EditHorzItems = () => {
  const router = useRouter();
  const { id } = router.query;
  const accessToken = useAccessToken();
  const [mediaData, setMediaData] = useState(null);
  const [baseUrl, setBaseUrl] = useState("");
  const [livePreviewDesc, setLivePreviewDesc] = useState("");
  const [livePreviewTitle, setLivePreviewTitle] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content_val: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Concatenate baseUrl and content_val if the name is 'content_val'
    const updatedValue = name === "content_val" ? baseUrl + value : value;

    setFormData({
      ...formData,
      [name]: updatedValue
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

  useEffect(() => {
    const apiUrl = generateApiUrl(`/api/v1/horizontal_menu/${id}`);

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
          setBaseUrl(response.data.content_store.base_url);
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

    if (mediaData.id) {
      try {
        // Create form data object
        const formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }

        // Make a POST request to create a new user
        const apiUrl = generateApiUrl(
          `/api/v1/horizontal_menu/${mediaData.id}`
        );

        const response = await axios.patch(apiUrl, formDataToSend, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Language": "fa"
          }
        });

        if (response.status === 200) {
          // Handle success, for example, redirect to a success page
          console.log("User created successfully!");
          toast.success("updated successfully");
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

  const handleDeleteUser = (contentID) => {
    const apiUrl = generateApiUrl(`/api/v1/horizontal_menu/${contentID}`);

    // Set the request headers, including the Authorization header with the token
    const headers = {
      Authorization: `Bearer ${accessToken.accessToken}`, // Assuming accessToken is the token value
      "Accept-Language": "fa"
    };

    // Make an Axios DELETE request to delete the user
    axios
      .delete(apiUrl, { headers }) // Pass the headers in the request
      .then((response) => {
        // Handle the successful deletion (e.g., update the UI)
        console.log("User deleted successfully.");

        // Check if the status is 204 and navigate to the home page
        if (response.status === 204) {
          router.back();
        }
      })

      .catch((error) => {
        console.error("Error deleting user:", error);
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
  };

  return (
    <>
      {mediaData ? (
        <>
          <HeaderTwo />
          <Layout>
            <div className="bg-white rounded-lg container py-10">
              <form onSubmit={handleSubmit}>
                <div className="flex justify-end items-center">
                  {/* left side btns */}
                  <div className="text-sm flex">
                    <Link
                      href="/src/pages/app/cards/items/contentAddItem"
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
                        src={mediaData.icon_url}
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
                      defaultValue={mediaData.title}
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
                      defaultValue={mediaData.content_val}
                    />
                  </div>
                </div>
              </form>

              <button
                onClick={() => handleDeleteUser(mediaData.id)}
                className="text-[#CB3434] mt-5 border py-1 rounded-md w-full font-ravi"
              >
                خذف کردن
              </button>
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

export default EditHorzItems;
