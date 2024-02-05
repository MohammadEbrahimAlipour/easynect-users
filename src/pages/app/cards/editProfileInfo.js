import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChangePhotoIcon, PenEditIcon, PlusSign } from "@/components/Icons";
import EditMenuOptions from "@/components/EditMenuOptions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { useRouter } from "next/router";
import { generateApiUrl } from "@/components/ApiUr";
import LoadingState from "@/components/LoadingState";
import ProfileImage from "@/components/ProfileImage";
import { API_ROUTES } from "@/services/api";
import Head from "next/head";
import axiosInstance from "@/services/axiosInterceptors";
import LoaderOverlay from "@/loading/LoaderOverlay";

const EditProfileInfo = () => {
  const [pageData, setPageData] = useState(null);
  const accessToken = useAccessToken();
  const router = useRouter();
  const { id } = router.query;
  const [changedFormData, setChangedFormData] = useState({});
  const apiUrl = API_ROUTES.CARDS_EDIT_PROFILE_INFO_PAGES(id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    owner_first_name: "",
    owner_last_name: "",
    card_title: "",
    job_title: "",
    company: "",
    is_direct: false,
    is_public: false,
    bio: "",
    profile: ""
  });
  const [isDirect, setIsDirect] = useState(formData.is_direct);

  // Fetch data from the server when the component mounts
  useEffect(() => {
    if (id) {
      axios
        .get(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.accessToken}`,
            "accept-language": "fa"
          }
        })
        .then((response) => {
          setPageData(response.data);
          // Set the initial form data from the fetched data

          // Set the initial value for isDirect here
          setIsDirect(response.data.is_direct || false);
          // Set the initial form data from the fetched data
          setFormData({
            username: response.data.username || "",
            owner_first_name: response.data.owner_first_name || "",
            owner_last_name: response.data.owner_last_name || "",
            card_title: response.data.card_title || "",
            job_title: response.data.job_title || "",
            company: response.data.company || "",
            is_direct: response.data.is_direct || false,
            is_public: response.data.is_public || false,
            bio: response.data.bio || "", // Set bio from the fetched data
            profile: response.data.profile_s3_url || ""
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [accessToken.accessToken, apiUrl, id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the changedFormData object with the changed field
    setChangedFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setChangedFormData((prevFormData) => ({
        ...prevFormData,
        profile: selectedFile
      }));
    }
  };
  const handleToggleDirect = () => {
    setIsDirect((prevIsDirect) => {
      const newIsDirect = !prevIsDirect;

      // Update the formData object with the changed field value and
      // ensure it can be submitted with the form later as changed data
      setChangedFormData((prevFormData) => ({
        ...prevFormData,
        is_direct: newIsDirect
      }));

      return newIsDirect;
    });
  };

  // Function to resize and convert an image to a blob
  const resizeImage = async (file, maxWidth, maxHeight, quality) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        let canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => resolve(blob), "image/jpeg", quality);
      };

      img.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // The API endpoint URL
    const updateUrl = generateApiUrl(`/api/v1/pages/${id}`);

    // Create a FormData object to send the file and other data
    const formDataToSend = new FormData();

    // Append only the fields that have changed to formDataToSend
    for (const key in changedFormData) {
      if (changedFormData.hasOwnProperty(key)) {
        formDataToSend.append(key, changedFormData[key]);
      }
    }

    // Check if the profile image has changed
    if (changedFormData.profile) {
      // Check the size of the file
      if (changedFormData.profile.size > 2 * 1024 * 1024) {
        // If the file size is greater than 2MB, resize it
        const maxWidth = 800; // Max width for the image
        const maxHeight = 600; // Max height for the image
        const quality = 0.7; // The quality of the resulting JPEG image

        const resizedBlob = await resizeImage(
          changedFormData.profile,
          maxWidth,
          maxHeight,
          quality
        );

        // Check the size of the resized file
        if (resizedBlob.size > 2 * 1024 * 1024) {
          // Handle the case where the resized image is still too large
          console.error("Error: Resized image exceeds 2MB");
          setIsSubmitting(false);
          return;
        }

        // Append the resized image only if it has been changed
        formDataToSend.append("profile", resizedBlob, "resized-image.jpg");
      } else {
        // If the file size is within the limit, append it directly
        formDataToSend.append("profile", changedFormData.profile);
      }
    }

    // Send a PATCH request with the FormData and headers using Axios
    axiosInstance
      .patch(updateUrl, formDataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "accept-language": "fa"
        }
      })
      .then((response) => {
        if (response.status === 200) {
          setIsSubmitting(false);
          // Handle successful response, e.g., show a success message
          console.log("Form submitted successfully");
          setChangedFormData({}); // Clear the changedFormData object
          router.push("/app/cards/profileCard");
          // to reload the page
          // window.location.reload();
        } else {
          // Handle other response status codes or errors
          console.error("Error: Unable to submit form");
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        // Handle network errors or other exceptions
        console.error("An error occurred:", error);
      });
  };

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <main>
        <Head>
          <title>ایزی‌نکت - ویرایش کارت</title>
          <meta name="easynect business card" content="Powered by Easynect" />
        </Head>
        <Header />
        <Layout className="!px-3 2xs:!px-1 !pt-3 !h-fit !mb-10">
          {pageData ? (
            <div className="flex flex-col ">
              <div className="bg-white w-full h-auto rounded-lg pb-10 container">
                <form onSubmit={handleFormSubmit}>
                  {/* top options */}
                  <div className="my-6">
                    <div className="flex justify-between">
                      <Link href="/src/pages">ویرایش کارت</Link>

                      {/* left side btns */}
                      <div className="text-sm flex items-center justify-center">
                        <span
                          onClick={goBack}
                          className="me-3 h-[31px] overflow-hidden border-[1px] border-black px-4 py-1 rounded-lg"
                        >
                          انصراف
                        </span>
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="bg-dark h-[31px] overflow-hidden text-white px-4 py-1 rounded-lg border-[1px]
                           border-black flex items-center justify-center"
                        >
                          {isSubmitting ? (
                            <LoaderOverlay />
                          ) : (
                            <span>ذخیره</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* portfolio Image */}

                  <div className="flex justify-center">
                    <div>
                      {/* Profile image display */}
                      <div
                        id="photo_here"
                        className="border-[3px] box-content border-gold w-[80px] h-[80px] rounded-full
                      overflow-hidden"
                      >
                        <ProfileImage
                          width={80}
                          height={80}
                          alt="Profile Preview"
                          src={
                            changedFormData.profile
                              ? URL.createObjectURL(changedFormData.profile)
                              : `${formData.profile}?${new Date().getTime()}`
                          }
                          className="w-[80px] h-[80px]"
                        />
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
                          name="profile"
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
                    <p className="text-lg ps-3 font-semibold mb-3">
                      راه‌های ارتباطی
                    </p>
                    <EditMenuOptions
                      label="نام کاربری"
                      name="username"
                      defaultValue={formData.username}
                      onChange={handleInputChange}
                    />
                    <EditMenuOptions
                      label="نام"
                      name="owner_first_name"
                      defaultValue={formData.owner_first_name}
                      onChange={handleInputChange}
                    />
                    <EditMenuOptions
                      label="نام خانوادگی"
                      name="owner_last_name"
                      defaultValue={formData.owner_last_name}
                      onChange={handleInputChange}
                    />
                    <EditMenuOptions
                      label="عنوان کارت"
                      name="card_title"
                      defaultValue={formData.card_title}
                      onChange={handleInputChange}
                    />
                    <EditMenuOptions
                      label="عنوان شغل"
                      name="job_title"
                      defaultValue={formData.job_title}
                      onChange={handleInputChange}
                    />
                    <EditMenuOptions
                      label="کمپانی"
                      name="company"
                      defaultValue={formData.company}
                      onChange={handleInputChange}
                    />

                    {/* bottom side booleans */}

                    {/* is_direct */}

                    {/* bio */}

                    <textarea
                      placeholder="بیو"
                      maxLength={512}
                      className="bg-lightMenu w-full border-2 rounded-lg p-3 text-sm"
                      type="text"
                      name="bio"
                      defaultValue={formData.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
                {/* <div className="my-8">
                <Devider text="ویرایش" />
              </div> */}

                {/* bottom side btns */}
                <div className="text-sm text-center w-full flex flex-col mt-5">
                  {/* <Link
                  href={`/app/contents/horz/contentHorz?id=${id}`}
                  className="border-[1px] border-black px-4 py-3 rounded-lg mb-2 flex justify-center
              items-center"
                >
                  <span className="me-1">
                    <PenEditIcon />
                  </span>
                  ویرایش آیتم ها
                </Link> */}
                  <Link
                    href={`/app/cards/items/mediaSelection?id=${id}`}
                    className="border-[1px] border-black px-4 py-3 rounded-lg mb-2 flex justify-center
              items-center"
                  >
                    <span className="me-1">
                      <PenEditIcon />
                    </span>
                    ویرایش آیتم ها
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <LoadingState />
          )}
        </Layout>
        <Footer />
      </main>
    </>
  );
};

export default EditProfileInfo;
