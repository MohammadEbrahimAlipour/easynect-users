// TODO: needs to be refactored
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import Head from "next/head";
import tw from "tailwind-styled-components";

// components
import Widget from "@/components/Widget";
import LeadForm from "@/components/leadForm/LeadForm";
import FilePreviewBottomSheet from "@/components/FilePreviewBottomSheet";
import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";
import { generateApiUrl } from "@/components/ApiUr";
import ClientPageFooter from "@/components/ClientPageFooter";
import LoadingState from "@/components/LoadingState";
import NoData from "@/components/pageView/NoData";

// assets
import BaseInfoIcon from "@/assets/icons/info.svg";

// constants
import { LANGUAGES } from "@/constants/language";

// services
import axiosInstance from "@/services/axiosInterceptors";

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

    const translations = await serverSideTranslations(
      data.language || LANGUAGES.fa.name
    );

    if (is_direct) {
      if (type === "file") {
        return {
          props: {
            ...translations,
            showFile: true,
            fileURL: redirect_link,
          },
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
      props: {
        ...translations,
        usersData: data,
        username,
      },
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
  const [hasLeadForm, setHasLeadForm] = useState(false);
  const [isBioBottomSheetOpen, setIsBioBottomSheetOpen] = useState(false);

  const { t } = useTranslation();

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
    }
  }, [usersData]);

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
    if (!showFile) {
      handleSaveContact();
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSaveContact = () => {
    let contents = {};

    usersData.contents.forEach(({ data }) => {
      data.forEach((item) => {
        const { id, title, content_val, type } = item;

        if (!contents[id]) {
          contents[id] = {
            title,
            content_val,
            type,
          };
        }
      });
    });

    let vCardData = Object.keys(contents)
      .map((key) => {
        const item = contents[key];

        switch (item.type) {
          case "phone":
            return `TEL;TYPE=${item.title}:${item.content_val}`;
          case "email":
            return `EMAIL;TYPE=${item.title}:${item.content_val}`;
          case "link":
            return `URL;TYPE=${item.title}:${item.content_val}`;
          case "file":
            return `URL;TYPE=${item.title}:${item.content_val}`;
          default:
            return "";
        }
      })
      .join("\n");

    const vCardString = `
          BEGIN:VCARD
          VERSION:3.0
          N;CHARSET=utf-8:${usersData.owner_last_name};${usersData.owner_first_name};;;
          ${vCardData}
          END:VCARD`;

    const blob = new Blob([vCardString], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

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
        <CoverImage src={usersData?.banner_s3_url} />
      </Cover>
      <Header>
        <ProfilePictureWrapper>
          <ProfilePicture src={usersData?.profile_s3_url} />
        </ProfilePictureWrapper>
        <HeaderContent>
          <Texts onClick={() => setIsBioBottomSheetOpen(true)}>
            <FullName>
              {usersData?.owner_first_name} {usersData?.owner_last_name}
            </FullName>
            <JobTitle>
              {usersData?.job_title} {t("in")} {usersData?.company}
              <InfoIcon className="mr-1" />
            </JobTitle>
          </Texts>
          <Actions>
            <Button onClick={handleSaveContact}>{t("save_contact")}</Button>
            <ButtonOutlined
              onClick={() => {
                setHasLeadForm(true);
              }}
            >
              {t("join_lead")}
            </ButtonOutlined>
          </Actions>
        </HeaderContent>
      </Header>
      {usersData?.horizontal_menu ? (
        <>
          {noDataContents !== null ? (
            <div className="flex-1 px-4 -mt-4">
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

      <LeadForm
        open={hasLeadForm}
        onClose={() => setHasLeadForm(false)}
        leadFormData={usersData.lead_form}
        language={usersData.language}
        pageId={usersData.page_id}
        setHasLeadForm={setHasLeadForm}
      />

      <BottomSheetWrapper
        open={isBioBottomSheetOpen}
        onClose={() => setIsBioBottomSheetOpen(false)}
      >
        <BioTitle>{t("bio_title")}</BioTitle>
        <Bio>{usersData?.bio}</Bio>
      </BottomSheetWrapper>
    </>
  );
}

const Wrapper = tw.div``;

const Cover = tw.div`
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
  flex-none
`;

const ProfilePicture = tw.img`
  w-full
  h-full
  object-cover
`;

const FullName = tw.h4`
  text-gray-900
`;

const JobTitle = tw.div`
  text-xs
  text-gray-400
`;

const BioTitle = tw.div`
  text-lg
  text-center
  text-gray-700
  mt-8
`;

const Bio = tw.p`
  text-gray-400
  mb-24
  px-8
  mt-4
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

const InfoIcon = tw(BaseInfoIcon)`
  w-4
  inline
  text-gray-900
  cursor-pointer
`;
