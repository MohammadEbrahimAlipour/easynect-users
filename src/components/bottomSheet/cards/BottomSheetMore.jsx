import React, { Fragment, useEffect, useMemo, useState } from "react";
import BottomSheetWrapper from "../BottomSheetWrapper";
import AccessoryConnect from "@/components/AccessoryConnect";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { Alert, AlertTitle, Button } from "@mui/material";
import axios from "axios";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { toast } from "react-toastify";
import { generateApiUrl } from "@/components/ApiUr";
import BottomSheetShareById from "./BottomSheetShareById";

const TABS = Object.freeze({
  default: "default",
  delete: "delete",
  share: "share",
});

const BottomSheetMore = ({
  showSheetMore,
  setShowSheetMore,
  moreSheetDetails,
  onDelete,
}) => {
  const accessToken = useAccessToken();

  const [currentTab, setCurrentTab] = useState(TABS.default);

  useEffect(() => {
    setCurrentTab(TABS.default);
  }, [showSheetMore]);

  const handleDelete = () => {
    const apiUrl = generateApiUrl(`/api/v1/pages/${moreSheetDetails?.id}`);

    const headers = {
      Authorization: `Bearer ${accessToken.accessToken}`, // Assuming accessToken is the token value
      "Accept-Language": "fa",
    };

    axios
      .delete(apiUrl, { headers })
      .then((response) => {
        if (response.status === 204) {
          toast.success("کارت با موفقیت حذف شد");
          onDelete();
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
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
  };

  const defaultTab = () => {
    return (
      <>
        <PageTitle>{moreSheetDetails.card_title}</PageTitle>
        <ItemsWrapper>
          <Item
            $as={Link}
            href={`/app/stats/personsStats?selectedIdFromCard=${moreSheetDetails.id}`}
            className=" border-b-[1px] font-medium  justify-center block py-3 px-4 hover:bg-gray-100 font-ravi w-full"
          >
            آمار
          </Item>

          <Item
            onClick={() => {
              setCurrentTab(TABS["share"]);
            }}
          >
            اشتراک گذاری
          </Item>

          <Item
            className="text-[#EB5757]"
            onClick={() => {
              setCurrentTab(TABS["delete"]);
            }}
          >
            حذف
          </Item>
        </ItemsWrapper>
      </>
    );
  };

  const deleteTab = () => {
    return (
      <Alert
        sx={{
          padding: "26px 0",
          "& .MuiAlert-icon": {
            display: "none",
          },
          "& .MuiAlert-message": {
            width: "100%",
            textAlign: "center",
          },
        }}
        severity="error"
      >
        <AlertTitle>
          شما در حال حذف کارت {moreSheetDetails.card_title}
        </AlertTitle>
        آیا از حذف این کارت اطمینان دارید؟
        <div className="flex justify-center mt-8">
          <Button variant="contained" color="error" onClick={handleDelete}>
            بله حذف شود
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={() => setCurrentTab(TABS.default)}
          >
            لغو
          </Button>
        </div>
      </Alert>
    );
  };

  const content = () => {
    switch (currentTab) {
      case TABS.default:
        return defaultTab();
      case TABS["share"]:
        return <BottomSheetShareById clickedCardId={moreSheetDetails} />;
      case TABS["delete"]:
        return deleteTab();
      default:
        return <defaultTab />;
    }
  };

  return (
    <>
      {moreSheetDetails !== null && (
        <BottomSheetWrapper
          open={showSheetMore}
          onClose={() => setShowSheetMore(false)}
        >
          {content()}
        </BottomSheetWrapper>
      )}
    </>
  );
};

export default BottomSheetMore;

const ItemsWrapper = tw.div`
  rounded-ss-2xl
  rounded-se-2xl
  z-20
  text-center
  flex
  flex-col
  justify-stretch
  pb-8
`;

const PageTitle = tw.div`
  text-muted
  text-xs
  font-xs
  py-6
  text-center
  mb-4
`;

const Item = tw.div`
  border-b-[1px]
  font-medium
  justify-center
  block
  py-3
  px-4
  font-ravi
  cursor-pointer

  hover:bg-gray-100
`;
