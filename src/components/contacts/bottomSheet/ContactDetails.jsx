import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";
import React, { useState, useEffect } from "react";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import axios from "axios";
import { generateApiUrl } from "@/components/ApiUr";
import { toast } from "react-toastify";
import Image from "next/image";

const ContactDetails = ({
  showContactDetails,
  setShowContactDetails,
  contact
}) => {
  const accessToken = useAccessToken();

  const [contactData, setContactData] = useState();

  console.log("id", contact?.data?.id);
  console.log("contactData", contactData);
  // to fetch the data
  useEffect(() => {
    if (contact?.data.id) {
      // Make an Axios GET request to fetch user data based on user_id
      const apiUrl = generateApiUrl(`/api/v1/contacts/${contact?.data.id}`);
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Accept-Language": "fa"
            // "Content-Type": "application/json"
          }
        })
        .then((response) => {
          // Handle the data once it's received
          setContactData(response.data);
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
  }, [contact?.data?.id, accessToken.accessToken]);

  return (
    <BottomSheetWrapper
      open={showContactDetails}
      onClose={() => setShowContactDetails(false)}
    >
      <div className="flex flex-col justify-center items-center mt-4">
        <div className="flex justify-center items-center">
          <div
            id="photo_here"
            className=" box-content w-[80px] h-[80px] rounded-full
                      overflow-hidden"
          >
            {/* Display the image preview */}

            <Image
              className="rounded-full object-cover w-full h-full"
              src={contactData?.profile_s3_url}
              alt="Preview"
              width={80}
              height={80}
            />
          </div>
          {/* Upload button */}
        </div>

        <h3 className="font-semibold mt-1">{contactData?.name}</h3>
      </div>

      {/* details */}
      <div className="bg-light w-full px-4 rounded-lg mt-4 pt-4 pb-1 mb-2">
        {contactData?.fields.map((field) => (
          <div
            key={field.id}
            className="bg-white rounded-md py-1 px-3 shadow-sm mb-4"
          >
            <p className="font-semibold">{field.title}</p>
            <p className="underline">{field.value}</p>
          </div>
        ))}
      </div>
    </BottomSheetWrapper>
  );
};

export default ContactDetails;
