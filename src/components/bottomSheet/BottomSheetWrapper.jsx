import { Drawer } from "@mui/material";
import React, { useEffect, useRef } from "react";
import tw from "tailwind-styled-components";

export default function BottomSheetWrapper({
  onClose,
  open,
  children,
  maxHeight,
  height,
  className,
  fullScreen,
  fullWidth,
}) {
  const getStyles = () => {
    let style = {
      width: "calc(100% - 1.5rem)",
      mx: "0.75rem",
      borderTopLeftRadius: "1rem",
      borderTopRightRadius: "1rem",
      height: height || "unset",
      maxHeight: maxHeight || "600px",
    };

    if (fullScreen) {
      style = {
        ...style,
        width: "100%",
        height: "100%",
        maxHeight: "unset",
        mx: "unset",
        borderTopLeftRadius: "unset",
        borderTopRightRadius: "unset",
      };
    }

    if (fullWidth) {
      style = {
        ...style,
        width: "100%",
        mx: "0",
      };
    }

    return {
      "& .MuiDrawer-paper": style,
    };
  };

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose} sx={getStyles()}>
      <Wrapper className={className}>{children}</Wrapper>
    </Drawer>
  );
}

const Wrapper = tw.div`
  h-full
  w-full
`;
