import React from "react";
import logo from "../../public/icons/easynect icons/headerLogoBlack.svg";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./Icons";
import { useRouter } from "next/router";

const HeaderTwo = ({ href, className = "" }) => {
  const router = useRouter();

  // Function to go back or navigate to a specific route
  const handleNavigation = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <div className={`${className} bg-light pt-12 pb-6 container`}>
      <div className="w-full flex items-center">
        <div className="text-muted flex items-center justify-end">
          <ArrowRight />
          <button className="font-ravi" onClick={handleNavigation}>
            برگشت
          </button>
        </div>

        <div className="absolute left-1/2">
          <Image width={32} src={logo} alt="EasyNect" />
        </div>
      </div>
    </div>
  );
};

export default HeaderTwo;
