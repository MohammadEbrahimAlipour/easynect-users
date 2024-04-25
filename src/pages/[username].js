import React, { useState, useEffect, Fragment, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { generateApiUrl } from "@/components/ApiUr";
import ClientPageFooter from "@/components/ClientPageFooter";
import LoadingState from "@/components/LoadingState";
import RectangleData from "@/components/publicPageView/RectangleData";
import SquareData from "@/components/publicPageView/SquareData";
import Layout from "@/components/Layout";
import NoData from "@/components/pageView/NoData";
import Image from "next/image";
import CarouselView from "@/components/publicPageView/CarouselView";
import LeadForm from "@/components/leadForm/LeadForm";
import axiosInstance from "@/services/axiosInterceptors";
import Head from "next/head";
import { InfoIconSmall } from "@/components/Icons";

export default function Username() {
  const router = useRouter();
  // The key of this object ([pageView]) should match the filename
  const { username } = router.query;
  const [usersData, setUsersData] = useState();
  const [noDataContents, setNoDataContents] = useState(null);
  const [vCardList, setVCardList] = useState([]);
  const [hasLeadForm, setHasLeadForm] = useState(false);
  const [noDataHoz, setNoDataHorz] = useState(null);
  const [showBio, setShowBio] = useState(false);

  const getJobTitle = () => {
    if (usersData.job_title !== null && usersData.company === null) {
      return `${usersData.job_title}`;
    } else if (usersData.company !== null && usersData.job_title === null) {
      return `${usersData.company}`;
    } else if (usersData.job_title !== null && usersData.company !== null) {
      return `${usersData.job_title} در ${usersData.company}`;
    } else {
      return " ";
    }
  };

  const handleSaveContact = () => {
    // Filter unique ids
    const uniqueVCardList = vCardList.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );

    let vCardData = uniqueVCardList
      .map((item) => {
        switch (item.type) {
          case "phone":
            return `TEL;TYPE=${item.title}:${item.content_val}`;
          case "email":
            return `EMAIL;TYPE=${item.title}:${item.content_val}`;
          case "link":
            // No need to encode URLs, they are already in the correct format
            return `URL;TYPE=${item.title}:${item.content_val}`;
          // Add more cases for other contact information as needed
          default:
            return "";
        }
      })
      .join("\n");
    // Add static parts of the vCard around the dynamic data
    const vCardString = `
BEGIN:VCARD
VERSION:3.0
N;CHARSET=utf-8:${usersData.owner_last_name};${usersData.owner_first_name};;;
${vCardData}
END:VCARD
`;

    // Download the vCard
    const blob = new Blob([vCardString], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact.vcf"; // Set the filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const flattenContents = (contents) => {
    // Flatten the contents array and extract the necessary fields
    return contents.reduce((acc, contentItem) => {
      const flattenedData = contentItem.data.map((item) => ({
        type: item.type,
        title: item.title,
        content_val: item.content_val,
      }));
      return [...acc, ...flattenedData];
    }, []);
  };

  useEffect(() => {
    const apiUrl = generateApiUrl(`/api/v1/page_view/${username}`);

    if (username) {
      // Make an Axios GET request to fetch user data
      axios
        .get(apiUrl, {
          headers: {
            "Accept-Language": "fa", // Language header
          },
        })
        .then((response) => {
          // Handle the data once it's received
          setUsersData(response.data);

          if (response.data.contents.length === 0) {
            setNoDataContents(true);
          } else {
            setNoDataContents(false);
          }

          if (response.data?.horizontal_menu[0]?.id === null) {
            setNoDataHorz(true);
          } else {
            setNoDataHorz(false);
          }

          if (response.data?.lead_form?.length > 0) {
            setHasLeadForm(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          // Check if the error response is a 404 Not Found
          if (error.response && error.response.status === 404) {
            // Redirect to the custom 404 page using Next.js router
            router.push("/404"); // Adjust the path as needed
          } else {
            // Handle other errors
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
          }
        });
    }
  }, [username, router]);

  useEffect(() => {
    // Ensure usersData.contents exists and is an array before trying to flatten it
    if (usersData && Array.isArray(usersData.contents)) {
      const flattenedContents = flattenContents(usersData.contents);
      // Merge flattened contents with horizontal_menu
      const combinedDataArray = [
        ...flattenedContents,
        ...usersData.horizontal_menu,
      ];
      setVCardList(combinedDataArray);
    }
  }, [usersData, setVCardList]);

  const handleCountingItemClicks = async (itemData) => {
    try {
      const analyticsData = {
        content_id: itemData.id,
      };
      const apiUrl = generateApiUrl(`/api/v1/analytics/tap/${itemData.id}`);
      const response = await axiosInstance.post(apiUrl, analyticsData);

      if (response.status === 204) {
        return true;
      } else {
        toast.error("There was an error in processing the action.");
        return false;
      }
    } catch (error) {
      console.error("Error posting analytics data:", error);
      toast.error("There was an error in processing the action.");
      return false;
    }
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
        <title>{`ایزی‌نکت -  ${username}`}</title>
        <meta name="easynect business card" content="Powered by Easynect" />
      </Head>
      {/* main */}
      {/* lead btn */}
      {/* <span className="flex justify-end mt-8 ml-5">
        <span className=" bg-dark text-white px-2 py-1 rounded-md text-xs">
          فرم لید
        </span>
      </span> */}
      {usersData?.horizontal_menu ? (
        <>
          <div className="flex flex-col justify-center items-center mt-[45px]">
            <div
              id="photo_here"
              className=" box-content w-[90px] h-[90px] rounded-full
              overflow-hidden"
            >
              {/* profile photo */}
              {/* <div> */}
              <Image
                priority={true}
                className="rounded-full object-cover w-full h-full"
                src={usersData?.profile_s3_url}
                width={90}
                height={90}
                alt="Person Name"
              />
              {/* </div> */}
            </div>
            <p className="mt-3 text-xl font-semibold capitalize">
              {usersData.owner_first_name + " " + usersData.owner_last_name}
            </p>
            <div className="text-muted mt-2 font-medium text-xs flex items-center justify-center  relative ">
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
                  <p className="mt-1 box-content ">{usersData.bio}</p>
                </div>
              )}
            </div>
          </div>

          {/* horizontal scroll menu */}

          {noDataHoz !== null ? (
            <>
              {!noDataHoz && (
                <div className="grid grid-flow-col justify-center items-center w-full">
                  <div className="my-5 overflow-x-hidden overscroll-y-contain ">
                    <CarouselView
                      horizontalData={usersData.horizontal_menu}
                      handleCountingItemClicks={handleCountingItemClicks}
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <LoadingState />
          )}

          {/* end of horz */}

          <Layout className="!bg-white !px-3 !py-0 !h-fit">
            {noDataContents !== null ? (
              <>
                {!noDataContents ? (
                  <>
                    {/* save btn */}
                    <button
                      onClick={handleSaveContact}
                      className="bg-dark text-white text-sm font-bold w-full h-[44px] rounded-[8px] "
                    >
                      ذخیره مخاطب
                    </button>
                    <div className="mt-4">
                      <h1 className="text-xl text-gray-500 mb-4">
                        در حال تست کپی کردن
                      </h1>
                      <RectangleData
                        object={{
                          guid: "5d85b2b3-5da5-41e1-826d-02cdbb241d22",
                          display_box_type: "square",
                          main_order: 1,
                          data: [
                            {
                              id: "1a94fbb0-fed7-421a-83ad-d551096d15f1",
                              sub_order: 1,
                              main_order: 1,
                              guid: "2f248677-dbb7-4fdb-bd71-cc8792836615",
                              title: "شماره‌ی شبا",
                              description: "شماره‌ی شبای کارت رسالت",
                              content_val: "IR580540102680020817909002",
                              s3_icon_url:
                                "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/5a3c1dbe-0f6c-43f3-919b-a81aa7ff0be2.png",
                              type: "text",
                            },
                            {
                              id: "1bea9b32-596f-4c28-8148-663c871e432f",
                              sub_order: 2,
                              main_order: 1,
                              guid: "453d038b-d088-48cf-a5f1-7c974ad4511a",
                              title: "اینستاگرام",
                              description: "توضیحات بلاب بلاب بلا",
                              content_val: "https://instagram.com/sample url",
                              s3_icon_url:
                                "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/48b718f7-bbec-45b2-89a2-ac49d5ee5e85.png",
                              type: "link",
                            },
                          ],
                        }}
                        handleCountingItemClicks={() => {}}
                      />
                    </div>
                    <div className="mt-5">
                      {usersData.contents?.map((object) => {
                        return (
                          <div key={object?.guid + object?.data?.length}>
                            {/* square section */}

                            {object.display_box_type === "square" ? (
                              <SquareData
                                object={object}
                                handleCountingItemClicks={
                                  handleCountingItemClicks
                                }
                              />
                            ) : null}

                            {/* rectangle */}

                            {object.display_box_type === "rectangle" ? (
                              <RectangleData
                                object={object}
                                handleCountingItemClicks={
                                  handleCountingItemClicks
                                }
                              />
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <NoData />
                )}
              </>
            ) : (
              <LoadingState />
            )}
            {/* end of wrapper */}

            {/* logo */}
            <div>
              <ClientPageFooter />
            </div>
          </Layout>
        </>
      ) : (
        <LoadingState />
      )}

      {/* lead form */}
      <>
        {hasLeadForm && (
          <LeadForm
            open={hasLeadForm}
            onClose={() => setHasLeadForm(false)}
            leadFormData={usersData.lead_form}
            pageId={usersData.page_id}
            setHasLeadForm={setHasLeadForm}
          />
        )}
      </>
    </>
  );
}
