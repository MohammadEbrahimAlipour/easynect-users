import React from "react";

const Layout = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full h-screen inline-block z-0 bg-light  py-32 ${className}
      xl:py-24 xl:px-5 lg:p-16 md:p-12 sm:py-8 sm:px-5 
      `}
    >
      {children}
    </div>
  );
};

export default Layout;
