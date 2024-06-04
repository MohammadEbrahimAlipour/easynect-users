import Image from "next/image";
import tw from "tailwind-styled-components";

// files
import BaseTickSuccessIcon from "@/assets/icons/tick-success.svg";

export default function EditProfileInfoLanguageItem({
  language,
  onSelect,
  active,
}) {
  return (
    <Wrapper $active={active} onClick={() => onSelect(language.name)}>
      <Title $active={active}>
        {language.name} | {language.label}
      </Title>
      <TickSuccessIcon $active={active} />
    </Wrapper>
  );
}

const Wrapper = tw.div`
  bg-lightMenu
  rounded-lg
  border-2
  box-border
  flex
  items-center
  p-1
  py-3
  cursor-pointer
  relative

  transition
  duration-300
  ease-in-out

  ${({ $active }) =>
    $active &&
    `
    bg-white
    border-black
  `}
`;

const Title = tw.h5`
  text-black
  text-xl
  flex-1
  uppercase
  ps-2

  ${({ $active }) =>
    $active &&
    `
    font-bold
  `}
`;

const TickSuccessIcon = tw(BaseTickSuccessIcon)`
  w-7
  opacity-0
  absolute
  top-1/2
  left-3
  -translate-y-1/2

  transition
  duration-300
  ease-in-out

  ${({ $active }) =>
    $active &&
    `
  opacity-100 
  `}
`;
