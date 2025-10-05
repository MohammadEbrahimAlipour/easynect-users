import { useMemo, useState } from "react";
import BaseImage from "next/image";
import tw from "tailwind-styled-components";

// components
import CopyButton from "@/components/publicPageView/CopyButton";
import FilePreviewBottomSheet from "@/components/FilePreviewBottomSheet";

// utils
import { checkIsPDForImage, downloadFile } from "@/utils/file";

// constants
import { WIDGET_TYPE } from "@/constants";

export default function Box({
  data,
  handleCountingItemClicks,
  containerDisplayType,
  theme, // ← اضافه شد
}) {
  const { sub_order, type, title, content_val, s3_icon_url, description } =
    data || {};

  const [isPreviewSheetOpen, setIsPreviewSheetOpen] = useState(false);
  const [currentFileURL, setCurrentFileURL] = useState(null);

  const handleSquareTypeDetection = () => {
    if (!handleCountingItemClicks(data)) return;
    if (!data) return;

    if (data.type === "phone" && data.content_val) {
      window.location.href = `tel:${data.content_val}`;
    } else if (data.type === "link" && data.content_val) {
      window.open(data.content_val, "_blank", "noopener,noreferrer");
    } else if (data.type === "file" && data.content_val) {
      if (checkIsPDForImage(data.content_val)) {
        setCurrentFileURL(data.content_val);
        setIsPreviewSheetOpen(true);
        return;
      }
      downloadFile(data.content_val);
    } else if (data.type === "email" && data.content_val) {
      window.location.href = `mailto:${data.content_val}`;
    }
  };

  const handleBottomSheetClose = () => {
    setIsPreviewSheetOpen(false);
  };

  const imageSize = useMemo(
    () => (containerDisplayType === WIDGET_TYPE.square ? 40 : 30),
    [containerDisplayType]
  );

  if (!data) return null;

  return (
    <>
      <Wrapper
        onClick={handleSquareTypeDetection}
        style={{
          "--order": sub_order,
          backgroundColor: theme?.cardBackground || "#fff", // ← بک‌گراند Box
        }}
        $type={containerDisplayType}
      >
        {type === "string" && (
          <CopyButton
            title={title}
            content={content_val}
            theme={theme} // ← پاس دادن theme به CopyButton
          />
        )}

        <ImageWrapper $type={containerDisplayType}>
          <BaseImage
            src={s3_icon_url}
            alt={title || ""}
            width={imageSize}
            height={imageSize}
          />
        </ImageWrapper>

        <Title $type={containerDisplayType} $theme={theme}>
          {title}
        </Title>

        {containerDisplayType === WIDGET_TYPE.square && (
          <Description $theme={theme}>{description}</Description>
        )}
      </Wrapper>

      <FilePreviewBottomSheet
        url={currentFileURL}
        isOpen={isPreviewSheetOpen}
        onClose={handleBottomSheetClose}
      />
    </>
  );
}

const Wrapper = tw.div`
  px-4
  pt-3
  border-2
  rounded-2xl
  overflow-hidden
  relative
  flex-1
  order-[var(--order)]
  ${({ $type }) =>
    $type === WIDGET_TYPE.rectangle &&
    `
    pb-3
    flex
    items-center
    text-xs
    whitespace-nowrap
  `}
`;

const ImageWrapper = tw.div`
  w-[45px]
  h-[45px]
  rounded-full
  mb-3
  flex
  justify-center
  items-center

  ${({ $type }) =>
    $type === WIDGET_TYPE.rectangle &&
    `
    mb-0
    w-[32px]
    h-[32px]
    rounded-md
  `}
`;

const Title = tw.div`
  font-medium
  text-xs
  ${({ $theme }) => `
    color: ${$theme?.cardText || '#333'}
  `}

  ${({ $type }) =>
    $type === WIDGET_TYPE.rectangle &&
    `
    ms-4
    overflow-hidden
  `}
`;

const Description = tw.div`
  font-medium
  text-xs
  mt-2
  mb-5
  line-clamp-2
  ${({ $theme }) => `
    color: ${$theme?.cardText || '#777'}
  `}
`;
