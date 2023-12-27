import React from "react";
import { Drawer } from "@mui/material";

const BottomSheetWrapper = ({ onClose, open, children }) => {
  return (
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
          maxHeight: "600px"
        }
      }}
    >
      <div className="py-2 px-5">{children}</div>
    </Drawer>
  );
};

export default BottomSheetWrapper;
