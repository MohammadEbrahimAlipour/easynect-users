import React from "react";
import { PortfolioLinkIcon } from "./Icons";
import Link from "next/link";
import Header from "./Header";

const PortfolioLink = () => {
  return (
    <div>
      <Link
        href="/"
        className="flex items-center px-4 py-3 border-[1.3px] border-gold rounded-2xl "
      >
        <PortfolioLinkIcon />
        <p className="font-semibold text-xs ms-3">
          پورتفولیوی من؛ تلاشی برای خوب دیدن و خلق کردن
        </p>
      </Link>
    </div>
  );
};

export default PortfolioLink;
