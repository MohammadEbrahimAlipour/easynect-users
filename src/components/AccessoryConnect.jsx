import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import BottomSheetWrapper from "./bottomSheet/BottomSheetWrapper";
import { useAccessToken } from "../../context/AccessTokenContext";
import { generateApiUrl } from "./ApiUr";
import { toast } from "react-toastify";
import QrReader from "./accessories/QrReader";
import NFCTag from "./accessories/NFCTag";
import { motion } from "framer-motion";
import Code from "./accessories/Code";

const AccessoryConnect = ({
  showAccessory,
  setShowAccessory,
  moreSheetDetails
}) => {
  const accessToken = useAccessToken();
  const [accessCode, setAccessCode] = useState();
  const [useNfc, setUseNfc] = useState(false);
  const [useCamera, setUseCamera] = useState(true);
  const [useCode, setUseCode] = useState(false);

  const [showCamera, setShowCamera] = useState(false);

  // camera result
  const [result, setResult] = useState(null);

  // Define the animation keyframes and settings
  const blinkAnimation = {
    blink: {
      opacity: [1, 0.1, 1],
      transition: { repeat: Infinity, repeatType: "mirror", duration: 3 }
    }
  };

  const handleCodeSubmit = async (e) => {
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

  // camera
  // Function to submit the form
  const handleCameraSubmit = (event) => {
    event.preventDefault();
    const url = new URL(result);

    const username = url.pathname?.substring(1);

    console.log(username);

    if (moreSheetDetails?.id) {
      // Make an Axios POST request to update product data based on product_id
      const apiUrl = generateApiUrl(`/api/v1/devices/${moreSheetDetails.id}`);
      axios
        .post(
          apiUrl,
          { url: username },
          {
            headers: {
              Authorization: `Bearer ${accessToken.accessToken}`,
              "Accept-Language": "fa",
              "Content-Type": "application/json"
            }
          }
        )
        .then((response) => {
          // Handle the response as needed (e.g., show a success message)
          console.log("Product data updated successfully.");
          toast.success(response.data.detail);
          setShowAccessory(false);
        })
        .catch((error) => {
          setShowAccessory(false);
          console.error("Error updating product data:", error);
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
  };

  return (
    <BottomSheetWrapper
      open={showAccessory}
      onClose={() => setShowAccessory(false)}
    >
      <div className=" pt-5 pb-8 container !px-6">
        {/* top line close line*/}
        <div className="w-full flex justify-center pb-4">
          <span className="w-[36px] h-[5px] rounded-2xl opacity-25 bg-muted" />
        </div>

        {/* head */}
        <h3 className="text-lg font-medium">اتصال اکسسوری</h3>

        {/* choices */}
        <div className="flex justify-between items-center my-4">
          <button
            onClick={() => {
              setUseCode(false);
              setUseCamera(false);
              setUseNfc(true);
            }}
            className={`border border-dark px-3 py-[2px] rounded-md text-sm ${
              useNfc ? "bg-dark text-white" : ""
            }`}
          >
            nfc
          </button>

          <button
            onClick={() => {
              setUseCode(false);
              setUseNfc(false);
              setUseCamera(true);
            }}
            className={`border border-dark px-3 py-[2px] rounded-md text-sm  ${
              useCamera ? "bg-dark text-white" : ""
            }`}
          >
            دوربین
          </button>
          <button
            onClick={() => {
              setUseCamera(false);
              setUseNfc(false);
              setUseCode(true);
            }}
            className={`border border-dark px-3 py-[2px] rounded-md text-sm ${
              useCode ? "bg-dark text-white" : ""
            }`}
          >
            کد
          </button>
        </div>

        {/* byCamera */}
        {useCamera && (
          <form onSubmit={handleCameraSubmit}>
            <div className="flex justify-center items-center mt-6">
              {/* main square */}
              {!showCamera ? (
                <div
                  onClick={() => setShowCamera(true)}
                  className="flex justify-center items-center border-2 border-dark w-[140px] h-[140px] rounded-lg "
                >
                  {/* middle circle */}
                  <motion.div
                    variants={blinkAnimation}
                    animate="blink"
                    className="bg-dark w-[66px] h-[66px] rounded-full "
                  />
                </div>
              ) : (
                <QrReader result={result} setResult={setResult} />
              )}
            </div>
            {/* button */}
            {result && (
              <button
                type="submit"
                className="flex items-center justify-center w-full
      bg-dark text-white py-3 leading-0 rounded-lg mt-7"
              >
                اتصال
              </button>
            )}
          </form>
        )}

        {useNfc && (
          <form onSubmit={handleCameraSubmit}>
            <NFCTag result={result} setResult={setResult} />

            {/* button */}
            <button
              type="submit"
              className="flex items-center justify-center w-full
                  bg-dark text-white py-3 leading-0 rounded-lg mt-7"
            >
              اتصال
            </button>
          </form>
        )}

        {useCode && (
          <form onSubmit={handleCodeSubmit}>
            <Code setAccessCode={setAccessCode} />

            <button
              type="submit"
              className="flex items-center justify-center w-full
                  bg-dark text-white py-3 leading-0 rounded-lg mt-7"
            >
              اتصال
            </button>
          </form>
        )}

        {/* by camera */}
      </div>
    </BottomSheetWrapper>
  );
};

export default AccessoryConnect;
