import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { useRouter } from "next/router";
import { API_ROUTES } from "@/services/api";
import Head from "next/head";
import axiosInstance from "@/services/axiosInterceptors";

// components
import Layout from "@/components/Layout";
import { generateApiUrl } from "@/components/ApiUr";
import LoadingState from "@/components/LoadingState";
import ProfileImage from "@/components/ProfileImage";
import { ChangePhotoIcon, PenEditIcon } from "@/components/Icons";
import EditMenuOptions from "@/components/EditMenuOptions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import EditProfileInfoRedirectForm from "@/components/EditProfileInfoRedirectForm";
import UploadInput from "@/components/UploadInput";
import EditProfileInfoLanguage from "@/components/EditProfileInfoLanguage";
import CropImageBottomSheet from "@/components/CropImageBottomSheet";
import { imageUrlToBlob, readFile } from "@/utils/file";

const EditProfileInfo = () => {
  const [pageData, setPageData] = useState(null);
  const accessToken = useAccessToken();
  const router = useRouter();
  const { id } = router.query;
  const [changedFormData, setChangedFormData] = useState({});
  const apiUrl = API_ROUTES.CARDS_EDIT_PROFILE_INFO_PAGES(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [isCropBottomSheetOpen, setIsCropBottomSheetOpen] = useState(false);
  const [cropOptions, setCropOptions] = useState({
    cropShape: "rect",
    showGrid: true,
    aspect: 4 / 3,
    name: null,
  });

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
    profile: "",
    direct_link: null,
    final_page_language: null,
  });
  const [isDirect, setIsDirect] = useState(formData.is_direct);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(null);

  // Fetch data from the server when the component mounts
  useEffect(() => {
    if (id) {
      axios
        .get(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.accessToken}`,
            "accept-language": "fa",
          },
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
            profile: response.data.profile_s3_url || "",
            direct_link: response.data.direct_link,
            final_page_language: response.data.final_page_lan,
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
      [name]: value,
    }));
  };

  const handleLanguageChange = (language) => {
    setChangedFormData((prevFormData) => ({
      ...prevFormData,
      final_page_language: language,
    }));
  };

  // Handle image file change
  const handleImageChange = async (selectedFile, options) => {
    if (selectedFile) {
      let imageDataUrl = await readFile(selectedFile);

      setImageToCrop(imageDataUrl);
      setIsCropBottomSheetOpen(true);
      setCropOptions(options);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

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

    setIsLoading(true);
    // Send a PATCH request with the FormData and headers using Axios
    axiosInstance
      .patch(updateUrl, formDataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "accept-language": "fa",
        },
        onUploadProgress: (progressEvent) => {
          if (changedFormData["banner"] === null) return;

          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);

          setUploadPercentage(percentCompleted);
        },
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
      })
      .finally(() => {
        setUploadPercentage(null);
        setIsLoading(false);
      });
  };

  const goBack = () => {
    if (isLoading) return;

    router.back();
  };

  const handleCloseCropBottomSheet = () => {
    setIsCropBottomSheetOpen(false);
    setImageToCrop(null);
  };

  const handleCropFinished = async (croppedImage) => {
    const image = await imageUrlToBlob(croppedImage);

    setIsCropBottomSheetOpen(false);
    setImageToCrop(null);
    setChangedFormData((prevData) => ({
      ...prevData,
      [cropOptions.name]: image,
    }));
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
                          {isLoading ? "در حال ارسال..." : "ذخیره"}
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
                          onChange={(e) =>
                            handleImageChange(e.target.files[0], {
                              cropShape: "round",
                              aspect: 1,
                              showGrid: false,
                              name: "profile",
                            })
                          }
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

                    <UploadInput
                      labelText={"فایل بنر"}
                      className="mb-4"
                      onChoose={(file) =>
                        handleImageChange(file, {
                          cropShape: "rect",
                          aspect: 3 / 1,
                          showGrid: true,
                          name: "banner",
                        })
                      }
                      uploadPercentage={uploadPercentage}
                    />

                    <EditProfileInfoRedirectForm
                      data={formData.direct_link}
                      pageID={id}
                    />

                    <EditProfileInfoLanguage
                      currentLanguage={formData.final_page_language}
                      onSelect={handleLanguageChange}
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
                  <Link
                    href={`/layout/${id}`}
                    className="border-[1px] border-black px-4 py-3 rounded-lg mb-2 flex justify-center
              items-center"
                  >
                    <span className="me-1">
                      <PenEditIcon />
                    </span>
                    صفحه بندی
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <LoadingState />
          )}
        </Layout>
        <Footer />

        <CropImageBottomSheet
          image={imageToCrop}
          open={isCropBottomSheetOpen}
          onClose={handleCloseCropBottomSheet}
          onCrop={handleCropFinished}
          cropShape={cropOptions.cropShape}
          showGrid={cropOptions.showGrid}
          aspect={cropOptions.aspect}
        />
      </main>
    </>
  );
};

export default EditProfileInfo;
