import ContactsCards from "@/components/contacts/ContactsCards";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  ContactsFilterIcon,
  ContactsImportIcon,
  SearchIcon
} from "@/components/Icons";
import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import LoadingState from "@/components/LoadingState";
import InfiniteScroll from "react-infinite-scroll-component";
import BottomSheet from "@/components/BottomSheet";

const Contacts = () => {
  const accessToken = useAccessToken();
  const [pageData, setPageData] = useState([]);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [pageID, setPageId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("default");
  // const [selectedPage, setSelectedPage] = useState(null);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6);
  const [hasMore, setHasMore] = useState(true);

  // Initialize selectedPage with the first page from pageData
  const [selectedPage, setSelectedPage] = useState(pageData[0] || null);

  const [showOption, setShowOption] = useState(false);
  const toggleShowOption = () => {
    setShowOption(!showOption);
  };
  // Add a function to handle a click on a menu item and set the selected option
  const handleMenuItemClick = (newOption) => {
    setSelectedOption(newOption);
    toggleShowOption(); // Close the menu
  };

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
    console.log("Toggle options clicked");
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

        // Set selectedPage to the first page in pageData if it's not already set
        if (!selectedPage && response.data.length > 0) {
          setSelectedPage(response.data[0]);
          setPageId(response.data[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // Check if the error response is 404 (Not Found)
        if (error.response && error.response.status === 404) {
          // Handle the case where no cards are found
          // setPageData([]); // Set an empty array to trigger the "no cards" message
        } else if (
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
  }, [accessToken.accessToken, selectedPage]);

  useEffect(() => {
    const apiUrl = generateApiUrl(
      `/api/v1/contacts/page/unified/${pageID}/?skip=${skip}&limit=${limit}`
    );

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
          console.error("Error fetching contacts data:", error);
          // Check if the error response is 404 (Not Found)
          if (error.response && error.response.status === 404) {
            // Handle the case where no contacts are found
            setContacts([]); // Set an empty array to trigger the "no contacts" message
          } else if (
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
  }, [accessToken.accessToken, pageID, limit, skip]);

  const loadMoreContacts = () => {
    if (pageID && hasMore) {
      const apiUrl = generateApiUrl(
        `/api/v1/contacts/page/unified/${pageID}/?skip=${skip}&limit=${limit}`
      );

      // Make an Axios GET request to fetch more contacts
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Accept-Language": "fa"
          }
        })
        .then((response) => {
          // Handle the data once it's received
          const newContacts = response.data;

          // Check if there are more contacts
          if (newContacts.length > 0) {
            setContacts((prevContacts) => [...prevContacts, ...newContacts]);
            setSkip((prevSkip) => prevSkip + limit);
          } else {
            setHasMore(false); // No more contacts to load
          }
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
            toast.error("Error: An error occurred.");
          }
        });
    }
  };

  useEffect(() => {
    setSkip(0); // Reset skip when pageID changes
    setHasMore(true); // Reset hasMore when pageID changes
    setContacts([]); // Clear existing contacts when pageID changes
  }, [pageID]);

  console.log("contacts", contacts);

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
                      onClick={() => handleToggleOptions()}
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
              <button className="col-span-2 border-[1px] border-dark p-[12px] rounded-lg mx-1 font-ravi">
                <ContactsFilterIcon />
              </button>
              {/* tag2 */}
              <Link
                href="/src/pages"
                className="col-span-2 border-[1px] border-dark p-[12px] rounded-lg flex justify-center items-center"
              >
                <ContactsImportIcon />
              </Link>
            </div>
            {/* button */}
            <Link
              href="/src/pages/confrimEmailCode"
              className=" flex items-center justify-center w-full
                  bg-dark text-white py-3 leading-0 rounded-lg mt-4"
            >
              افزودن مخاطب
            </Link>
            {/* cards */}
            {contacts.length === 0 ? (
              <span
                className="flex justify-center items-center mt-[130px] bg-muted py-4 
              opacity-40 rounded-md overflow-hidden"
              >
                No contacts for this card
              </span>
            ) : (
              <div
              // className="max-h-[60px]"
              >
                <InfiniteScroll
                  dataLength={contacts.length}
                  // dataLength={30}
                  next={loadMoreContacts}
                  hasMore={hasMore}
                  loader={<LoadingState />}
                >
                  {contacts.map((contact) => (
                    <ContactsCards contact={contact} key={contact.id} />
                  ))}
                </InfiniteScroll>
              </div>
            )}
          </Layout>
          <Footer />
        </>
      ) : (
        <LoadingState />
      )}

      {/* sub menu */}
      <BottomSheet
        showSubMenu={showSubMenu}
        handleSubMenuClose={() => {
          setShowSubMenu(false);
        }}
        childeren={<>test</>}
      />
    </>
  );
};

export default Contacts;
