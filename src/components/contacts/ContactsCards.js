import React, { useState } from "react";
import Link from "next/link";
import { ContactsWifiIcon } from "../Icons";
import Image from "next/image";
import ContactDetails from "./bottomSheet/ContactDetails";
import { useRouter } from "next/router";

const ContactsCards = ({ contact }) => {
  const router = useRouter();
  const [showContactDetails, setShowContactDetails] = useState(false);

  const handleContactRedirect = (type, username) => {
    if (type === "contact") {
      setShowContactDetails(true);
    } else {
      router.push(`http://localhost:3000/${username}`);
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
          <div className="relative">
            <span className="bg-mutedDark rounded-full flex justify-center items-center overflow-hidden me-1">
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
      />
    </>
  );
};

export default ContactsCards;
