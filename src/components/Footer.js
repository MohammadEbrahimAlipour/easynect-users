import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Import your icons here
import {
  FooterCardsIcon,
  FooterCardsIconSelected,
  FooterContactsIcon,
  FooterContactsIconSelected,
  FooterIcon,
  FooterProfileIcon,
  FooterProfileIconSelected,
  FooterStatsIcon,
  FooterStatsIconSelected
} from "./Icons";

// Define your icons mapping
const iconMapping = {
  profile: <FooterProfileIcon />,
  stats: <FooterStatsIcon />,
  contacts: <FooterContactsIcon />,
  cards: <FooterCardsIcon />
};

const iconMappingSelected = {
  cards: <FooterCardsIconSelected />,
  stats: <FooterStatsIconSelected />,
  contacts: <FooterContactsIconSelected />,
  profile: <FooterProfileIconSelected />
};

const CustomLink = ({ href, title, iconName, className = "" }) => {
  const router = useRouter();
  const isSelected = router.asPath === href;

  return (
    <Link
      href={href}
      className={`grid col-span-6 justify-center items-center  ${className}`}
    >
      <span>
        {isSelected ? iconMappingSelected[iconName] : iconMapping[iconName]}
      </span>
      <span
        className={`text-xs mt-2 ${isSelected ? "text-gold" : " text-muted"} `}
      >
        {title}
      </span>
    </Link>
  );
};

const Footer = ({ className = "" }) => {
  return (
    <div
      className={`text-center my-5 container sticky bottom-0 bg-white pt-2  ${className}`}
    >
      <div className="grid grid-cols-12 gap-1">
        {/* right side */}
        <div className="3xl:col-span-4 2xl:col-span-4 md:col-span-4">
          <ul className="flex justify-center items-center">
            <li className="grid 3xl:grid-cols-12 2xl:grid-cols-12 md:grid-cols-12">
              <CustomLink
                href="/app/profile/profile"
                iconName="profile"
                title="پروفایل"
              />
            </li>
            <li>
              <CustomLink
                href="/app/stats/personsStats"
                iconName="stats"
                title="آمار"
              />
            </li>
          </ul>
        </div>

        {/* logo */}
        <Link
          href="/infoPage"
          className="relative bottom-8 3xl:col-span-4 2xl:col-span-4 md:col-span-4 me-1"
        >
          <div className="w-[75px] h-[75px] bg-dark rounded-full flex justify-center items-center m-auto">
            <FooterIcon />
          </div>
        </Link>
        {/* left side */}
        <div className="3xl:col-span-4 2xl:col-span-4 md:col-span-4">
          <ul className="flex justify-center items-center">
            <li className="grid 3xl:grid-cols-12 2xl:grid-cols-12 md:grid-cols-12">
              <CustomLink
                href="/app/contacts/contacts"
                iconName="contacts"
                title="مخاطبین"
              />
            </li>
            <li>
              <CustomLink
                href="/app/cards/profileCard"
                iconName="cards"
                title="کارت‌ها"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Footer;
