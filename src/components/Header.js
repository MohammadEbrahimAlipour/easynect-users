import React, { useState } from "react";
import { HeaderBellLogo, HeaderShareLogo } from "./Icons";
import logo from "../../public/icons/easynect icons/headerLogoBlack.svg";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useGesture } from "react-use-gesture";
import HeaderShareBSheet from "./bottomSheet/header/HeaderShareBSheet";

const Header = ({ className = "" }) => {
  const [showSheet, setShowSheet] = useState(false);

  const handleToggleSheet = () => {
    setShowSheet(!showSheet);
  };

  return (
    <>
      <div className={`${className} bg-light pt-12 pb-6 container`}>
        <div className="flex justify-start relative">
          <span onClick={handleToggleSheet}>
            <HeaderShareLogo />
          </span>
          <span className="absolute left-[50%] ">
            <Image width={32} src={logo} alt="EasyNect" />
          </span>
          {/* <HeaderBellLogo /> */}
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <HeaderShareBSheet showSheet={showSheet} setShowSheet={setShowSheet} />
      </div>
    </>
  );
};

export default Header;
