import { useState } from "react";
import { MockWidget, MockWidgetImage, Row } from "./RowBottomSheet";
import { Skeleton } from "@mui/material";
import MediaOptions from "./MediaOptions";
import tw from "tailwind-styled-components";

const WIDGETS = {
  left: "left",
  right: "right",
};

const FAKE_MEDIA_DATA = [
  {
    id: "cbfa6e9e-6adc-4d31-bbaa-ec39a395808d",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/icons/defualt.webp",
    is_hide: false,
    title: "Smith-Johnson",
  },
  {
    id: "a54033ba-39bd-4dff-9dcd-01f9dd7da599",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/icons/defualt.webp",
    is_hide: false,
    title: "Watson-Scott",
  },
  {
    id: "db6ee0ac-3b70-4231-b20c-164f5c488cf5",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/icons/defualt.webp",
    is_hide: false,
    title: "Cardenas Group",
  },
  {
    id: "fb9d558a-1609-4c64-8bfc-4242bfa19b5e",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/84d8d860-a4e9-4689-a426-e489083cf638.png",
    is_hide: false,
    title: "شماره کارت",
  },
  {
    id: "bb8b5f57-334a-469d-aeba-c9c0e8b01f73",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/99a60973-77d6-456d-9695-2bdd2df15628.png",
    is_hide: false,
    title: "رزومه‌ی من",
  },
  {
    id: "44a578c8-bc6a-4a43-9c44-a010729bb4c6",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/99a60973-77d6-456d-9695-2bdd2df15628.png",
    is_hide: false,
    title: "یک تصویر",
  },
  {
    id: "adb6e0b2-68c2-4fc4-9d0d-923cda7e3b86",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/3555c84b-83e3-4f4d-88c0-df19c5ab6f4b.png",
    is_hide: false,
    title: "شماره موبایل",
  },
  {
    id: "8f2c7e17-0e5d-4dcd-bde9-60798a0db644",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/7cc0a52d-8fd6-4ba8-b3fc-b9ab8a7b612a.png",
    is_hide: false,
    title: "اینستای من",
  },
  {
    id: "c24c8b55-fe94-4d29-af9b-fca9b0654c0f",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/99a60973-77d6-456d-9695-2bdd2df15628.png",
    is_hide: false,
    title: "کاتالوگ",
  },
];

export default function RowBottomSheetTwinsContentTab({
  content,
  onWidgetContentChange,
}) {
  const [selectedWidget, setSelectedWidget] = useState();

  const handleSelectWidget = (widget) => {
    setSelectedWidget(widget);
  };

  return (
    <>
      <Row className="mb-8">
        <MockWidget
          $selectable
          $selected={selectedWidget === WIDGETS.right}
          onClick={() => handleSelectWidget(WIDGETS.right)}
        >
          <MockWidgetImage variant="circular" animation={false} />
          <Skeleton variant="text" animation={false} />
        </MockWidget>
        <MockWidget
          $selectable
          $selected={selectedWidget === WIDGETS.left}
          onClick={() => handleSelectWidget(WIDGETS.left)}
        >
          <MockWidgetImage variant="circular" animation={false} />
          <Skeleton variant="text" animation={false} />
        </MockWidget>
      </Row>

      <MediaWrapper>
        {FAKE_MEDIA_DATA.map((item) => (
          <MediaOptions key={item.id} item={item} />
        ))}
      </MediaWrapper>
    </>
  );
}

const MediaWrapper = tw.div`
  mx-8
`;
