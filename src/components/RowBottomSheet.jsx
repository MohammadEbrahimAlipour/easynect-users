import { useState } from "react";
import tw from "tailwind-styled-components";
import { Skeleton } from "@mui/material";

// components
import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";

// constants
import { ROW_FORMAT } from "@/constants/layouting";

export default function RowsBottomSheet({ onClose, open }) {
  const [selectedRowFormat, setSelectedRowFormat] = useState(ROW_FORMAT.twins);

  return (
    <BottomSheetWrapper onClose={onClose} open={open}>
      <Title>قالب</Title>
      <Description>
        به تناسب نیاز خود قالب مورد نظر را انتخاب کنید، سپس محتوای خود را در
        قالب قرار دهید.
      </Description>
      <Option>
        <MockWidget></MockWidget>
      </Option>

      <Skeleton animation={false} />
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
`;

const Option = tw.div`

`;

const MockWidget = tw.div`
  rounded-md
  shadow-xl
  bg-gray-500
  w-40
  h-24
`;
