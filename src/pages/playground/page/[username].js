// TODO: needs to be refactored
import React, { useState, useEffect, Fragment, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { generateApiUrl } from "@/components/ApiUr";
import ClientPageFooter from "@/components/ClientPageFooter";
import LoadingState from "@/components/LoadingState";
import Layout from "@/components/Layout";
import NoData from "@/components/pageView/NoData";
import Image from "next/image";
import CarouselView from "@/components/publicPageView/CarouselView";
import LeadForm from "@/components/leadForm/LeadForm";
import axiosInstance from "@/services/axiosInterceptors";
import Head from "next/head";
import tw from "tailwind-styled-components";

// components
import Widget from "@/components/Widget";
import { InfoIconSmall } from "@/components/Icons";
import FilePreviewBottomSheet from "@/components/FilePreviewBottomSheet";

export async function getServerSideProps(context) {
  try {
    const { params } = context;
    const { username } = params;

    const apiUrl = generateApiUrl(`/api/v1/page_view/${username}`);

    const response = await axios.get(apiUrl, {
      headers: {
        "Accept-Language": "fa", // Language header
      },
    });

    const { data } = response;
    const { is_direct, redirect_link, type } = data.is_direct;

    if (is_direct) {
      if (type === "file") {
        return {
          props: { showFile: true, fileURL: redirect_link },
        };
      }

      return {
        redirect: {
          destination: redirect_link,
          permanent: false,
        },
      };
    }

    return {
      props: { usersData: data, username },
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }

    if (error.response && error.response.data && error.response.data.detail) {
      return {
        props: { errorMessage: error.response.data.detail },
      };
    }

    return {
      props: { errorMessage: "Error: An error occurred." },
    };
  }
}

export default function Username({
  username,
  usersData,
  errorMessage,
  showFile = false,
  fileURL = null,
}) {
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
    if (username) {
      if (usersData.contents.length === 0) {
        setNoDataContents(true);
      } else {
        setNoDataContents(false);
      }

      if (usersData?.horizontal_menu[0]?.id === null) {
        setNoDataHorz(true);
      } else {
        setNoDataHorz(false);
      }

      if (usersData?.lead_form?.length > 0) {
        setHasLeadForm(true);
      }
    }
  }, [username]);

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

  if (errorMessage) {
    toast.error(errorMessage);
    return null;
  }

  if (showFile) {
    return (
      <FilePreviewBottomSheet url={fileURL} isOpen={true} onClose={null} />
    );
  }

  return (
    <>
      <Head>
        <title>{`ایزی‌نکت -  ${username}`}</title>
        <meta name="easynect business card" content="Powered by Easynect" />
      </Head>

      <Cover>
        <CoverImage
          src={
            "https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </Cover>
      <Header>
        <ProfilePictureWrapper>
          <ProfilePicture
            src={
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
        </ProfilePictureWrapper>
        <HeaderContent>
          <Texts>
            <FullName>سوزانا جوانسون</FullName>
            <Bio>برنامه نویس در شرکت راستا پردازان شرق</Bio>
          </Texts>
          <Actions>
            <Button>ذخیره‌ی مخاطب</Button>
            <ButtonOutlined>پوستن به لید</ButtonOutlined>
          </Actions>
        </HeaderContent>
      </Header>
      {usersData?.horizontal_menu ? (
        <>
          {noDataContents !== null ? (
            <div className="px-4 -mt-4">
              {!noDataContents ? (
                <>
                  <div className="mt-5">
                    {usersData.contents?.map((object) => (
                      <Widget
                        key={object?.guid + object?.data?.length}
                        data={object}
                        handleCountingItemClicks={handleCountingItemClicks}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <NoData />
              )}
            </div>
          ) : (
            <LoadingState />
          )}
          <div>
            <ClientPageFooter />
          </div>
        </>
      ) : (
        <LoadingState />
      )}

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

const Wrapper = tw.div``;

const Cover = tw.div`
  bg-red-500
  w-screen
  h-[33.3333333vw]

  container:w-[414px]
  container:h-[138px]
`;

const CoverImage = tw.img`
  w-full
  h-full
  object-cover
`;

const Header = tw.div`
  -translate-y-4
  pe-6
  ps-3
  flex
  items-center
`;

const HeaderContent = tw.div`
  flex-1
  ps-2
  pt-6
`;

const Texts = tw.div`
  ps-2
`;

const ProfilePictureWrapper = tw.div`
  w-32
  h-32
  rounded-full
  border-4
  border-white
  overflow-hidden
`;

const ProfilePicture = tw.img`
  w-full
  h-full
  object-cover
`;

const FullName = tw.h4`
  text-gray-900
`;

const Bio = tw.p`
  text-xs
  text-gray-400
`;

const Actions = tw.div`
  flex
  gap-2
  mt-4
`;
const Button = tw.button`
  py-2
  px-3
  flex-1
  rounded-md
  bg-black
  text-white
  text-xs
  border-2
  border-black
`;

const ButtonOutlined = tw(Button)`
  bg-transparent
  text-black
`;
