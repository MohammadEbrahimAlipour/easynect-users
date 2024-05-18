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
}) {
  const { sub_order, type, title, content_val, s3_icon_url, description } =
    data;

  const [isPreviewSheetOpen, setIsPreviewSheetOpen] = useState(false);
  const [currentFileURL, setCurrentFileURL] = useState(null);

  const handleSquareTypeDetection = () => {
    if (!handleCountingItemClicks(data)) {
      return;
    }

    if (!data) return;

    if (data.type === "phone" && data.content_val) {
      const telLink = `tel:${data.content_val}`;
      window.location.href = telLink;
    } else if (data.type === "link" && data.content_val) {
      const externalLink = data.content_val;
      window.open(externalLink, "_blank", "noopener,noreferrer");
    } else if (data.type === "file" && data.content_val) {
      const isPDForImage = checkIsPDForImage(data.content_val);

      if (isPDForImage) {
        setCurrentFileURL(data.content_val);
        setIsPreviewSheetOpen(true);
        return;
      }

      downloadFile(data.content_val);
    } else if (data.type === "email" && data.content_val) {
      const emailLink = `mailto:${data.content_val}`;
      window.location.href = emailLink;
    }
  };

  const handleBottomSheetClose = () => {
    setIsPreviewSheetOpen(false);
  };

  const imageSize = useMemo(
    () => (containerDisplayType === WIDGET_TYPE.square ? 32 : 22),
    [containerDisplayType]
  );

  return (
    <>
      <Wrapper
        onClick={handleSquareTypeDetection}
        style={{ "--order": sub_order }}
        $type={containerDisplayType}
      >
        {type === "string" && (
          <CopyButton title={title} content={content_val} />
        )}

        <ImageWrapper $type={containerDisplayType}>
          <Image
            src={s3_icon_url}
            alt={title || ""}
            width={imageSize}
            height={imageSize}
          />
        </ImageWrapper>
        <Title $type={containerDisplayType}>{title}</Title>
        {containerDisplayType === WIDGET_TYPE.square && (
          <Description>{description}</Description>
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
  bg-dark
  w-[45px]
  h-[45px]
  rounded-full
  mb-3
  flex
  justify-center
  items-center
  overflow-hidden


  ${({ $type }) =>
    $type === WIDGET_TYPE.rectangle &&
    `
    mb-0
    w-[32px]
    h-[32px]
    rounded-md
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
  text-muted
  mt-2
  mb-5
  line-clamp-2
`;
