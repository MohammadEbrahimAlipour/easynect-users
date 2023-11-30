import React from "react";
import Link from "next/link";
import { ContactsWifiIcon } from "../Icons";
import Image from "next/image";

const ContactsCards = ({ contact }) => {
  return (
    <>
      <Link href="/" className="bg-white w-full my-3 flex py-4 px-5 rounded-lg">
        <div className="relative">
          {/* <div>
            <Image
              className={`rounded-full object-contain`}
              src={contact.profile_s3_url}
              width={80}
              height={80}
              alt="Person Name"
            />
          </div> */}
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
