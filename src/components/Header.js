import React from "react";
import { HeaderBellLogo, HeaderShareLogo } from "./Icons";
import logo from "../../public/icons/easynect icons/headerLogoBlack.svg";
import Image from "next/image";

const Header = ({ className = "" }) => {
  return (
    <div className={`${className} bg-light pt-12 pb-6 container`}>
      <div className="flex justify-between items-center">
        <HeaderShareLogo />
        <Image width={32} src={logo} alt="EasyNect" />
        <HeaderBellLogo />
      </div>
    </div>
  );
};

export default Header;
