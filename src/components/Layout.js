import React from "react";

const Layout = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full h-fit min-h-screen inline-block z-0 bg-light  ${className}
      py-8 px-5 
      `}
    >
      {children}
    </div>
  );
};

export default Layout;
