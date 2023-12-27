import React, { useState, useEffect, Fragment } from "react";
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
import EmptyItemsAddBox from "@/components/infoPage/empty/EmptyItemsAddBox";
import CarouselView from "@/components/publicPageView/CarouselView";

export default function Username() {
  const router = useRouter();
  // The key of this object ([pageView]) should match the filename
  const { username } = router.query;
  const [usersData, setUsersData] = useState();
  const [noData, setNoData] = useState(false);
  const [vCardList, setVCardList] = useState([]);

  console.log("userData", usersData);

  //   const handleSaveContact = () => {
  //     // create Vcard

  //     const vCardString = `
  // BEGIN:VCARD
  // VERSION:3.0
  // N;CHARSET=utf-8:چاپ و تبلیغات نیکبخت
  // TEL;TYPE=Number:05138842010
  // TEL;TYPE=Number:09150032020
  // TEL;TYPE=Number:09150042020
  // EMAIL;INTERNET;TYPE=Email:nikbakhtprint@gmail.com
  // URL;TYPE=WhatsApp:https://nikbakhtprint.com/
  // URL;TYPE=Instagram:https://www.instagram.com/nikbakhtprint/
  // URL;TYPE=Telegram:https://t.me/nikbakhtprint
  // URL;TYPE=Website:https://maps.app.goo.gl/mJSte6hmxcvH6ToJ7
  // END:VCARD
  // `;

  //     // andnoiasidn aindians inains d adnaid

  //     // Download the vCard
  //     const blob = new Blob([vCardString], {
  //       type: "text/vcard"
  //     });
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "contact.vcf"; // Set the filename
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);
  //   };

  const handleSaveContact = () => {
    let vCardData = vCardList
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
    console.log("&&&&&", encodeURIComponent);
    // Add static parts of the vCard around the dynamic data
    const vCardString = `
BEGIN:VCARD
VERSION:3.0
N;CHARSET=utf-8:چاپ و تبلیغات نیکبخت
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
        content_val: item.content_val
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
            "Accept-Language": "fa" // Language header
          }
        })
        .then((response) => {
          // Handle the data once it's received
          setUsersData(response.data);
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
  }, [username]);

  useEffect(() => {
    // Ensure usersData.contents exists and is an array before trying to flatten it
    if (usersData && Array.isArray(usersData.contents)) {
      const flattenedDataArray = flattenContents(usersData.contents);
      setVCardList(flattenedDataArray);
    }
  }, [usersData]); // This effect depends on usersData state

  console.log("vcard", vCardList);
  return (
    <>
      {/* main */}

      {usersData?.horizontal_menu ? (
        <>
          <div className="flex flex-col justify-center items-center mt-[45px]">
            <div
              id="photo_here"
              className=" box-contentw-[80px] h-[80px] rounded-full
                  overflow-hidden flex items-center justify-center"
            >
              {/* profile photo */}
              <div>
                <Image
                  priority={true}
                  className={`rounded-full object-contain`}
                  src={usersData?.profile_s3_url}
                  width={80}
                  height={80}
                  alt="Person Name"
                />
              </div>
            </div>
            <p className="mt-3 text-xl font-semibold">
              {usersData?.card_title}
            </p>
            <p className="text-muted mt-2 font-medium text-xs">
              {usersData?.job_title}
            </p>
          </div>
          {/* to show no Data component in case of 404 for listOptions */}
          {noData !== null && noData ? (
            <NoData />
          ) : (
            <Fragment>
              {/* horizontal scroll menu */}

              <div className="grid grid-flow-col justify-center items-center w-full">
                <div className="my-5 overflow-x-hidden overscroll-y-contain ">
                  {/* <SwiperCarousel /> */}
                  <CarouselView horizontalData={usersData.horizontal_menu} />
                </div>
              </div>

              {/* end of horz */}

              <Layout className="!bg-white !px-3 !py-0 !h-fit">
                {/* save btn */}
                <button
                  onClick={handleSaveContact}
                  className="bg-dark text-white text-sm font-bold w-full h-[44px] rounded-[8px] "
                >
                  ذخیره مخاطب
                </button>

                <div className=" mt-5">
                  {usersData.contents?.map((object) => (
                    <div key={object?.guid + object?.data?.length}>
                      {/* square section */}

                      {object.display_box_type === "square" ? (
                        <SquareData object={object} />
                      ) : null}

                      {/* rectangle */}

                      {object.display_box_type === "rectangle" ? (
                        <RectangleData object={object} />
                      ) : null}
                    </div>
                  ))}
                </div>
                {/* end of wrapper */}

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
  );
}
