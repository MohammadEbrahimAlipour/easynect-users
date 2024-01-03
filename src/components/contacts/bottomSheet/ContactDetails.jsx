import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";
import React, { useState, useEffect } from "react";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import axios from "axios";
import { generateApiUrl } from "@/components/ApiUr";
import { toast } from "react-toastify";
import Image from "next/image";
import LoadingState from "@/components/LoadingState";

const ContactDetails = ({
  showContactDetails,
  setShowContactDetails,
  contactData
}) => {
  const handleTypeDetection = (field) => {
    switch (field.field_type) {
      case "phone":
        if (field.value) window.location.href = `tel:${field.value}`;
        break;
      case "email":
        if (field.value) window.location.href = `mailto:${field.value}`;
        break;
      case "link":
        if (field.value)
          window.open(field.value, "_blank", "noopener,noreferrer");
        break;

      default:
        console.log("Unsupported field type or action");
        break;
    }
  };

  return (
    <BottomSheetWrapper
      open={showContactDetails}
      onClose={() => setShowContactDetails(false)}
    >
      {contactData ? (
        <React.Fragment>
          <div className="flex flex-col justify-center items-center mt-4">
            <div className="flex justify-center items-center">
              <div
                id="photo_here"
                className=" box-content w-[80px] h-[80px] rounded-full
                      overflow-hidden"
              >
                <Image
                  className="rounded-full object-cover w-full h-full"
                  src={contactData?.profile_s3_url}
                  alt="Preview"
                  width={80}
                  height={80}
                />
              </div>
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
                <span
                  onClick={() => handleTypeDetection(field)}
                  className={`${
                    field.field_type === "regular field" ? "" : "underline"
                  }`}
                >
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        </React.Fragment>
      ) : (
        <LoadingState />
      )}
    </BottomSheetWrapper>
  );
};

export default ContactDetails;
