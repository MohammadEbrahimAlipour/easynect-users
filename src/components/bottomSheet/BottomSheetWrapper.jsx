import { Drawer } from "@mui/material";
import React from "react";
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
  theme,
}) {
  const getStyles = () => {
    let style = {
      width: "calc(100% - 1.5rem)",
      mx: "0.75rem",
      borderTopLeftRadius: "1rem",
      borderTopRightRadius: "1rem",
      height: height || "unset",
      maxHeight: maxHeight || "600px",
      backgroundColor: theme?.cardBackground || "#fff",
      color: theme?.text || "#000",
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
      <Wrapper
        className={className}
        style={{
          backgroundColor: theme?.cardBackground || "#fff",
          color: theme?.text || "#000",
        }}
      >
        {children}
      </Wrapper>
    </Drawer>
  );
}

const Wrapper = tw.div`
  h-full
  w-full
  p-4
  overflow-y-auto
  rounded-t-2xl
`;
