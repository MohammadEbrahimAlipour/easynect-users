import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";

// components
import SwitchTile from "@/components/SwitchTile";
import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";
import EditProfileInfoRedirectFormLink from "@/components/EditProfileInfoRedirectFormLink";

// files
import BaseArrowDownIcon from "@/assets/icons/arrow-down.svg";

// services
import axiosInstance from "@/services/axiosInterceptors";
import { useAccessToken } from "../../context/AccessTokenContext";
import { generateApiUrl } from "./ApiUr";

const fakeNoLink = false;

export default function EditProfileInfoRedirectForm({ data, pageID }) {
  // TODO: add loading
  const [isChecked, setIsChecked] = useState(false);
  const [isLinksSheetOpen, setIsLinkSheetOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  const accessToken = useAccessToken();

  useEffect(() => {
    setSelectedLink(getSelectedLink());
    setIsChecked(data.is_direct);
  }, []);

  useEffect(() => {
    if (isLinksSheetOpen === false && selectedLink !== null) {
      toggleRequest();
    }
  }, [isChecked, isLinksSheetOpen, selectedLink]);

  const getSelectedLink = () => {
    const { current_link, links } = data;

    if (current_link === null) {
      return null;
    }

    return links.find((link) => {
      const { id } = link;
      if (current_link === id) {
        return link;
      }
    });
  };

  const handleToggleSwitch = () => {
    setIsChecked((prevState) => {
      const newState = !prevState;

      if (newState && selectedLink === null) {
        setIsLinkSheetOpen(true);
      }

      return newState;
    });
  };

  const toggleLinkSheet = () => {
    if (!isChecked && !isLinksSheetOpen) return;

    setIsLinkSheetOpen((prevState) => !prevState);
  };

  const handleBottomSheetClose = () => {
    if (!selectedLink) {
      setIsChecked(false);
    }

    setIsLinkSheetOpen(false);
  };

  const toggleRequest = () => {
    const updateUrl = generateApiUrl(
      `/api/v1/pages/change_page_is_direct_state/${pageID}`
    );

    axiosInstance
      .patch(updateUrl, null, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "accept-language": "fa",
        },
      })
      .then((response) => {
        if (response.status !== 204) {
          console.error("Error: Unable to set direct link");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const selectRequest = (item) => {
    const updateUrl = generateApiUrl(`/api/v1/pages/set_redirect/${pageID}`);

    const body = {
      content_id: item.id,
    };

    axiosInstance
      .patch(updateUrl, body, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "accept-language": "fa",
        },
      })
      .then((response) => {
        if (response.status !== 204) {
          console.error("Error: Unable to set direct link");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const handleSelectLink = (item) => {
    setSelectedLink(item);

    selectRequest(item);

    setTimeout(() => {
      setIsLinkSheetOpen(false);
    }, 250);
  };

  if (data === null) return null;

  const { links } = data;

  return (
    <>
      <SwitchTile onToggle={handleToggleSwitch} isChecked={isChecked}>
        انتقال مستقیم
      </SwitchTile>
      <RedirectPathButton onClick={toggleLinkSheet} $isDisabled={!isChecked}>
        {selectedLink !== null
          ? selectedLink.title
          : "آیتم مورد نظر را انتخاب کنید"}
        <ArrowDownIcon />
      </RedirectPathButton>
      <BottomSheetWrapper
        open={isLinksSheetOpen}
        onClose={handleBottomSheetClose}
      >
        {links.length === 0 ? (
          <NotLinkMessage>
            موردی جهت انتخاب وجود ندارد به قسمت ویرایش آیتم ها بروید و موارد
            جدید خود را ایجاد کنید.
          </NotLinkMessage>
        ) : (
          <LinksWrapper>
            {links.map((link) => (
              <EditProfileInfoRedirectFormLink
                key={link.id}
                active={link.id === selectedLink?.id}
                data={link}
                onSelect={handleSelectLink}
              />
            ))}
          </LinksWrapper>
        )}
      </BottomSheetWrapper>
    </>
  );
}

const RedirectPathButton = tw.div`
  flex
  items-center
  justify-between
  p-3
  border-2
  rounded-lg
  border-black
  cursor-pointer

  transition
  duration-300
  ease-in-out

  ${({ $isDisabled }) =>
    $isDisabled &&
    `
  opacity-25 
  `}
`;

const ArrowDownIcon = tw(BaseArrowDownIcon)`
  w-6
`;

const LinksWrapper = tw.div`
  flex
  flex-col
  gap-2
`;

const NotLinkMessage = tw.p`
  bg-gray-100
  text-black
  py-5
  text-center
`;
