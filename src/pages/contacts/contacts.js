import ContactsCards from "@/components/contacts/ContactsCards";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  ArrowDownIcon,
  ContactsFilterIcon,
  ContactsImportIcon,
  ContactsWifiIcon,
  SearchIcon
} from "@/components/Icons";
import Layout from "@/components/Layout";
import ProfileImage from "@/components/ProfileImage";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAccessToken } from "../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import LoadingState from "@/components/LoadingState";

const Contacts = () => {
  const accessToken = useAccessToken();
  const [pageData, setPageData] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [pageID, setPageId] = useState(null);
  const [contacts, setContacts] = useState([]);

  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("default");
  const [selectedPage, setSelectedPage] = useState(null);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (value) => {
    const selectedPage = pageData.find((page) => page.id === value);

    if (selectedPage) {
      setSelectedPage(selectedPage);
      setPageId(value); // Set pageID to the selected option
    }

    setSelectedOption("default"); // Reset selectedOption when a new page is selected
    setShowOptions(false);
  };

  useEffect(() => {
    const apiUrl = generateApiUrl(`/api/v1/contacts/pages/`);

    // Make an Axios GET request to fetch user data
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`, // Add your access token here
          "Accept-Language": "fa" // Language header
        }
      })
      .then((response) => {
        // Handle the data once it's received
        setPageData(response.data);
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
  }, [accessToken.accessToken]);

  useEffect(() => {
    const apiUrl = generateApiUrl(`/api/v1/contacts/page/unified/${pageID}`);

    if (pageID) {
      // Make an Axios GET request to fetch user data
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`, // Add your access token here
            "Accept-Language": "fa" // Language header
          }
        })
        .then((response) => {
          // Handle the data once it's received
          setContacts(response.data);
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
  }, [accessToken.accessToken, pageID]);

  console.log("page id", pageID);
  console.log("contacts", contacts);

  console.log("pageData", pageData);

  return (
    <>
      {pageData ? (
        <>
          <Header />
          <Layout>
            {/* top tags */}
            <div className="grid grid-cols-12  items-center justify-center">
              <div className=" col-span-8">
                <div className="grid grid-cols-12">
                  {/* chose page */}

                  <div className="col-span-4 flex justify-center items-center relative">
                    {/* <span className="truncate">{page.card_title}</span> */}

                    {/* <div className=""> */}
                    <button
                      onClick={handleToggleOptions}
                      className="inline-flex w-full justify-center items-center gap-x-1
                        text-sm  font-medium shadow-sm
                        font-ravi truncate
                        border rounded-lg p-1 h-full border-black me-1 bg-dark text-white"
                    >
                      {selectedPage ? selectedPage.card_title : "Select"}
                    </button>

                    {showOptions && (
                      <div className="absolute -right-[0px] -bottom-[110px] z-10 mt-2 w-[100px] h-[100px] origin-top-right rounded-md bg-white shadow-lg">
                        <div className="" role="none">
                          {pageData.map((page) => (
                            <button
                              key={page.id}
                              onClick={() => handleOptionClick(page.id)}
                              className="block px-4 py-2 text-xs w-full border-b-[1px]
                              text-dark "
                              role="menuitem"
                            >
                              {page.card_title}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* </div> */}
                  </div>

                  {/* wide */}
                  <div
                    className="flex justify-start items-center border-[1px] border-dark rounded-lg
          py-[12px] col-span-8"
                  >
                    <span className="ms-5">
                      <SearchIcon />
                    </span>
                    <input
                      type="search"
                      placeholder=""
                      className="bg-light ms-2 px-3 w-1"
                    />
                  </div>
                </div>
              </div>
              {/* tag1 */}
              <Link
                href="/"
                className="col-span-2 border-[1px] border-dark p-[12px] rounded-lg mx-1"
              >
                <ContactsFilterIcon />
              </Link>
              {/* tag2 */}
              <Link
                href="/"
                className="col-span-2 border-[1px] border-dark p-[12px] rounded-lg flex justify-center items-center"
              >
                <ContactsImportIcon />
              </Link>
            </div>
            {/* button */}
            <Link
              href="/confrimEmailCode"
              className=" flex items-center justify-center w-full
                  bg-dark text-white py-3 leading-0 rounded-lg mt-4"
            >
              افزودن مخاطب
            </Link>
            {/* cards */}
            {contacts.map((contact) => (
              <ContactsCards contact={contact} key={contact.id} />
            ))}
          </Layout>
          <Footer />
        </>
      ) : (
        <LoadingState />
      )}
    </>
  );
};

export default Contacts;
