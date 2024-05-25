import tw from "tailwind-styled-components";

// components
import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";

export default function RowBottomSheetDelete({ onClose, open, onDelete }) {
  return (
    <BottomSheetWrapper
      className={"flex flex-col"}
      fullWidth
      onClose={onClose}
      open={open}
    >
      <Title>حذف سطر</Title>
      <Description>آیا برای حذف این سطر اطمینان دارید؟</Description>
      <ButtonsWrapper>
        <Button onClick={onDelete}>تایید</Button>
        <Button onClick={onClose}>بستن</Button>
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

const ButtonsWrapper = tw.div`
  flex
  px-4
  pb-4
  gap-2
  w-full
`;

const Button = tw.button`
  bg-black
  text-white
  py-4
  text-md
  rounded-md
  flex-1
`;
