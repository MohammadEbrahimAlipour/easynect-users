// new changes
// TODO: needs to be refactored
import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import Image from "next/image";
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
import SwitchModeButton from "@/components/buttons/SwitchModeButton";
import { Box } from "@mui/material";
import { API_ROUTES } from "@/services/api";
import { useAccessToken } from "../../context/AccessTokenContext";
import StoryList from "@/components/storyList/StoryList";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import FaqUser from "@/components/faqUser/FaqUser";

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

    if (error.response && error.response.status === 403) {
      return {
        redirect: {
          destination: "/403",
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
  const [mode, setMode] = useState('menu');
  const [items, setItems] = useState([]);
  const [theme, setTheme] = useState({
    background: "#ffffff",
    borderColor: "#000000",
    cardBackground: "#f5f5f5",
    cardText: "#333333",
    headerText: "#222222"
  });
  const [formInfo, setFormInfo] = useState({});
  const accessToken = useAccessToken();

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


  const handleCategoryInfo = (id) => {
    const apiRecord = API_ROUTES.ANALYSTICS_POST_CATALOG(id);
    axiosInstance
      .post(apiRecord, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(error)
      });
    const apiUrl = API_ROUTES.CATALOGS_CATEGORY(id);
    axiosInstance
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,

        },
      })
      .then((response) => {
        console.log(response.data, 'response lalalay lalay lay')
        setItems(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
    const orderApi = API_ROUTES.GET_ORDER(id);
    axiosInstance
      .get(orderApi, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,

        },
      })
      .then((response) => {
        console.log(response.data, 'response get order')
        setFormInfo(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
  };



  useEffect(() => {
    const fetchData = async () => {
      await handleCategoryInfo(usersData?.catalog_id);
    }
    fetchData();
  }, [usersData]);


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
  // useEffect(() => {
  //   const fetchTheme = async () => {
  //     try {
  //       const api = API_ROUTES.GET_THEME(usersData?.page_id || );
  //       const response = await axiosInstance.get(api, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken.accessToken}`,
  //         },
  //       });
  //       setTheme(response?.data?.theme);
  //       console.log(response, 'response');
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchTheme();
  // }, [usersData]);
  useEffect(() => {
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

    const vCardString = `BEGIN:VCARD\nVERSION:3.0\nN;CHARSET=utf-8:${usersData.owner_last_name};${usersData.owner_first_name};;;\n${vCardData}\nEND:VCARD`;

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



  console.log(usersData, 'usersData')

  return (
    <>
      <Head>
        <title>{`ایزی‌نکت -  ${username}`}</title>
        <meta name="easynect business card" content="Powered by Easynect" />
      </Head>

      <Cover style={{ background: theme?.background }}>
        {/* <CoverImage fill src={usersData?.banner_s3_url} /> */}
      </Cover>

      <Header style={{ background: theme?.cardBackground, borderBottom: `1px solid ${theme?.borderColor}` }}>
        <ProfilePictureWrapper>
          <ProfilePicture fill src={usersData?.profile_s3_url} />
        </ProfilePictureWrapper>
        <HeaderContent $bg={theme?.cardBackground}>
          <Texts onClick={() => setIsBioBottomSheetOpen(true)}>
            <FullName style={{ color: theme?.headerText }}>
              {usersData?.owner_first_name} {usersData?.owner_last_name}
            </FullName>
            <JobTitle style={{ color: theme?.cardText }}>
              {usersData?.job_title}
              {usersData?.company}
              <InfoIcon className="mr-1" />
            </JobTitle>
          </Texts>
          <Actions>
            <Button
              onClick={handleSaveContact}
              style={{
                background: theme?.headerText,
                color: theme?.background,
                border: `1px solid ${theme?.borderColor}`,
              }}
            >
              {t("save_contact")}
            </Button>
            <ButtonOutlined
              onClick={() => setHasLeadForm(true)}
              style={{
                color: theme?.headerText,
                border: `1px solid ${theme?.borderColor}`,
              }}
            >
              {t("join_lead")}
            </ButtonOutlined>
          </Actions>
        </HeaderContent>
      </Header>

      <Box className="flex justify-center items-center" style={{ background: theme?.background }}>
        <SwitchModeButton mode={mode} setMode={setMode} theme={theme} lan={t}/>
      </Box>

      {mode == 'menu' ? usersData?.horizontal_menu ? (
        <>
          {noDataContents !== null ? (
            <div className="flex-1 px-4 -mt-4" style={{ background: theme?.background }}>
              {!noDataContents ? (
                <div className="mt-5">
                  {usersData.contents?.map((object) => (
                    <Widget
                      key={object?.guid + object?.data?.length}
                      data={object}
                      handleCountingItemClicks={handleCountingItemClicks}
                      theme={theme}
                    />
                  ))}
                  {usersData.gallery?.length > 0 && (
                    <Box mt={2} mb={5}>
                      <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ type: 'progressbar' }}
                        modules={[Navigation]}
                      >
                        {usersData.gallery.map((item) => (
                          <SwiperSlide key={item.id}>
                            <img
                              src={item.pic_url}
                              alt="gallery"
                              style={{
                                width: '100%',
                                height: '100px',
                                objectFit: 'contain',
                                borderRadius: 8,
                                border: `1px solid ${theme?.borderColor || '#ddd'}`,
                              }}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Box>
                  )}
                  {usersData.faqs?.length > 0 && (
                    <FaqUser  data={usersData.faqs} theme={theme} />
                  )}

                </div>
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
      ) : (
        <StoryList
          orderInfo={formInfo}
          theme={theme}
          storyData={items}
          Api={API_ROUTES.CATEGORY_ITEM_GET}
          parentId={usersData?.catalog_id}
        />
      )}

      <LeadForm
        open={hasLeadForm}
        onClose={() => setHasLeadForm(false)}
        leadFormData={usersData.lead_form}
        language={usersData.language}
        pageId={usersData.page_id}
        setHasLeadForm={setHasLeadForm}
        theme={theme}
      />

      <BottomSheetWrapper
        open={isBioBottomSheetOpen}
        onClose={() => setIsBioBottomSheetOpen(false)}
        theme={theme}
      >
        <BioTitle style={{ color: theme.headerText }}>{t("bio_title")}</BioTitle>
        <Bio style={{ color: theme.cardText }}>{usersData?.bio}</Bio>
      </BottomSheetWrapper>

    </>
  );
}

const Wrapper = tw.div``;

const Cover = tw.div`
  relative
  overflow-hidden
  w-screen
  h-[33.3333333vw]

  container:w-[414px]
  container:h-[138px]
`;

const CoverImage = tw(Image)`
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
  ${(p) => `background: ${p.$bg};`}
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
  bg-white
  flex-none
  relative
  overflow-hidden
`;

const ProfilePicture = tw(Image)`
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
