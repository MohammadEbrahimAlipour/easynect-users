import { useState } from "react";
import tw from "tailwind-styled-components";

// components
import Switch from "@/components/Switch";

export default function SwitchTile({ children, isChecked, onToggle }) {
  return (
    <Wrapper onClick={onToggle}>
      <Label>{children}</Label>
      <Switch isChecked={isChecked} />
    </Wrapper>
  );
}

const Wrapper = tw.div`
  flex
  justify-between
  py-3
  cursor-pointer
`;

const Label = tw.p`
  text-muted
  whitespace-nowrap
`;
