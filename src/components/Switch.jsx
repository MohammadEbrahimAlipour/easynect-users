import { useState } from "react";
import tw from "tailwind-styled-components";

export default function Switch({ isChecked }) {
  return (
    <CircleWrapper $isChecked={isChecked}>
      <Circle $isChecked={isChecked} />
    </CircleWrapper>
  );
}

const CircleWrapper = tw.div`
  bg-slate-300
  w-10
  h-5
  rounded-full
  relative
  cursor-pointer

  transition
  duration-300
  ease-in-out

  ${({ $isChecked }) =>
    $isChecked &&
    `
    bg-black
  `}

`;

const Circle = tw.div`
  w-5
  h-5
  bg-white
  rounded-full
  absolute
  left-0
  scale-75

  transition
  duration-300
  ease-in-out

  ${({ $isChecked }) =>
    $isChecked &&
    `
  translate-x-full
  scale-90
  `}
`;
