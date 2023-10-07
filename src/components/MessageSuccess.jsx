import React from "react";
import { toast } from "react-toastify";

const MessageSuccess = () => {
  const showToast = () => {
    toast.success(message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "colored"
    });
  };
  return (
    <button onClick={showToast} className="your-button-styles">
      Show Success Toast
    </button>
  );
};

export default MessageSuccess;
