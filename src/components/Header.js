import React, { useState } from "react";
import { HeaderShareLogo } from "./Icons";
import logo from "../../public/icons/easynect icons/headerLogoBlack.svg";
import Image from "next/image";

import HeaderShareBSheet from "./bottomSheet/header/HeaderShareBSheet";

const Header = ({ className = "" }) => {
  const [showSheet, setShowSheet] = useState(false);

  const handleToggleSheet = () => {
    setShowSheet(!showSheet);
  };

  return (
    <>
      <div className={`${className} bg-light pt-12 pb-6 px-4`}>
        <div className="flex justify-start relative">
          <span onClick={handleToggleSheet}>
            <HeaderShareLogo />
          </span>
          <span className="absolute left-[50%] w-[32px] h-[32px] ">
            <Image width={32} height={32} src={logo} alt="EasyNect" />
          </span>
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <HeaderShareBSheet showSheet={showSheet} setShowSheet={setShowSheet} />
      </div>
    </>
  );
};

export default Header;
