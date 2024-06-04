import { useEffect, useMemo, useState } from "react";
import tw from "tailwind-styled-components";
import { Skeleton } from "@mui/material";
import { toast } from "react-toastify";

// components
import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";
import RowBottomSheetFormatTab from "./RowBottomSheetFormatTab";

// constants
import RowBottomSheetContentPickerTab from "./RowBottomSheetContentPickerTab";
import { POSITIONS, WIDGET_TYPE } from "@/constants";
import RowBottomSheetPositionTab from "./RowBottomSheetPositionTab";

const TABS_NAME = {
  format: "format",
  content: "content",
  position: "position",
};

export default function RowsBottomSheet({
  onClose,
  open,
  onAdd,
  addInPositionMode,
  editingRow,
  contents,
}) {
  const [selectedRowFormat, setSelectedRowFormat] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [widgetsContent, setWidgetsContent] = useState([{}, {}]);
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    if (!open) {
      setWidgetsContent([{}, {}]);
      setCurrentTab(0);
      setSelectedRowFormat(null);
      setSelectedPosition(null);
    }
  }, [open]);

  useEffect(() => {
    if (editingRow !== null) {
      const rowLength = editingRow.length;
      setSelectedRowFormat(
        rowLength === 2 ? WIDGET_TYPE.square : WIDGET_TYPE.rectangle
      );

      setWidgetsContent(() => {
        if (rowLength === 1) return [editingRow?.[0], {}];

        return editingRow;
      });
    }
  }, [editingRow]);

  const handleSelectRowFormat = ({ target: { value } }) => {
    setSelectedRowFormat(value);
  };

  const handleWidgetContent = (content) => {
    setWidgetsContent(content);
  };

  const handleSelectPosition = (position) => {
    setSelectedPosition(position);
  };

  const tabs = useMemo(() => {
    const tabs = [
      {
        [TABS_NAME.format]: {
          title: "قالب",
          description: `
        به تناسب نیاز خود قالب مورد نظر را انتخاب کنید، سپس محتوای خود را در
        قالب قرار دهید.
          `,
          body: () => (
            <RowBottomSheetFormatTab
              onSelectFormat={handleSelectRowFormat}
              selectedFormat={selectedRowFormat}
            />
          ),
        },
      },
      {
        [TABS_NAME.content]: {
          title: "محتوا",
          description: `بر روی باکس مورد نظر کلیک کنید و محتوای خود را انتخاب کنید`,
          body: () => (
            <RowBottomSheetContentPickerTab
              content={widgetsContent}
              onWidgetContentChange={handleWidgetContent}
              widgetType={selectedRowFormat}
              contents={contents}
            />
          ),
        },
      },
    ];

    if (addInPositionMode) {
      tabs.unshift({
        [TABS_NAME.position]: {
          title: "جایگاه",
          description: `جایگاه سطر جدید را انتخاب کنید`,
          body: () => (
            <RowBottomSheetPositionTab
              selectedPosition={selectedPosition}
              onSelectPosition={handleSelectPosition}
            />
          ),
        },
      });
    }

    return tabs;
  }, [addInPositionMode, selectedRowFormat, widgetsContent, selectedPosition]);

  const content = useMemo(() => {
    const tabObject = tabs?.[currentTab];

    if (tabObject === undefined) {
      return undefined;
    }

    const key = Object.keys(tabObject)?.[0];

    return tabObject[key];
  }, [currentTab, tabs]);

  const goToNextTab = () => {
    const currentTabName = Object.keys(tabs[currentTab])[0];

    if (currentTabName === TABS_NAME.format && selectedRowFormat === null) {
      toast.error("خطا، قالب محتوایی خود را انتخاب کنید");

      return;
    }

    if (currentTabName === TABS_NAME.position && selectedPosition === null) {
      toast.error("خطا، جایگاه سطر جدید را انتخاب کنید");

      return;
    }

    setCurrentTab((prevTab) => prevTab + 1);
  };

  const goToPreviousTab = () => {
    setCurrentTab((prevTab) => prevTab - 1);
  };

  const handleSubmit = () => {
    let filledBoxes = 0;

    widgetsContent.forEach(
      (widget) => Object.keys(widget).length && filledBoxes++
    );

    if (filledBoxes === 0) {
      toast.error("خطا، محتوایی انتخاب نشده");
      return;
    }

    if (selectedRowFormat === WIDGET_TYPE.square && filledBoxes < 2) {
      toast.error("در این نوع سطر باید ۲ عدد محتوا انتخاب کنید");
      return;
    }

    let finalContent = widgetsContent;

    if (selectedRowFormat === WIDGET_TYPE.rectangle) {
      finalContent = [widgetsContent[0]];
    }

    onAdd(finalContent, selectedPosition);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <BottomSheetWrapper
      className={"flex flex-col pb-20"}
      fullWidth
      onClose={handleClose}
      open={open}
    >
      <Title>{content?.title}</Title>
      <Description>{content?.description}</Description>
      {content?.body()}
      <ButtonsWrapper>
        {currentTab === tabs.length - 1 && (
          <Button onClick={handleSubmit}>تایید</Button>
        )}
        {currentTab !== tabs.length - 1 && (
          <Button onClick={goToNextTab}>مرحله‌ی بعد</Button>
        )}
        {currentTab !== 0 && (
          <Button onClick={goToPreviousTab}>مرحله‌ی قبل</Button>
        )}
      </ButtonsWrapper>
    </BottomSheetWrapper>
  );
}

