import Layout from "@/components/Layout";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ChosenTik, InfoIcon, LinkedIn } from "@/components/Icons";
import Footer from "@/components/Footer";
import HeaderTwo from "@/components/HeaderTwo";
import { useRouter } from "next/router";
import { useAccessToken } from "../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import LoadingState from "@/components/LoadingState";
import CreateUnifiedData from "@/components/mediaItems/createItem/CreateUnifiedData";
import CreateFile from "@/components/mediaItems/createItem/CreateFile";

const EditMediaSettingsHorz = () => {
  const router = useRouter();
  const { id } = router.query;
  const accessToken = useAccessToken();
  const [mediaData, setMediaData] = useState(null);
  const [placeholder, setPlaceholder] = useState("");
  const [livePreviewDesc, setLivePreviewDesc] = useState("");
  const [livePreviewTitle, setLivePreviewTitle] = useState("");
  const [file, setFile] = useState(null);

  const [baseUrl, setBaseUrl] = useState("");
  const [displayType, setDisplayType] = useState("");

  const [is_square, setIsSquare] = useState(false);

  const [showTooltip, setShowTooltip] = useState(false);

  const [type, setType] = useState(""); // to save the type and use it in urls

  const [formData, setFormData] = useState({
    title: "",
    content_val: "",
    description: ""
  });

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

  // useEffect to update formData when displayType changes
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      display_type: displayType
    }));

    // Update is_square based on the initial value of displayType
    setIsSquare(displayType === "square");
  }, [displayType]);

  useEffect(() => {
    const apiUrl = generateApiUrl(`/api/v1/contents/${id}`);

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
          setType(response.data.content_store.type);
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

    if (mediaData.id && mediaData.content_store.type) {
      try {
        // Create form data object
        const formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }
        // Append the file to formData before sending
        if (file) {
          formDataToSend.append("file", file); // 'file' is the field name for the uploaded file
        }

        // Make a POST request to create a new user
        const apiUrl = generateApiUrl(
          `/api/v1/contents/${mediaData.content_store.type}/${mediaData.id}`
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
    const apiUrl = generateApiUrl(`/api/v1/contents/${contentID}`);

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

  const goBack = () => {
    router.back();
  };
  return (
    <>
      {mediaData && id ? (
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
                      className="bg-dark text-white px-4 py-1 rounded-lg border-[1px] border-black font-ravi"
                    >
                      ذخیره
                    </button>
                  </div>
                </div>

                {/* preview */}
                <div className="mt-10 flex flex-col items-center">
                  <div
                    className={`border-2 rounded-md py-4 px-3 w-[210px] overflow-hidden 
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

                  {type !== "file" ? (
                    <CreateUnifiedData
                      mediaData={mediaData}
                      showTooltip={showTooltip}
                      setShowTooltip={setShowTooltip}
                      is_square={is_square}
                      handleTouchStart={handleTouchStart}
                      handleTouchEnd={handleTouchEnd}
                      handleInputChange={handleInputChange}
                      setLivePreviewTitle={setLivePreviewTitle}
                      setLivePreviewDesc={setLivePreviewDesc}
                    />
                  ) : (
                    <CreateFile
                      mediaData={mediaData}
                      showTooltip={showTooltip}
                      is_square={is_square}
                      handleTouchStart={handleTouchStart}
                      handleTouchEnd={handleTouchEnd}
                      handleInputChange={handleInputChange}
                      setLivePreviewTitle={setLivePreviewTitle}
                      setLivePreviewDesc={setLivePreviewDesc}
                      setFile={setFile}
                    />
                  )}
                </div>

                <div className="mt-10 py-5 border-[1px] rounded-lg px-2 flex justify-between overflow-hidden ">
                  <h3 className="text-sm">پیش نمایش</h3>
                  <div className="flex ">
                    {/* chosen for rectengle */}
                    <span
                      className={`relative left-[-83px] top-[2px] opacity-0 transform scale-0 transition-opacity duration-1000
                ${is_square ? "opacity-0 scale-0" : "opacity-100 scale-100"} `}
                    >
                      <ChosenTik />
                    </span>

                    {/* chosen for square */}
                    <span
                      className={`relative left-[-170px] top-[20px] opacity-0 transform scale-0 transition-opacity duration-1000 
                ${is_square ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
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

              <button
                onClick={() => handleDeleteUser(mediaData.id)}
                className="text-[#CB3434] mt-5 border py-1 rounded-md w-full font-ravi"
              >
                حذف کردن
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

export default EditMediaSettingsHorz;
