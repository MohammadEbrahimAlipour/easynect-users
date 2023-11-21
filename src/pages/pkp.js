import React from "react";
import InfoSocialMediaSquare from "@/components/InfoSocialMediaSquare";
import PortfolioLink from "@/components/PortfolioLink";
import ProfileImage from "@/components/ProfileImage";
import ClientPageFooter from "@/components/ClientPageFooter";
import HorzCarouselPKP from "@/components/infoCarousel/HorzCarouselPKP";
import Layout from "@/components/Layout";
import sampleImage from "../../public/images/PKP.jpeg";
import { useAccessToken } from "../../context/AccessTokenContext";
import Link from "next/link";

import {
  Email,
  Fax,
  Instagram,
  Maps,
  MapsSmall,
  Phone,
  PortfolioLinkIcon,
  Telegram,
  WebsiteSmall,
  Whatsapp
} from "@/components/Icons";

const Pkp = () => {
  const handleSaveContact = () => {
    // create Vcard

    const vCardString = `
BEGIN:VCARD
VERSION:3.0
N;CHARSET=utf-8:پردیس کاغذ پارسیان
TEL;TYPE=Number:05131532
EMAIL;INTERNET;TYPE=Email:info@pkp-paper.com
URL;TYPE=Website:https://pkp-paper.ir/
URL;TYPE=Instagram:https://www.instagram.com/pkp_paper
URL;TYPE=Whatsapp:https://api.whatsapp.com/send?phone=989155122158&text=
URL;TYPE=Maps:https://www.google.com/maps/place/35%C2%B057'15.6%22N+59%C2%B020'36.1%22E/@35.9543398,59.3407816,17z/data=!3m1!4b1!4m4!3m3!8m2!3d35.9543398!4d59.3433565?hl=en-IR&entry=ttu
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
        <p className="mt-3 text-xl font-semibold"> پردیس کاغذ پارسیان</p>
        <p className="text-muted mt-2 font-medium text-xs">
          پردیس کاغذ پارسیان
        </p>
      </div>
      {/* horizontal scroll menu */}
      <div className="grid grid-flow-col justify-center items-center w-full">
        <div className="my-10 overflow-x-hidden overscroll-y-contain ">
          <HorzCarouselPKP />
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
              href="https://api.whatsapp.com/send?phone=989155122158&text="
              title="واتس اپ"
              address="09155122158"
              icon={<Whatsapp />}
            />

            <InfoSocialMediaSquare
              href="mailto:info@pkp-paper.com"
              title="ایمیل"
              address="info@pkp-paper.com"
              icon={<Email />}
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
                href="https://www.google.com/maps/place/35%C2%B057'15.6%22N+59%C2%B020'36.1%22E/@35.9543398,59.3407816,17z/data=!3m1!4b1!4m4!3m3!8m2!3d35.9543398!4d59.3433565?hl=en-IR&entry=ttu"
                className="flex items-center px-4 py-3 border-2 rounded-2xl "
              >
                <div className="w-[32px] h-[32px] bg-dark rounded-md flex justify-center items-center">
                  <MapsSmall />
                </div>
                <p className="font-semibold text-xs ms-3">
                  آدرس: شهرک صنعتی بینالود انتهای جاده اوارشک رو به روی ایران
                  خودرو
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* square section */}
        <div className=" mt-5">
          <div className="grid grid-cols-2 gap-5">
            <InfoSocialMediaSquare
              href="tel:05131532"
              title="شماره تماس:"
              address="05131532"
              icon={<Phone />}
            />
            <InfoSocialMediaSquare
              href="tel:051315320006"
              title="فکس"
              address="05131532-6"
              icon={<Fax />}
            />
          </div>
        </div>
        {/* portfolio section */}
        <div className="mt-5">
          <div>
            <Link
              target="_blank"
              href="https://pkp-paper.ir/"
              className="flex items-center px-4 py-3 border-2 rounded-2xl "
            >
              <div className="w-[32px] h-[32px] bg-dark rounded-md flex justify-center items-center">
                <WebsiteSmall />
              </div>
              <p className="font-semibold text-xs ms-3">
                وبسایت تخصصی پردیس کاغذ پارسیان
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

export default Pkp;
