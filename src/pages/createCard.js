import Devider from "@/components/Devider";
import EditMenuOptions from "@/components/EditMenuOptions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PenEditIcon, PlusSign } from "@/components/Icons";
import Layout from "@/components/Layout";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import Link from "next/link";
import { generateApiUrl } from "@/components/ApiUr";
import React, { useState } from "react";
import { useAccessToken } from "../../context/AccessTokenContext";
import axios from "axios";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useRouter } from "next/router";
import ProfileImage from "@/components/ProfileImage";

const CreateCard = () => {
  const { accessToken } = useAccessToken();
  const router = useRouter();
  // const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    owner_first_name: "",
    owner_last_name: "",
    card_title: "",
    job_title: "",
    company: "",
    is_direct: false
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // the API endpoint URL
    const apiUrl = generateApiUrl("/api/v1/pages/");

    // headers object with the necessary headers, including the access token
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "accept-language": "fa"
    };

    // Send a POST request with the form data and headers using Axios
    axios
      .post(apiUrl, formData, { headers })
      .then((response) => {
        if (response.status === 200) {
          router.push("/profileCard");
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
                  <Link href="/">کارت جدید</Link>

                  {/* left side btns */}
                  <div className="text-sm">
                    <button className="me-2 border-[1px] border-black px-4 py-1 rounded-lg">
                      انصراف
                    </button>
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
              <ProfileImage />

              {/* contact options */}

              <div>
                <p className="text-lg ps-3 font-semibold mb-3">اطلاعات کارت</p>
                <EditMenuOptions
                  label="نام‌کاربری"
                  placeholder="حروف کوچک، اعداد، _"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <EditMenuOptions
                  label="نام"
                  name="owner_first_name"
                  value={formData.owner_first_name}
                  onChange={handleInputChange}
                />
                <EditMenuOptions
                  label="نام خوانوادگی"
                  name="owner_last_name"
                  value={formData.owner_last_name}
                  onChange={handleInputChange}
                />
                <EditMenuOptions
                  label="اسم کارت"
                  name="card_title"
                  value={formData.card_title}
                  onChange={handleInputChange}
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

              <div className="my-8">
                <Devider text="انتخواب نوع منو" />
              </div>

              {/* bottom side booleans */}
              <div
                className="w-full bg-lightMenu border-2 py-3 flex justify-between
              items-center px-3 rounded-lg"
              >
                <p className="font-medium">لینک مستقیم</p>
                <ToggleSwitch
                  id="isDirect" // Replace with a unique ID
                  isChecked={formData.is_direct} // Use the value of is_direct from your formData
                  toggleSwitch={() => {
                    // Define a function to toggle the switch and update the formData
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      is_direct: !prevFormData.is_direct // Toggle the value
                    }));
                  }}
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
