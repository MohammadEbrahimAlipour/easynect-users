import React from "react";
import InfoSocialMediaSquare from "@/components/InfoSocialMediaSquare";
import PortfolioLink from "@/components/PortfolioLink";
import ProfileImage from "@/components/ProfileImage";
import ClientPageFooter from "@/components/ClientPageFooter";
import HorzCarousel from "@/components/infoCarousel/HorzCarousel";
import Layout from "@/components/Layout";
import sampleImage from "../../public/images/NIKBAKHT.png";
import { useAccessToken } from "../../context/AccessTokenContext";
import Link from "next/link";
import {
  Instagram,
  Maps,
  MapsSmall,
  Phone,
  PortfolioLinkIcon,
  Telegram,
  WebsiteSmall
} from "@/components/Icons";

const NikbakhtPrint = () => {
  const handleSaveContact = () => {
    // Create a new vCard
    const vCardString = `
BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:چاپ و تبلیغات نیکبخت
ORG;CHARSET=UTF-8:چاپ و تبلیغات نیکبخت
TEL:05138842010
TEL:09150032020
TEL:09150042020
EMAIL:nikbakhtprint@gmail.com
URL:https://nikbakhtprint.com/
URL:https://www.instagram.com/nikbakhtprint/
URL:https://t.me/nikbakhtprint
URL:https://maps.app.goo.gl/mJSte6hmxcvH6ToJ7



END:VCARD
    `;

    // andnoiasidn aindians inains d adnaid

    // Download the vCard
    const blob = new Blob([vCardString], {
      type: "text/vcard"
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact.vcf"; // Set the filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10">
        <div
          id="photo_here"
          className=" box-contentw-[80px] h-[80px] rounded-full
                      overflow-hidden flex items-center justify-center"
        >
          <ProfileImage src={sampleImage} width={80} height={80} />
        </div>
        <p className="mt-3 text-xl font-semibold"> چاپ و تبلیغات نیکبخت</p>
        <p className="text-muted mt-2 font-medium text-xs">
          چاپ و تبلیغات نیکبخت
        </p>
      </div>
      {/* horizontal scroll menu */}
      <div className="grid grid-flow-col justify-center items-center w-full">
        <div className="my-10 overflow-x-hidden overscroll-y-contain ">
          <HorzCarousel />
        </div>
      </div>
      <Layout className="!bg-white !py-0 !h-fit">
        {/* save btn */}
        <button
          onClick={handleSaveContact}
          className="bg-dark text-white text-sm font-bold w-full h-[44px] rounded-[8px]"
        >
          ذخیره مخاطب
        </button>

        {/* square section */}
        <div className=" mt-5">
          <div className="grid grid-cols-2 gap-5">
            <InfoSocialMediaSquare
              href="https://www.instagram.com/nikbakhtprint"
              title="اینستاگرام"
              address="@nikbakhtprint"
              icon={<Instagram />}
            />

            <InfoSocialMediaSquare
              href="https://t.me/nikbakhtprint"
              title="تلگرام"
              address="@nikbakhtprint"
              icon={<Telegram />}
            />
            {/* </Link> */}
          </div>
        </div>

        {/* portfolio section */}
        <div className="mt-5">
          <div>
            {/* <PortfolioLink title="آدرس : هاشمیه 62 پلاک 62 چاپ نیک بخت" /> */}

            <div>
              <Link
                target="_blank"
                href="https://maps.app.goo.gl/mJSte6hmxcvH6ToJ7"
                className="flex items-center px-4 py-3 border-2 rounded-2xl "
              >
                <div className="w-[32px] h-[32px] bg-dark rounded-md flex justify-center items-center">
                  <MapsSmall />
                </div>
                <p className="font-semibold text-xs ms-3">
                  آدرس : هاشمیه 62 پلاک 62 چاپ نیک بخت
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* square section */}
        <div className=" mt-5">
          <div className="grid grid-cols-2 gap-5">
            <InfoSocialMediaSquare
              href="tel:09150032020"
              title="شماره تماس:"
              address="09150042020"
              icon={<Phone />}
            />
            <InfoSocialMediaSquare
              href="tel:05138842010"
              title="شماره تماس:"
              address="05138842010"
              icon={<Phone />}
            />
          </div>
        </div>

        {/* portfolio section */}
        <div className="mt-5">
          <div>
            <Link
              target="_blank"
              href="https://nikbakhtprint.com/"
              className="flex items-center px-4 py-3 border-2 rounded-2xl "
            >
              <div className="w-[32px] h-[32px] bg-dark rounded-md flex justify-center items-center">
                <WebsiteSmall />
              </div>
              <p className="font-semibold text-xs ms-3">
                وبسایت تخصصی چاپ و تبلیغات نیکبخت
              </p>
            </Link>
          </div>
        </div>

        {/* logo */}
        <div>
          <ClientPageFooter />
        </div>
      </Layout>
    </>
  );
};

export default NikbakhtPrint;
