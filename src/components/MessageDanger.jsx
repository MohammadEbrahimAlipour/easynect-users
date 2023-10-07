import React from "react";
import { toast } from "react-toastify";

const MessageDanger = () => {
  const showToast = () => {
    toast.error("🦄 Wow so easy!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  };
  return (
    <button onClick={showToast} className="your-button-styles">
      Show Success Toast
    </button>
  );
};

export default MessageDanger;
