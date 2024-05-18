import { useMemo, useState } from "react";
import { MockBox as Box, MockBoxImage, Row } from "./RowBottomSheet";
import { Skeleton } from "@mui/material";
import tw from "tailwind-styled-components";
import BaseImage from "next/image";
import { deepCopy } from "@/utils";
import { WIDGET_TYPE } from "@/constants";

const FAKE_MEDIA_DATA = [
  {
    id: "cbfa6e9e-6adc-4d31-bbaa-ec39a395808d",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/icons/defualt.webp",
    is_hide: false,
    title: "Smith-Johnson",
    description: "اسمیت جانسون توضیحات بلا بلا",
  },
  {
    id: "a54033ba-39bd-4dff-9dcd-01f9dd7da599",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/icons/defualt.webp",
    is_hide: false,
    title: "Watson-Scott",
    description: "وات سون اسکات توضیحات لاب لاب",
  },
  {
    id: "db6ee0ac-3b70-4231-b20c-164f5c488cf5",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/icons/defualt.webp",
    is_hide: false,
    title: "Cardenas Group",
    description: "توضیحات کاردانس گروه لورم ایپسوم برای دیگر",
  },
  {
    id: "fb9d558a-1609-4c64-8bfc-4242bfa19b5e",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/84d8d860-a4e9-4689-a426-e489083cf638.png",
    is_hide: false,
    title: "شماره کارت",
    description: "وات سون اسکات توضیحات لاب لاب",
  },
  {
    id: "bb8b5f57-334a-469d-aeba-c9c0e8b01f73",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/99a60973-77d6-456d-9695-2bdd2df15628.png",
    is_hide: false,
    title: "رزومه‌ی من",
    description: "اسمیت جانسون توضیحات بلا بلا",
  },
  {
    id: "44a578c8-bc6a-4a43-9c44-a010729bb4c6",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/99a60973-77d6-456d-9695-2bdd2df15628.png",
    is_hide: false,
    title: "یک تصویر",
    description: "وات سون اسکات توضیحات لاب لاب",
  },
  {
    id: "adb6e0b2-68c2-4fc4-9d0d-923cda7e3b86",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/3555c84b-83e3-4f4d-88c0-df19c5ab6f4b.png",
    is_hide: false,
    title: "شماره موبایل",
    description: "وات سون اسکات توضیحات لاب لاب",
  },
  {
    id: "8f2c7e17-0e5d-4dcd-bde9-60798a0db644",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/7cc0a52d-8fd6-4ba8-b3fc-b9ab8a7b612a.png",
    is_hide: false,
    title: "اینستای من",
    description: "اسمیت جانسون توضیحات بلا بلا",
  },
  {
    id: "c24c8b55-fe94-4d29-af9b-fca9b0654c0f",
    s3_icon_url:
      "https://easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir/users/contents_store/icons/99a60973-77d6-456d-9695-2bdd2df15628.png",
    is_hide: false,
    title: "کاتالوگ",
    description: "وات سون اسکات توضیحات لاب لاب",
  },
];

const BOXES = {
  left: 1,
  right: 0,
};

export default function RowBottomSheetContentPickerTab({
  content,
  onWidgetContentChange,
  widgetType,
}) {
  const [selectedBox, setSelectedBox] = useState(BOXES.right);

  const boxes = useMemo(() => {
    if (widgetType === WIDGET_TYPE.rectangle) {
      return { right: 0 };
    }

    return BOXES;
  }, []);

  const handleSelectWidget = (boxDirection) => {
    setSelectedBox(boxDirection);
  };

  const handleChooseContent = (item) => {
    const newContent = deepCopy(content);
    newContent[selectedBox] = item;

    onWidgetContentChange(newContent);

    if (
      selectedBox === BOXES.right &&
      Object.keys(newContent[BOXES.left]).length === 0 &&
      widgetType === WIDGET_TYPE.square
    ) {
      setSelectedBox(BOXES.left);
    }
  };

  return (
    <Wrapper>
      <BoxesWrapper>
        {Object.keys(boxes).map((key) => {
          let hasData = false;
          const boxDirection = BOXES[key];

          if (content?.[boxDirection]?.title) hasData = true;

          const { s3_icon_url, title, description } = content[boxDirection];

          return (
            <Box
              key={key}
              $selectable
              $selected={selectedBox === boxDirection}
              $widgetType={widgetType}
              onClick={() => handleSelectWidget(boxDirection)}
            >
              {hasData ? (
                <>
                  <ImageWrapper $widgetType={widgetType}>
                    <Image
                      src={s3_icon_url}
                      alt={title || ""}
                      width={25}
                      height={25}
                    />
                  </ImageWrapper>
                  <Title $widgetType={widgetType}>{title}</Title>
                  {widgetType === WIDGET_TYPE.square && (
                    <Description>
                      {description ? description : "بدون توضیح"}
                    </Description>
                  )}
                </>
              ) : (
                <>
                  {widgetType === WIDGET_TYPE.square ? (
                    <>
                      <MockBoxImage variant="circular" animation={false} />
                      <Skeleton variant="text" animation={false} />
                    </>
                  ) : (
                    <>
                      <MockBoxImage variant="circular" animation={false} />
                      <div className="flex-1 mr-4">
                        <Skeleton animation={false} />
                        <Skeleton variant="text" animation={false} />
                      </div>
                    </>
                  )}
                </>
              )}
            </Box>
          );
        })}
      </BoxesWrapper>

      <ContentsWrapper>
        {FAKE_MEDIA_DATA.map((item) => {
          return (
            <Content key={item.id} onClick={() => handleChooseContent(item)}>
              <ContentImageWrapper>
                <ContentImage
                  alt="icon"
                  src={item.s3_icon_url}
                  width={60}
                  height={60}
                />
              </ContentImageWrapper>
              <ContentTitle>{item.title}</ContentTitle>
            </Content>
          );
        })}
      </ContentsWrapper>
    </Wrapper>
  );
}

const Wrapper = tw.div``;

const ContentsWrapper = tw.div`
  mx-8
`;

const BoxesWrapper = tw.div`
  flex
  gap-3
  justify-center
  mb-8
  sticky
  top-4
  z-1
  flex-row-reverse
`;

const Content = tw.div`
  rounded-lg
  mb-3
  border-2
  box-border
  overflow-hidden
  flex
  justify-start
  items-center
  p-3
  gap-3
  cursor-pointer
`;

const ContentTitle = tw.div`
  flex
  flex-row
  w-full
  justify-between
  items-center
  pe-3
  outline-0
  font-semibold
  text-sm
`;

const ContentImageWrapper = tw.div`
  w-[28px]
  h-[28px]
  bg-dark
  rounded-lg
`;

const ContentImage = tw(BaseImage)`
  invert
  p-1
  rounded-lg
  mb-2
`;

const ImageWrapper = tw.div`
  bg-dark
  w-[35px]
  h-[35px]
  rounded-full
  mb-3
  flex
  justify-center
  items-center
  overflow-hidden

  ${({ $widgetType }) =>
    $widgetType === WIDGET_TYPE.rectangle &&
    `
  mb-0 
  `}
`;

const Image = tw(BaseImage)`
  bg-white
  invert
`;

const Title = tw.div`
  font-medium
  text-xs
  text-dark
  truncate

  ${({ $widgetType }) =>
    $widgetType === WIDGET_TYPE.rectangle &&
    `
  mr-2 
  `}
`;

const Description = tw.div`
  font-medium
  text-xs
  text-muted
  truncate
`;
