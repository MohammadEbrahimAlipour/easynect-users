import ContactsCards from "@/components/contacts/ContactsCards";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  ContactsFilterIcon,
  ContactsImportIcon,
  SearchIcon
} from "@/components/Icons";
import Layout from "@/components/Layout";
import React, { useEffect, useState, useCallback } from "react";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import LoadingState from "@/components/LoadingState";
import InfiniteScroll from "react-infinite-scroll-component";
import ExelBottomSheet from "@/components/contacts/bottomSheet/ExelBottomSheet";
import ContactFilters from "@/components/contacts/bottomSheet/ContactFilters";
import _debounce from "lodash/debounce";
import _ from "lodash";
import { API_ROUTES } from "@/services/api";
import axiosInstance from "@/services/axiosInterceptors";
import Head from "next/head";

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
  const [limit, setLimit] = useState(4);
  const [hasMore, setHasMore] = useState(true);
  // Initialize selectedPage with the first page from pageData
  const [selectedPage, setSelectedPage] = useState(pageData[0] || null);
  const [showExelSheet, setShowExelSheet] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [showContactFilters, setShowContactFilters] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [noMoreContacts, setNoMoreContacts] = useState(null);

  const debouncedApiCall = useCallback(
    _.debounce((searchQuery) => {
      // Call the API with the search query
      getAllContactsAsync({
        pageID,
        skip,
        limit,
        fromDate,
        toDate,
        searchQuery
      });
    }, 500),
    [pageID, fromDate, toDate]
  );

  const getAllContactsAsync = ({
    pageID,
    skip,
    limit,
    fromDate,
    toDate,
    searchQuery
  }) => {
    if (pageID) {
      const apiUrl = API_ROUTES.CONTACTS_UNIFIED(pageID, skip, limit);

      const params = {
        from_date: fromDate,
        to_date: toDate,
        search: searchQuery
      };

      axiosInstance
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Accept-Language": "fa"
          },
          suppress404Toast: true,
          params: params
        })
        .then((response) => {
          setContacts(response.data);
        })
        .catch((error) => {
          //  catch here
        });
    }
  };

  useEffect(() => {
    debouncedApiCall(searchQuery);
  }, [debouncedApiCall, searchQuery]);

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
    const apiUrl = API_ROUTES.CONTACTS_PAGES;

    // Make an Axios GET request to fetch user data
    axiosInstance
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
        // error here
      });
  }, [accessToken.accessToken, selectedPage]);

  const loadMoreContacts = () => {
    if (pageID && hasMore) {
      let apiUrl;

      if (fromDate !== null) {
        // setSkip(0);
        // setLimit(6);
        apiUrl = generateApiUrl(
          `/api/v1/contacts/page/unified/${pageID}?skip=${skip}&limit=${limit}&from_date=${fromDate}&to_date=${toDate}`
        );
      } else {
        apiUrl = generateApiUrl(
          `/api/v1/contacts/page/unified/${pageID}?skip=${skip}&limit=${limit}`
        );
      }

      // Make an Axios GET request to fetch more contacts
      axiosInstance
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Accept-Language": "fa"
          },
          suppress404Toast: true
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
          // catch here

          // Handle the error here
          if (error.response && error.response.status === 404) {
            // Set setNoMoreContacts to true if the response status is 404
            setNoMoreContacts(true);
            // setHasMore(false);
          }
        });
    }
  };

  useEffect(() => {
    setSkip(0); // Reset skip when pageID changes
    setHasMore(true); // Reset hasMore when pageID changes
    setContacts([]); // Clear existing contacts when pageID changes
  }, [pageID]);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedApiCall(value);
  };

  return (
    <>
      <Head>
        <title>ایزی‌نکت - مخاطبین</title>
        <meta name="easynect business card" content="Powered by Easynect" />
      </Head>
      {pageData ? (
        <>
          <Header />
          <Layout>
            {/* top tags */}
            <div className="grid grid-cols-12 items-center justify-center">
              <div className=" col-span-8">
                <div className="grid grid-cols-12">
                  {/* chose page */}

                  <div className="col-span-4 flex justify-center items-center relative">
                    {/* <span className="truncate">{page.card_title}</span> */}

                    <button
                      onClick={() => handleToggleOptions()}
                      className="inline-flex w-full justify-start items-center gap-x-1 
                        text-sm  font-medium shadow-sm
                        font-ravi truncate
                        border rounded-lg p-1 h-full border-black me-1 bg-dark text-white"
                    >
                      {selectedPage ? selectedPage.card_title : "انتخاب"}
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
                      className="bg-light ms-2 px-3 w-full outline-none"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                    />
                  </div>
                </div>
              </div>
              {/* tag1 */}
              <span
                onClick={() => setShowContactFilters(true)}
                className="col-span-2 border-[1px] border-dark p-[12px] rounded-lg mx-1 font-ravi"
              >
                <ContactsFilterIcon />
              </span>
              {/* tag2 */}
              <span
                onClick={() => setShowExelSheet(true)}
                className="col-span-2 border-[1px] border-dark p-[12px] rounded-lg flex justify-center items-center"
              >
                <ContactsImportIcon />
              </span>
            </div>
            {/* button */}
            {/* <Link
              href="/src/pages/confrimEmailCode"
              className=" flex items-center justify-center w-full
                  bg-dark text-white py-3 leading-0 rounded-lg mt-4"
            >
              افزودن مخاطب
            </Link> */}
            {/* cards */}
            {contacts.length === 0 ? (
              <span
                className="flex justify-center items-center mt-[130px] bg-muted py-4 
              opacity-40 rounded-md overflow-hidden"
              >
                هیچ مخاطبی یافت نشد
              </span>
            ) : (
              <div className="max-h-full px-2 overflow-hidden">
                <InfiniteScroll
                  dataLength={contacts.length}
                  // dataLength={10}
                  next={loadMoreContacts}
                  hasMore={hasMore}
                  loader={noMoreContacts ? null : <LoadingState />}
                >
                  {contacts.map((contact) => (
                    <ContactsCards contact={contact} key={contact.guid} />
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

      <ExelBottomSheet
        showExelSheet={showExelSheet}
        setShowExelSheet={setShowExelSheet}
        pageID={pageID}
      />

      <ContactFilters
        showContactFilters={showContactFilters}
        setShowContactFilters={setShowContactFilters}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
    </>
  );
};

export default Contacts;
