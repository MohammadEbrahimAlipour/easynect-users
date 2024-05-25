import { useMemo, useState } from "react";
import { MockBox as Box, MockBoxImage, Row } from "./RowBottomSheet";
import { Skeleton } from "@mui/material";
import tw from "tailwind-styled-components";
import BaseImage from "next/image";
import { deepCopy } from "@/utils";
import { WIDGET_TYPE } from "@/constants";

const BOXES = {
  left: 1,
  right: 0,
};

export default function RowBottomSheetContentPickerTab({
  content,
  onWidgetContentChange,
  widgetType,
  contents,
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

    item.content_id = item.id;
    item.key = `${item.id}${selectedBox}`;

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

  const displayMock = () => {
    return (
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
    );
  };

  const displayBoxContent = (boxContent, hasData) => {
    return hasData ? (
      <>
        <ImageWrapper $widgetType={widgetType}>
          <Image
            src={boxContent?.s3_icon_url}
            alt={boxContent?.title || ""}
            width={25}
            height={25}
          />
        </ImageWrapper>
        <Title $widgetType={widgetType}>{boxContent?.title}</Title>
        {widgetType === WIDGET_TYPE.square && (
          <Description>
            {boxContent?.description ? boxContent?.description : "بدون توضیح"}
          </Description>
        )}
      </>
    ) : (
      displayMock()
    );
  };

  return (
    <Wrapper>
      <BoxesWrapper>
        {Object.keys(boxes).map((key) => {
          let hasData = false;
          const boxDirection = BOXES[key];

          if (content?.[boxDirection]?.title) hasData = true;

          const boxContent = content[boxDirection];

          return (
            <Box
              key={key}
              $selectable
              $selected={selectedBox === boxDirection}
              $widgetType={widgetType}
              onClick={() => handleSelectWidget(boxDirection)}
            >
              {displayBoxContent(boxContent, hasData)}
            </Box>
          );
        })}
      </BoxesWrapper>

      <ContentsWrapper>
        {contents.map((item) => {
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
