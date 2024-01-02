import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PlusSignLight, TickSuccess, Tickicon } from "@/components/Icons";
import HeaderTwo from "@/components/HeaderTwo";
import axios from "axios"; // Import Axios for making HTTP requests
import { useAccessToken } from "../../../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import { useRouter } from "next/router";

const ProfileInfo = () => {
  const accessToken = useAccessToken();
  const apiUrlInfo = generateApiUrl("/api/v1/users/");
  const router = useRouter();

  // Fetch users data and set it to usersInitialData
  const [usersInitialData, setUsersInitialData] = useState({
    first_name: "",
    last_name: "",
    phone_number: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(apiUrlInfo, {
          headers: {
            "accept-language": "fa", // Customize as needed
            Authorization: `Bearer ${accessToken.accessToken}`
          }
        });

        if (response.status === 200) {
          // Set usersInitialData with the fetched data
          setUsersInitialData(response.data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      }
    };

    fetchUserData();
  }, [accessToken.accessToken, apiUrlInfo]);

  // Change users data
  const apiUrl = generateApiUrl("/api/v1/users/update_info/");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: ""
  });

  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  useEffect(() => {
    // When usersInitialData is available, set formData with initial values
    if (usersInitialData) {
      setFormData({
        first_name: usersInitialData.first_name || "",
        last_name: usersInitialData.last_name || "",
        phone_number: usersInitialData.phone_number || ""
      });
    }
  }, [usersInitialData]);

  const handlePhoneNumberInputChange = (event) => {
    const inputValue = event.target.value;
    setIsPhoneNumberValid(/^\d{11}$/.test(inputValue));
    setFormData({ ...formData, phone_number: inputValue });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
          "accept-language": "fa",
          Authorization: `Bearer ${accessToken.accessToken}`
        }
      });

      if (response.status === 200) {
        console.log("User information updated successfully");
        router.push("/app/profile/profile");
      } else {
        console.error("User information update failed");
      }
    } catch (error) {
      console.error("An error occurred during the update:", error);
    }
  };

  return (
    <>
      <HeaderTwo />
      <Layout>
        <div>
          <p className="text-lg ps-3 font-semibold mb-3">اطلاعات کاربری</p>
          {usersInitialData ? (
            <form onSubmit={handleFormSubmit}>
              {/* user Name */}
              <div className="bg-lightMenu rounded-lg  mb-3 border-2 box-border">
                <div className="flex justify-start items-center py-3">
                  <label
                    className="font-medium text-sm border-e-2 text-muted me-2 pe-2 ps-4"
                    htmlFor="name_inp"
                  >
                    نام
                  </label>
                  <input
                    required={true}
                    type="text"
                    id="name_inp"
                    placeholder="نام"
                    className="bg-lightMenu outline-0 font-medium "
                    name="first_name"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* user Last Name */}
              <div className="bg-lightMenu rounded-lg  mb-3 border-2 box-border">
                <div className="flex justify-start items-center py-3">
                  <label
                    className="font-medium text-sm border-e-2 text-muted me-2 pe-2 ps-4"
                    htmlFor="last_name_inp"
                  >
                    فامیل
                  </label>
                  <input
                    required={true}
                    id="last_name_inp"
                    placeholder="نام خانوادگی"
                    className="bg-lightMenu outline-0 font-medium "
                    name="last_name"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* phone_number */}
              <div
                className="bg-lightMenu rounded-lg  mb-3 border-2 box-border flex justify-between
              items-center"
              >
                <div className="flex justify-start items-center  py-3">
                  <label
                    className="font-medium text-sm border-e-2 text-muted me-2 pe-2 ps-4"
                    htmlFor="phone_number_inp"
                  >
                    شماره موبایل
                  </label>
                  <input
                    required={true}
                    id="phone_number_inp"
                    type="text"
                    placeholder="09121234567"
                    className="bg-lightMenu outline-0 font-medium "
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handlePhoneNumberInputChange}
                  />
                </div>
              </div>

              {/* button */}
              <button
                type="submit"
                className="flex items-center justify-center w-full
                    bg-dark text-white py-3 leading-0 rounded-lg mt-7"
              >
                ذخیره تغییرات
              </button>
            </form>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default ProfileInfo;
