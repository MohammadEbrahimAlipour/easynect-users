import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProfileImage from "./ProfileImage";
import AccessoryConnect from "./AccessoryConnect";
import { useGesture } from "react-use-gesture";
import { CardsCardIcon, CardsWifiIcon } from "./Icons";
import CardQrCode from "./CardQrCode";
import { useAccessToken } from "../../context/AccessTokenContext";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import LoadingState from "./LoadingState";

const ProfileCardExist = ({
  cardData,
  carouselData,
  idFromServer,
  className = ""
}) => {
  const [showCardQrCode, setShowCardQrCode] = useState(false);
  const isCardSelected = cardData.id === idFromServer;

  // swip  function
  const bind = useGesture({
    onDrag: ({ last, movement: [, my] }) => {
      if (showAccessoryConnect && last && my > 50) {
        // Close the entire component when pulled down
        setShowAccessoryConnect(false);
        setShowSubMenu(false);
      }
    }
  });

  // close CardQrCode
  const closeCardQrCode = () => {
    console.log("closeCardQrCode called");
    setShowCardQrCode(false);
  };

  const toggleCardQrCode = () => {
    setShowCardQrCode(!showCardQrCode); // Toggle the CardQrCode component
    setShowSubMenu(false); // Close the main submenu
  };

  // close accessory btn
  const closeAccessoryConnect = () => {
    setShowAccessoryConnect(false);
  };
  // sub menu for more
  const [showSubMenu, setShowSubMenu] = useState(false);
  // sub menu for share
  const [showSubAccessory, setShowSubAccessory] = useState(false);
  // State variable to control the visibility of the AccessoryConnect component
  const [showAccessoryConnect, setShowAccessoryConnect] = useState(false);

  const toggleSubMenu = () => {
    if (!showAccessoryConnect) {
      setShowSubMenu(!showSubMenu);
    }
  };

  const toggleAccessoryConnect = () => {
    setShowAccessoryConnect(!showAccessoryConnect);
    setShowSubMenu(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        (showSubMenu || showSubAccessory) &&
        !e.target.closest(".submenu-container")
      ) {
        setShowSubMenu(false);
        setShowSubAccessory(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showSubMenu, showSubAccessory]);

  const SubMenuOptions = ({ title, onClick, className = "" }) => {
    return (
      <div className={`${className} border-b font-medium flex justify-center`}>
        <button
          onClick={onClick}
          className={`block py-2 px-4 hover:bg-gray-100 font-normal font-ravi text-sm`}
        >
          {title}
        </button>
      </div>
    );
  };

  return (
    <>
      <div className={`submenu-container w-full relative  ${className}`}>
        {/* carousel items */}
        {carouselData.map((card, index) => (
          <Carousel
            key={index}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            infiniteLoop={false}
            verticalSwipe="standard"
            className={`rounded-lg w-full bg-white  ${
              isCardSelected ? "" : "" // classes for selected carousels
            }`}
          >
            <div className="p-5 relative">
              {/* two items left side */}
              <div className=" absolute left-5 top-5">
                {/* circle */}
                <div className="w-[28px] h-[28px] bg-black rounded-full flex justify-center items-center ">
                  <CardsWifiIcon />
                </div>

                <div
                  className="w-[28px] h-[24px] bg-white rounded-md mt-3 flex flex-col
                justify-start "
                >
                  <div className="w-full h-[40%] rounded-se-md rounded-ss-md">
                    <CardsCardIcon />
                  </div>
                </div>
              </div>

              {/* profile items right side */}
              <div className="">
                {/* profile photo */}
                <div className="w-[80px] h-[80px] bg-mutedDark rounded-full opacity-90 mb-4 overflow-hidden">
                  <ProfileImage
                    id={cardData.id}
                    src={cardData.profile_s3_url}
                  />
                </div>
                {/* box under profile */}
                <div className="mb-2 text-xl font-semibold">
                  <p className="text-start">{cardData.card_title}</p>
                </div>
                {/* smaller line */}
                <div className="text-xs text-muted">
                  <p className="text-right">{cardData.job_title}</p>
                </div>
              </div>
            </div>

            {/* bottom section */}
            <div className="pb-5 border-t-[1px] w-full">
              <div className="grid grid-cols-12">
                <div className="mt-5 mx-4 flex justify-center items-center col-span-10">
                  {/* box right 1 */}
                  <Link
                    href={`/app/cards/editProfileInfo?id=${cardData.id}`}
                    passHref
                    className="w-[28%] h-[32px] border-2 rounded-md flex justify-center items-center"
                  >
                    <div>
                      <p className="text-xs">ویرایش</p>
                    </div>
                  </Link>

                  {/* box right 2 */}
                  <div className="w-[46%] h-[32px] mx-1 border-2 rounded-md flex justify-center items-center">
                    <button className="text-xs">اشتراک گذاری</button>
                  </div>

                  {/* box right 3 */}
                  <Link
                    href="/"
                    passHref
                    className="w-[22%] h-[32px] border-2 rounded-md flex justify-center items-center"
                  >
                    <div>
                      <p className="text-xs">آمار</p>
                    </div>
                  </Link>
                </div>
                {/* left side more icon */}
                <button
                  href="/"
                  className="border-2 w-[32px] h-[32px] rounded-md col-span-2 mt-5
            flex justify-center items-center"
                  onClick={toggleSubMenu}
                >
                  ...
                </button>
              </div>
            </div>

            {/* end of buttom secrion */}
          </Carousel>
        ))}
      </div>

      {/* sub menu */}
      {showSubMenu && (
        <ul
          className={`fixed bottom-0 right-0 left-0 mx-2 space-y-1 shadow-sm 
        rounded-ss-2xl rounded-se-2xl z-20 text-center bg-white transition-all duration-300 ${
          showSubMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        >
          {/* title */}
          <li>
            <SubMenuOptions
              title="test"
              className="text-muted text-xs font-xs"
            />
          </li>
          {/* options */}
          <li className="border-b py-2 font-normal text-sm">
            <Link href={`/appNect/lead/lead?id=${cardData.id}`}>فرم لید</Link>
          </li>

          <li className="border-b py-2 font-normal text-sm">
            <Link href={`/appNect/lead/order?id=${cardData.id}`}>فرم سفارش</Link>
          </li>

          <li>
            <SubMenuOptions
              title="اشتراک گذاری کارت"
              onClick={toggleCardQrCode}
            />
          </li>
          <li>
            <SubMenuOptions title="کپی کردن کارت" />
          </li>

          <li className="border-b-[1px] font-medium ">
            <SubMenuOptions
              title="اتصال اکسسوری"
              onClick={toggleAccessoryConnect}
            />
          </li>

          {/* delete option */}
          <li>
            <SubMenuOptions title="غیر فعال سازی" className="text-[#EB5757]" />
          </li>
        </ul>
      )}

      {/* sub menu Accessory */}
      {showAccessoryConnect && (
        <div {...bind}>
          <div
            className={`fixed bottom-0 right-0 left-0 mx-2 space-y-1 shadow-sm 
        rounded-ss-2xl rounded-se-2xl z-20 text-center bg-white ${
          showAccessoryConnect ? "block" : "hidden"
        } `}
          >
            <div className="">
              <AccessoryConnect onClose={closeAccessoryConnect} />
            </div>
          </div>
        </div>
      )}

      {/* cardQrCode */}

      <div
        className={`fixed bottom-0 right-0 left-0 mx-2 space-y-1  
      rounded-ss-2xl rounded-se-2xl z-20 text-center bg-white drop-shadow-2xl ${
        showCardQrCode ? "block" : "hidden"
      } `}
      >
        <div className="">
          <CardQrCode closeCardQrCode={closeCardQrCode} />
        </div>
      </div>
    </>
  );
};

export default ProfileCardExist;