const Title = tw.h1`
  text-lg
  text-gray-700
  text-center
  mt-4
`;
const Description = tw.p`
  text-sm
  text-gray-500
  mt-2
  text-center
  mx-12
  mb-8
`;

export const Option = tw.label`
  pb-8
  block
  cursor-pointer
`;

export const Row = tw.div`
  flex
  gap-3
  justify-center
`;

export const MockBox = tw.div`
  rounded-xl
  shadow-xl
  w-28
  h-28
  border-2
  border-gray-100
  p-4
  bg-white

  ${({ $selectable }) =>
    $selectable &&
    `
    shadow-md
    border-2
    cursor-pointer

    transition-all
    ease-in-out
    duration-150
    
    hover:shadow-lg
  `}

  ${({ $selected }) =>
    $selected &&
    `
    border-2
    border-gray-400
  `}

  ${({ $widgetType }) =>
    $widgetType === WIDGET_TYPE.rectangle &&
    `
    flex
    h-20
    w-72
    items-center
  `}
`;

export const MockBoxImage = tw(Skeleton)`
  w-12
  h-12
  mb-2
`;

export const Radio = tw.div`
  w-full
  px-24
  my-2
  mt-4
`;

export const RadioInput = tw.input`
  peer
  hidden
`;

export const RadioLabel = tw.label`
  inline
  text-md
  text-gray-700
  mr-3
  pr-8
  cursor-pointer
  relative

  before:content-['']
  before:inline-block
  before:w-4
  before:h-4
  before:border-2
  before:border-gray-300
  before:rounded-full
  before:content-['']
  before:top-1/2
  before:right-0
  before:-translate-y-1/2
  before:absolute

  after:content-['']
  after:inline-block
  after:w-4
  after:h-4
  after:bg-gray-500
  after:rounded-full
  after:top-1/2
  after:right-0
  after:-translate-y-1/2
  after:absolute
  after:scale-0
  after:opacity-0
  after:transition-all
  after:duration-500
  after:ease-out

  peer-checked:after:opacity-100
  peer-checked:after:scale-75
`;

const ButtonsWrapper = tw.div`
  flex
  px-4
  pb-4
  gap-2
  fixed
  w-full
  bottom-0
`;

const Button = tw.button`
  bg-black
  text-white
  py-4
  text-md
  rounded-md
  flex-1
`;
