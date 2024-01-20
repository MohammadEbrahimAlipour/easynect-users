import React, { useState, useEffect, Fragment, useRef } from "react";
import axios from "axios";
import ProfileImage from "@/components/ProfileImage";
import ClientPageFooter from "@/components/ClientPageFooter";
import Layout from "@/components/Layout";
import { useAccessToken } from "../../../context/AccessTokenContext";
import { toast } from "react-toastify";
import {
  ArrowDownIcon,
  ArrowRight,
  InfoIcon,
  InfoIconSmall
} from "@/components/Icons";
import SquareDataExists from "@/components/infoPage/exists/SquareDataExists";
import EmptySquareBox from "@/components/infoPage/empty/EmptySquareBox";
import EmptyItemsAddBox from "@/components/infoPage/empty/EmptyItemsAddBox";
import { generateApiUrl } from "@/components/ApiUr";
import LoadingState from "@/components/LoadingState";
import EmptyRectangle from "@/components/infoPage/empty/EmptyRectangle";
import NoData from "@/components/pageView/NoData";
import NoCardExist from "@/components/infoPage/NoCardExist";
import { useRouter } from "next/router";
import axiosInstance from "@/services/axiosInterceptors";
import { API_ROUTES } from "@/services/api";
import Head from "next/head";
import Link from "next/link";

const InfoPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOptions, setShoOptions] = useState(false);
  const [pagesData, setPagesData] = useState(null);
  const [pageViewData, setPageViewData] = useState(null);
  const accessToken = useAccessToken();
  const [listItems, setListItems] = useState();

  // patch functions
  const [extractedData, setExtractedData] = useState([]);
  const [updatedExtractedData, setUpdatedExtractedData] = useState([]);
  const [syncedExtractedData, setSyncExtractedData] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [noData, setNoData] = useState(null);
  const [localItemsSelected, setLocalItemsSelected] = useState([]);
  const router = useRouter();
  const [noCard, setNoCard] = useState(null);
  const [showBio, setShowBio] = useState(false);

  const goBack = () => {
    router.back();
  };

  const getJobTitle = () => {
    if (pageViewData.job_title !== null && pageViewData.company === null) {
      return `${pageViewData.job_title}`;
    } else if (
      pageViewData.company !== null &&
      pageViewData.job_title === null
    ) {
      return `${pageViewData.company}`;
    } else if (
      pageViewData.job_title !== null &&
      pageViewData.company !== null
    ) {
      return `${pageViewData.job_title} در ${pageViewData.company}`;
    } else {
      return " ";
    }
  };

  // end of patch functions

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShoOptions(false);
  };

  // syncronizing syncedExtractedData
  useEffect(() => {
    setSyncExtractedData(extractedData);
  }, [extractedData]);

  useEffect(() => {
    // Make an Axios GET request to fetch user data based on user_id
    const apiUrl = API_ROUTES.MAIN_PAGE_QRCODE_INFO;
    axiosInstance
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "Accept-Language": "fa"
        }
      })
      .then((response) => {
        // Handle the data once it's received
        setPagesData(response.data);
        // Set the first option as selected
        setSelectedOption(response.data.length > 0 ? response.data[0] : null);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [accessToken.accessToken]);

  useEffect(() => {
    if (selectedOption?.id) {
      // Make an Axios GET request to fetch user data based on user_id
      const apiUrl = generateApiUrl(
        `/api/v1/page_view/preview/${selectedOption.id}`
      );

      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Accept-Language": "fa"
          }
        })
        .then((response) => {
          // Handle the data once it's received
          setPageViewData(response.data);
          setExtractedData(response.data);
          setUpdatedExtractedData(response.data.contents);
          setNoCard(false);
          // set extracted data
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          if (error.response && error.response.status === 404) {
            setNoCard(true); // Set to true if a 404 error occurs
          }
        });
    }
  }, [selectedOption?.id, accessToken.accessToken]);

  useEffect(() => {
    // Make an Axios GET request to fetch user data based on user_id
    const apiUrl = generateApiUrl(
      `/api/v1/contents/page/${selectedOption?.id}`
    );

    if (selectedOption?.id) {
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Accept-Language": "fa"
          }
        })
        .then((response) => {
          // Handle the data once it's received
          setNoData(false);
          setListItems(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          if (error.response && error.response.status === 404) {
            // If the status code is 404, set noData to true
            setNoData(true);
          }
        });
    }
  }, [selectedOption?.id, accessToken.accessToken]);

  // Function to submit the form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedOption.id) {
      const newData = updatedExtractedData.flatMap((item) =>
        item.data.map((dataItem) => ({
          content_id: dataItem?.id || dataItem?.content_id,
          main_order: item.main_order, // Take the main_order from the outer item
          sub_order: dataItem.sub_order, // Take the sub_order from the inner dataItem
          display_box_type: item.display_box_type // Take the display_box_type from the outer item
        }))
      );

      // Concatenate flattenedAddedItems to the end of flattenedData
      const finalData = [...newData, ...localItemsSelected];

      // Make an Axios PATCH request to update user data based on user_id
      const apiUrl = generateApiUrl(
        `/api/v1/page_view/contents/order/${selectedOption.id}`
      );
      axios
        .patch(
          apiUrl,
          finalData.sort((a, b) => a?.main_order - b?.main_order),
          {
            headers: {
              Authorization: `Bearer ${accessToken.accessToken}`,
              "Accept-Language": "fa"
            }
          }
        )
        .then((response) => {
          // Handle the response as needed (e.g., show a success message)
          console.log("User data updated successfully.");
          toast.success("updated successfully");
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
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

  const handleRemoveItem = (item) => {
    const oldData = [...updatedExtractedData];
    const result = oldData.filter((row) => {
      const oldRow = [...row?.data];
      let rowResult = [];
      if (Array.isArray(row?.data)) {
        rowResult = oldRow?.filter((subRow) => {
          return subRow.guid != item.guid ? subRow : undefined;
        });
      }
      row.data = rowResult;
      return row.data?.length ? row : undefined;
    });

    setUpdatedExtractedData([...result]);
  };

  const handleEditItem = (guid, newItem) => {
    const oldData = [...updatedExtractedData];
    const newData = oldData.map((row) => {
      if (Array.isArray(row?.data)) {
        const newData = row.data.map((subRow) => {
          if (subRow.guid === guid) {
            return { ...subRow, ...newItem };
          }
          return subRow;
        });

        return { ...row, data: newData };
      }

      return row;
    });

    setUpdatedExtractedData(newData);
  };

  const bioDivRef = useRef(null);

  // Close bio if clicking outside of it
  const handleClickOutside = (event) => {
    if (bioDivRef.current && !bioDivRef.current.contains(event.target)) {
      setShowBio(false);
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Head>
        <title>ایزی‌نکت - ویرایش صفحه اصلی</title>
        <meta name="easynect business card" content="Powered by Easynect" />
      </Head>

      {noCard !== null ? (
        <>
          {noCard !== true ? (
            <>
              {noCard === false ? (
                <>
                  {/* back btn */}
                  <div className="text-muted px-4 flex w-full items-center justify-start mt-9 mb-1">
                    <ArrowRight />
                    <span onClick={goBack} className="font-ravi">
                      برگشت
                    </span>
                  </div>
                  {/* chose */}
                  <div className="flex justify-center relative ">
                    <button
                      onClick={() => setShoOptions(!showOptions)}
                      className="bg-dark text-white rounded-2xl w-[40%] px-3 py-[6px] focus:outline-none
                    text-sm flex justify-center items-center"
                    >
                      <span className="me-1">
                        {selectedOption
                          ? selectedOption.card_title
                          : "انتخاب کارت"}
                      </span>
                      <ArrowDownIcon />
                    </button>

                    {/* options */}
                    {showOptions && (
                      <div className="absolute bg-white shadow-2xl border py-2 px-4 rounded-md top-8">
                        {pagesData.map((data) => (
                          <div
                            key={data.id}
                            className={`py-1 border-b ${
                              selectedOption && selectedOption.id === data.id
                                ? "font-bold"
                                : ""
                            }`}
                            onClick={() => handleOptionClick(data)}
                          >
                            {data.card_title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* main */}

                  {selectedOption && pageViewData?.horizontal_menu ? (
                    <>
                      <div className="flex flex-col justify-center items-center mt-3">
                        <div
                          id="photo_here"
                          className=" box-contentw-[80px] h-[80px] rounded-full
                      overflow-hidden flex items-center justify-center mt-1"
                        >
                          <ProfileImage
                            src={pageViewData.profile_s3_url}
                            width={80}
                            height={80}
                          />
                        </div>
                        <h3 className="mt-3 text-xl font-semibold">
                          {pageViewData.username}
                        </h3>
                        <div className="text-muted mt-2 font-medium text-xs flex items-center justify-center relative ">
                          {getJobTitle()}
                          <span
                            className="px-2"
                            onClick={() => {
                              setShowBio((prev) => !prev);
                            }}
                          >
                            <InfoIconSmall />
                          </span>
                          {showBio && (
                            <div
                              ref={bioDivRef}
                              className="absolute flex flex-col max-h-[100px] z-10 py-1 px-1 rounded-md w-[250px] shadow-md bg-white border-[0.1px] overflow-y-scroll"
                            >
                              {getJobTitle()}
                              <p className="mt-1 box-content ">
                                {pageViewData.bio}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* to show no Data component in case of 404 for listOptions */}
                      {noData !== null && noData ? (
                        <NoData />
                      ) : (
                        <Fragment>
                          {/* horizontal scroll menu */}
                          <div className="border-[3px]  rounded-lg mx-2 my-4 ">
                            <div className="grid grid-flow-col justify-center items-center w-full">
                              <div className="my-5 overflow-x-hidden overscroll-y-contain ">
                                <EmptyItemsAddBox
                                  listItems={listItems}
                                  pageId={selectedOption.id}
                                  horizontalData={pageViewData.horizontal_menu}
                                />
                              </div>
                            </div>
                          </div>

                          <Layout className="!bg-white !px-3 !py-0 !h-fit">
                            {/* save btn */}
                            <button
                              disabled
                              // onClick={handleSaveContact}
                              className="bg-dark text-white text-sm font-bold w-full h-[44px] rounded-[8px] opacity-10"
                            >
                              ذخیره مخاطب
                            </button>

                            <form
                              onSubmit={handleSubmit}
                              className="border-[3px] mt-5 px-2 pb-6 rounded-lg"
                            >
                              <div className=" mt-5">
                                {updatedExtractedData?.map((object) => (
                                  <div
                                    key={object?.guid + object?.data?.length}
                                  >
                                    {/* square section */}

                                    {object.display_box_type === "square" ? (
                                      <SquareDataExists
                                        setUpdatedExtractedData={
                                          setUpdatedExtractedData
                                        }
                                        setExtractedData={setExtractedData}
                                        extractedData={extractedData}
                                        updatedExtractedData={
                                          updatedExtractedData
                                        }
                                        listItems={listItems}
                                        data={object}
                                        syncedExtractedData={
                                          syncedExtractedData
                                        }
                                        removeItem={handleRemoveItem}
                                        editItem={handleEditItem}
                                      />
                                    ) : null}

                                    {/* rectangle */}

                                    {object.display_box_type === "rectangle" ? (
                                      <EmptyRectangle
                                        setUpdatedExtractedData={
                                          setUpdatedExtractedData
                                        }
                                        setExtractedData={setExtractedData}
                                        extractedData={extractedData}
                                        updatedExtractedData={
                                          updatedExtractedData
                                        }
                                        listItems={listItems}
                                        data={object}
                                        syncedExtractedData={
                                          syncedExtractedData
                                        }
                                        setSyncExtractedData={
                                          setSyncExtractedData
                                        }
                                        removeItem={handleRemoveItem}
                                        editItem={handleEditItem}
                                      />
                                    ) : null}
                                  </div>
                                ))}

                                {/* wrapper */}

                                <div className="mt-4">
                                  <EmptySquareBox
                                    setUpdatedExtractedData={
                                      setUpdatedExtractedData
                                    }
                                    setExtractedData={setExtractedData}
                                    extractedData={extractedData}
                                    updatedExtractedData={updatedExtractedData}
                                    listItems={listItems}
                                    syncedExtractedData={syncedExtractedData}
                                    setSyncExtractedData={setSyncExtractedData}
                                    setAddedItems={setAddedItems}
                                    removeItem={handleRemoveItem}
                                    localItemsSelected={localItemsSelected}
                                    setLocalItemsSelected={
                                      setLocalItemsSelected
                                    }
                                  />
                                </div>
                                <button
                                  type="submit"
                                  className="font-ravi bg-dark text-white w-full mt-4 rounded-md py-2 font-medium"
                                >
                                  اعمال تغییرات
                                </button>
                              </div>
                              {/* end of wrapper */}
                            </form>

                            {/* logo */}
                            <div>
                              <ClientPageFooter />
                            </div>
                          </Layout>
                        </Fragment>
                      )}
                    </>
                  ) : (
                    <LoadingState />
                  )}
                </>
              ) : (
                <NoCardExist />
              )}
            </>
          ) : (
            // <LoadingState />
            <Layout>
              <p className="mt-[150px] text-start px-2 bg-muted py-4 rounded-lg opacity-80 ">
                شما هنوز هیچ صفحه‌ای نساخته ‌اید. برای ساخت اولین صفحه خود
                <Link
                  href="/app/cards/createCard"
                  className="underline font-bold "
                >
                  {" "}
                  اینجا{" "}
                </Link>
                کلیک کنید
              </p>
            </Layout>
          )}
        </>
      ) : (
        <LoadingState />
      )}

      {/* if card exists below will be shown */}
    </>
  );
};

export default InfoPage;
