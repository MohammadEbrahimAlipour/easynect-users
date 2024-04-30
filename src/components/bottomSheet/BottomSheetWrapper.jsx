import React from "react";
import { Drawer } from "@mui/material";

const BottomSheetWrapper = ({ onClose, open, children, maxHeight, height }) => {
  return (
    // <div className="flex justify-center items-center max-w-[420px] overflow-hidden">
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "calc(100% - 1.5rem)",
          mx: "0.75rem", // This applies margin-left and margin-right
          borderTopLeftRadius: "1rem", // rounded-lg for top left
          borderTopRightRadius: "1rem", // rounded-lg for top right
          fontFamily: "ravi",
          maxHeight: maxHeight || "600px",
          height: height || "unset",
        },
      }}
    >
      <div
        className="py-2 px-5"
        // TODO: improve padding x axis, it doesn't looks good
      >
        {children}
      </div>
    </Drawer>
    // </div>
  );
};

export default BottomSheetWrapper;
