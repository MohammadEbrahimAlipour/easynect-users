import React, { useState } from "react";
import Image from "next/image";
import sampleImage from "../../../../public/images/defaultProfile.jpeg";
import { ChangePhotoIcon } from "@/components/Icons";
import { generateApiUrl } from "@/components/ApiUr";
import axios from "axios";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import EditMenuOptions from "@/components/EditMenuOptions";
import Devider from "@/components/Devider";
import ToggleSwitch from "@/components/ToggleSwitch";

const CreateCard = () => {
  const { accessToken } = useAccessToken();
  const router = useRouter();
  const [changedFormData, setChangedFormData] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    owner_first_name: "",
    owner_last_name: "",
    card_title: "",
    job_title: "",
    company: "",
    is_direct: false
  });

  // State to hold the URL of the selected image for preview
  const [imagePreview, setImagePreview] = useState(null);

  // Handle image file change
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Set the image preview URL
      setImagePreview(URL.createObjectURL(selectedFile));

      // Update the formData
      setChangedFormData((prevFormData) => ({
        ...prevFormData,
        profile_s3_url: selectedFile
      }));
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleRouterBack = () => {
    router.back();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // The API endpoint URL
    const apiUrl = generateApiUrl("/api/v1/pages/");

    // Create a FormData object to send the file and other data
    const formDataToSend = new FormData();

    // Append changed image file to formDataToSend if it's selected
    if (changedFormData.profile_s3_url) {
      formDataToSend.append("profile", changedFormData.profile_s3_url);
    }

    // Append all other form data to formDataToSend
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // Do not set Content-Type here; FormData will be auto-configured
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "accept-language": "fa",
        "Content-Type": "multipart/form-data"
      }
    };

    // Send a POST request with the form data and headers using Axios
    axios
      .post(apiUrl, formDataToSend, config)
      .then((response) => {
        if (response.status === 200) {
          router.push("/app/cards/profileCard");
          // Handle successful response, e.g., show a success message
          console.log("Form submitted successfully");
        } else {
          // Handle other response status codes or errors
          console.error("Error: Unable to submit form");
        }
      })
      .catch((error) => {
        // Handle network errors or other exceptions
        console.error("An error occurred:", error);
      });
  };

  return (
    <main>
      <Header />
      <Layout className="!px-3 !pt-3 mb-10">
        <div className="flex flex-col">
          <div className="bg-white w-full h-auto rounded-lg pb-10 container">
            <form onSubmit={handleSubmit}>
              {/* top options */}
              <div className="my-6">
                <div className="flex justify-between">
                  <Link href="/src/pages">کارت جدید</Link>

                  {/* left side btns */}
                  <div className="text-sm">
                    <span
                      onClick={handleRouterBack}
                      className="me-2 border-[1px] border-black px-4 py-1 rounded-lg"
                    >
                      انصراف
                    </span>
                    <button
                      type="submit" // This makes it a submit button
                      className="bg-dark text-white px-4 py-1 rounded-lg border-[1px] border-black"
                    >
                      ذخیره
                    </button>
                  </div>
                </div>
              </div>

              {/* portfolio Image */}
              <div className="flex justify-center items-center">
                <div>
                  <div
                    id="photo_here"
                    className="border-[3px] box-content border-gold w-[80px] h-[80px] rounded-full
                      overflow-hidden"
                  >
                    {/* Display the image preview */}
                    {imagePreview ? (
                      <Image
                        className="rounded-full object-cover w-full h-full"
                        src={imagePreview}
                        alt="Preview"
                        width={80}
                        height={80}
                      />
                    ) : (
                      // Display the default image if no preview available
                      <Image
                        priority={true}
                        className="rounded-full object-contain"
                        src={sampleImage}
                        width={80}
                        height={80}
                        alt="Person Name"
                      />
                    )}
                  </div>
                  {/* Upload button */}
                  <label
                    htmlFor="fileInput"
                    id="uploadPhoto"
                    className="relative right-0 bottom-9 cursor-pointer"
                  >
                    <ChangePhotoIcon />
                    <input
                      type="file"
                      name="profile_s3_url"
                      id="fileInput"
                      accept=".jpg, .jpeg, .png, .webp"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>

              {/* contact options */}
              <div>
                <p className="text-lg ps-3 font-semibold mb-3">اطلاعات کارت</p>
                <EditMenuOptions
                  label="نام‌کاربری"
                  placeholder="حروف کوچک، اعداد، _"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                <EditMenuOptions
                  label="نام"
                  name="owner_first_name"
                  value={formData.owner_first_name}
                  onChange={handleInputChange}
                  required
                />
                <EditMenuOptions
                  label="نام خوانوادگی"
                  name="owner_last_name"
                  value={formData.owner_last_name}
                  onChange={handleInputChange}
                  required
                />
                <EditMenuOptions
                  label="اسم کارت"
                  name="card_title"
                  value={formData.card_title}
                  onChange={handleInputChange}
                  required
                />
                <EditMenuOptions
                  label="تیتر شغل"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleInputChange}
                />
                <EditMenuOptions
                  label="کمپانی"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
        </div>
      </Layout>
      <Footer />
    </main>
  );
};

export default CreateCard;
