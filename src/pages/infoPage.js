import React from "react";

import InfoSocialMediaSquare from "@/components/InfoSocialMediaSquare";
import PortfolioLink from "@/components/PortfolioLink";
import ProfileImage from "@/components/ProfileImage";
import ClientPageFooter from "@/components/ClientPageFooter";
import HorzCarousel from "@/components/infoCarousel/HorzCarousel";
import Layout from "@/components/Layout";
import sampleImage from "../../public/images/cljokljin00rp3d5zrpjtjgmm.png";

const InfoPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10">
        <ProfileImage src={sampleImage} width={80} height={80} />
        <p className="mt-3 text-xl font-semibold">محمدامین خاکشوری</p>
        <p className="text-muted mt-2 font-medium text-xs">
          طراح محصول در مترا
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
        <button className="bg-dark text-white text-sm font-bold w-full h-[44px] rounded-[8px]">
          ذخیره مخاطب
        </button>

        {/* square section */}
        <div className=" mt-5">
          <div className="grid grid-cols-2 gap-5">
            <InfoSocialMediaSquare />
            <InfoSocialMediaSquare />
          </div>
        </div>

        {/* portfolio section */}
        <div className="mt-5">
          <div>
            <PortfolioLink />
          </div>
        </div>

        {/* square section */}
        <div className=" mt-5">
          <div className="grid grid-cols-2 gap-5">
            <InfoSocialMediaSquare />
            <InfoSocialMediaSquare />
          </div>
        </div>

        {/* portfolio section */}
        <div className="mt-5">
          <div>
            <PortfolioLink />
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

export default InfoPage;
