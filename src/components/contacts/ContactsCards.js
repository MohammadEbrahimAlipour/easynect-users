import React from "react";
import Link from "next/link";
import { ContactsWifiIcon } from "../Icons";
import Image from "next/image";

const ContactsCards = ({ contact }) => {
  console.log("contacts&&&&&&&", contact);
  return (
    <>
      <Link href="/" className="bg-white w-full my-3 flex py-4 px-5 rounded-lg">
        <div className="relative">
          <span className="bg-mutedDark rounded-full flex justify-center items-center overflow-hidden me-1">
            <Image
              className="rounded-full"
              alt="icon"
              src={contact.data.profile_s3_url}
              width={36}
              height={36}
            />
          </span>

          {/* wifi icon */}
          <div
            className="bg-dark w-[16px] h-[16px] rounded-full flex justify-center
            items-center absolute -bottom-1 left-0"
          >
            <ContactsWifiIcon />
          </div>
        </div>
        {/* text */}
        <span className="ms-3">
          <p>
            {contact.type === "contact"
              ? contact.data.name
              : contact.data.card_title}
          </p>
          <p className="text-[10px] text-muted">طراح محصول در مترا</p>
        </span>
      </Link>
    </>
  );
};

export default ContactsCards;
