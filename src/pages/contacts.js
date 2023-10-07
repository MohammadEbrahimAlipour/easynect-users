import ContactsCards from "@/components/ContactsCards";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  ContactsFilterIcon,
  ContactsImportIcon,
  ContactsWifiIcon,
  SearchIcon
} from "@/components/Icons";
import Layout from "@/components/Layout";
import ProfileImage from "@/components/ProfileImage";
import Link from "next/link";
import React from "react";

const contacts = () => {
  return (
    <>
      <Header />
      <Layout>
        {/* top tags */}
        <div className="flex items-center justify-center">
          {/* search bar */}
          <div
            className="flex justify-center items-center border-[1px] border-dark rounded-lg
          py-3 "
          >
            <span className="ms-5">
              <SearchIcon />
            </span>
            <input
              type="search"
              placeholder="جستجو"
              className="bg-light ms-2 px-3"
            />
          </div>
          {/* tag1 */}
          <Link
            href="/"
            className="border-[1px] border-dark p-[14px] rounded-lg mx-1"
          >
            <ContactsFilterIcon />
          </Link>
          {/* tag2 */}
          <Link
            href="/"
            className="border-[1px] border-dark p-[14px] rounded-lg"
          >
            <ContactsImportIcon />
          </Link>
        </div>
        {/* button */}
        <Link
          href="/confrimEmailCode"
          className="flex items-center justify-center w-full
                  bg-dark text-white py-3 leading-0 rounded-lg mt-4"
        >
          افزودن مخاطب
        </Link>

        {/* cards */}
        <ContactsCards />
        <ContactsCards />
        <ContactsCards />
      </Layout>
      <Footer />
    </>
  );
};

export default contacts;
