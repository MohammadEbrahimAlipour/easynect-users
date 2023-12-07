import React, { useState } from "react";
import { HeaderBellLogo, HeaderShareLogo } from "./Icons";
import logo from "../../public/icons/easynect icons/headerLogoBlack.svg";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import HeaderShareSheet from "./bottomSheet/header/HeaderShareSheet";
import { useGesture } from "react-use-gesture";

const Header = ({ className = "" }) => {
  const [showSheet, setShowSheet] = useState(false);

  const handleToggleSheet = () => {
    setShowSheet(!showSheet);
  };

  return (
    <>
      <div className={`${className} bg-light pt-12 pb-6 container`}>
        <div className="flex justify-between items-center">
          <span onClick={handleToggleSheet}>
            <HeaderShareLogo />
          </span>
          <Image width={32} src={logo} alt="EasyNect" />
          <HeaderBellLogo />
        </div>
      </div>

      {/* Framer Motion bottom sheet */}
      <div className="w-full flex justify-center items-center">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: showSheet ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-lg rounded-tr-lg rounded-tl-lg w-[90%] absolute bottom-0 z-[999999] overflow-hidden"
        >
          <HeaderShareSheet showSheet={showSheet} />
        </motion.div>
      </div>
    </>
  );
};

export default Header;
