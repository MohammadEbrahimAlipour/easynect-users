import React, { useState } from "react";
import Link from "next/link";
import { ContactsWifiIcon } from "../Icons";
import Image from "next/image";
import ContactDetails from "./bottomSheet/ContactDetails";
import { useRouter } from "next/router";
import { useAccessToken } from "../../../context/AccessTokenContext";
import { generateApiUrl } from "../ApiUr";
import axios from "axios";
import { toast } from "react-toastify";

const ContactsCards = ({ contact }) => {
  const router = useRouter();
  const accessToken = useAccessToken();
  const [contactData, setContactData] = useState();

  const [showContactDetails, setShowContactDetails] = useState(false);

  const handleFetchDetails = () => {
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
  };

  const handleContactRedirect = async (type, username) => {
    if (type === "contact") {
      setShowContactDetails(true);
      await handleFetchDetails(contact?.data.id);
    } else {
      router.push(`${process.env.NEXT_PUBLIC_FRONTEND_SERVER}/${username}`);
    }
  };

  return (
    <>
      {contact?.data && (
        <div
          onClick={() =>
            handleContactRedirect(contact.type, contact?.data?.username)
          }
          className="bg-white w-full my-3 flex py-4 px-5 rounded-lg"
        >
          <div className="relative w-[36px] h-[36px] bg-red-400 rounded-full">
            <span className="bg-mutedDark w-full h-full box-content rounded-full flex justify-center items-center overflow-hidden me-1">
              <Image
                className="rounded-full"
                alt="icon"
                src={contact?.data.profile_s3_url}
                width={36}
                height={36}
              />
            </span>

            {/* wifi icon */}
            {contact?.type === "connection" && (
              <div
                className="bg-dark w-[16px] h-[16px] rounded-full flex justify-center
            items-center absolute -bottom-1 left-0"
              >
                <ContactsWifiIcon />
              </div>
            )}
          </div>
          {/* text */}
          <span className="ms-3">
            <p>{contact?.data.name}</p>
            <p className="text-[10px] text-muted">
              {contact.type === "contact" ? "" : contact?.data.card_title}
            </p>
          </span>
        </div>
      )}

      <ContactDetails
        showContactDetails={showContactDetails}
        setShowContactDetails={setShowContactDetails}
        contact={contact}
        contactData={contactData}
      />
    </>
  );
};

export default ContactsCards;
