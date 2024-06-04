import React from "react";

const Layout = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full h-fit min-h-screen flex-1 inline-block z-0 bg-light py-8 px-5 pb-24 ${className}`}
    >
      {children}
    </div>
  );
};

export default Layout;
