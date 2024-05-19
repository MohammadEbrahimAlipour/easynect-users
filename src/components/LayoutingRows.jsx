import tw from "tailwind-styled-components";
import BaseImage from "next/image";

import { MockBox as BaseBox } from "./RowBottomSheet";

// files
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import ArrowUpIcon from "@/assets/icons/arrow-up.svg";
import PencilIcon from "@/assets/icons/pencil.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import PlusIcon from "@/assets/icons/plus.svg";
import { WIDGET_TYPE } from "@/constants";

export default function LayoutingRows({
  rows,
  onMoveUp,
  onMoveDown,
  onAddOnPosition,
}) {
  return (
    <Rows>
      {rows.map((row, idx) => {
        const { id, content: boxes } = row;

        const isFirstRow = idx === 0;
        const isLastRow = idx === rows.length - 1;

        const widgetType =
          boxes.length === 2 ? WIDGET_TYPE.square : WIDGET_TYPE.rectangle;

        return (
          <Row key={row.id}>
            <Controllers className="gap-8">
              <Button $disable={isFirstRow} onClick={() => onMoveUp(id, idx)}>
                <ArrowUpIcon className="w-4" />
              </Button>
              <Button $disable={isLastRow} onClick={() => onMoveDown(id, idx)}>
                <ArrowDownIcon className="w-4" />
              </Button>
            </Controllers>
            <ContentWrapper>
              {boxes.map((box) => {
                const { s3_icon_url, title, description, id } = box;

                return (
                  <Box
                    key={id}
                    $widgetType={widgetType}
                    onClick={() => handleSelectWidget(boxDirection)}
                  >
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
                  </Box>
                );
              })}
            </ContentWrapper>
            <Controllers>
              <Button>
                <PencilIcon className="w-4" />
              </Button>
              <Button>
                <TrashIcon className="w-4" />
              </Button>
              <Button onClick={() => onAddOnPosition(idx)}>
                <PlusIcon className="w-4" />
              </Button>
            </Controllers>
          </Row>
        );
      })}
    </Rows>
  );
}

const Rows = tw.div`
  px-4
  flex
  flex-col
`;

const Row = tw.div`
  flex
  items-center
  gap-4
  pb-4
  pt-4
  border-b

  last:border-b-0
`;

const Controllers = tw.div`
  flex
  flex-col
  gap-4
`;

const Button = tw.button`
  text-gray-400

  transition-all
  duration-150
  ease-out

  ${({ $disable }) =>
    !$disable &&
    `
    visit:text-gray-800
  `}

  ${({ $disable }) =>
    $disable &&
    `
    opacity-30
  `}
`;

const ContentWrapper = tw.div`
  flex-1
  flex
  justify-center
  gap-6
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

const Box = tw(BaseBox)`
  ${({ $widgetType }) =>
    $widgetType === WIDGET_TYPE.rectangle &&
    `
    w-64
  `}
`;
