import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import BottomSheetWrapper from "./bottomSheet/BottomSheetWrapper";
import { useAccessToken } from "../../context/AccessTokenContext";
import { generateApiUrl } from "./ApiUr";
import { toast } from "react-toastify";

const AccessoryConnect = ({
  showAccessory,
  setShowAccessory,
  moreSheetDetails
}) => {
  const accessToken = useAccessToken();
  const [accessCode, setAccessCode] = useState();

  const handleChange = (e) => {
    // Append the "device/" prefix to the entered code
    setAccessCode(`device/${e.target.value}`);
    console.log("code", moreSheetDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (moreSheetDetails?.id) {
      try {
        // Make a POST request to create a new user
        const apiUrl = generateApiUrl(`/api/v1/devices/${moreSheetDetails.id}`);

        const payload = {
          url: accessCode // This will be 'device/{input_value}'
        };

        const response = await axios.post(apiUrl, payload, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Content-Type": "application/json",
            "Accept-Language": "fa"
          }
        });

        if (response.status === 200) {
          // Handle success, for example, redirect to a success page
          console.log("User created successfully!");
          toast.success(response.data.detail);
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
  return (
    <BottomSheetWrapper
      open={showAccessory}
      onClose={() => setShowAccessory(false)}
    >
      <div className=" pt-5 pb-8 container !px-6">
        <form onSubmit={handleSubmit}>
          {/* top line close btn*/}
          <div className="w-full flex justify-center pb-6">
            <button
              // onClick={onClose}
              id="closeBTN"
              className="w-[36px] h-[5px] rounded-2xl opacity-25 bg-muted"
            />
          </div>
          <p className="text-lg font-medium">اتصال اکسسوری</p>
          <p className="text-muted text-sm mt-6 mb-2 text-right">
            لطفا کد اکسسوری را وارد نمایید
          </p>
          <div className={`bg-lightMenu rounded-lg  mb-3 border-2 box-border`}>
            <div className="flex justify-start items-center py-3">
              <label
                className=" border-e-2 text-muted me-2 pe-2 ps-4"
                htmlFor="data_inp"
              >
                کد
              </label>
              <input
                name="url"
                id="data_inp"
                placeholder="1234sft456"
                className="bg-lightMenu outline-0"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* button */}
          <button
            type="submit"
            className="flex items-center justify-center w-full
                  bg-dark text-white py-3 leading-0 rounded-lg mt-7"
          >
            اتصال
          </button>
        </form>
      </div>
    </BottomSheetWrapper>
  );
};

export default AccessoryConnect;
