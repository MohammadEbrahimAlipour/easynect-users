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
  FooterStatsIconSelected,
} from "./Icons";
import tw from "tailwind-styled-components";

// Define your icons mapping
const iconMapping = {
  profile: <FooterProfileIcon />,
  stats: <FooterStatsIcon />,
  contacts: <FooterContactsIcon />,
  cards: <FooterCardsIcon />,
};

const iconMappingSelected = {
  cards: <FooterCardsIconSelected />,
  stats: <FooterStatsIconSelected />,
  contacts: <FooterContactsIconSelected />,
  profile: <FooterProfileIconSelected />,
};

const CustomLink = ({ href, title, iconName, className = "" }) => {
  const router = useRouter();
  const isSelected = router.asPath === href || router.asPath.includes(href);
  console.log(href, router.asPath, isSelected);

  return (
    <Link
      href={href}
      className={`flex flex-col col-span-6 justify-center items-center  ${className}`}
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
    <FooterWrapper className={className}>
      <CustomLink
        href="/app/profile/profile"
        iconName="profile"
        title="پروفایل"
      />
      <CustomLink
        href="/app/stats/personsStats"
        iconName="stats"
        title="آمار"
      />
      <CustomLink
        href="/app/menu"
        iconName="cards"
        title="منو"
      />
      <CustomLink
        href="/app/order/main"
        iconName="contacts"
        title="سفارش ها"
      />
      <CustomLink
        href="/app/cards/profileCard"
        iconName="cards"
        title="کارت‌ها"
      />
    </FooterWrapper>
  );
};
export default Footer;

const FooterWrapper = tw.div`
  flex
  justify-center
  items-center
  w-full
  fixed
  bottom-0
  bg-white
  gap-8
  left-0
  py-2
`;
