import Image from "next/image";
import tw from "tailwind-styled-components";

// files
import BaseTickSuccessIcon from "@/assets/icons/tick-success.svg";

export default function EditProfileInfoRedirectFormLink({
  data,
  onSelect,
  active,
}) {
  const { title, description, s3_icon_url: icon } = data;

  return (
    <Wrapper $active={active} onClick={() => onSelect(data)}>
      <Image alt="icon" width={40} height={40} src={icon} />
      <Details $active={active}>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Details>
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
  justify-start
  items-center
  p-1
  cursor-pointer

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

const Details = tw.div`
  border-s-2
  border-slate-300
  ps-3
  ms-2

  transition
  duration-300
  ease-in-out

  ${({ $active }) =>
    $active &&
    `
    border-black
  `}
`;

const Title = tw.h5`
  text-black
  text-base
`;

const Description = tw.p`
  text-slate-500
  text-sm
`;

const TickSuccessIcon = tw(BaseTickSuccessIcon)`
  w-7
  ms-auto
  me-2
  opacity-0

  transition
  duration-300
  ease-in-out

  ${({ $active }) =>
    $active &&
    `
  opacity-100 
  `}
`;
