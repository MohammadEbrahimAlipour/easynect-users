import React from "react";
import { PortfolioLinkIcon } from "./Icons";
import Link from "next/link";
import Header from "./Header";

const PortfolioLink = ({ title, href = "" }) => {
  return (
    <div>
      <Link
        href={href}
        className="flex items-center px-4 py-3 border-2 rounded-2xl "
      >
        <PortfolioLinkIcon />
        <p className="font-semibold text-xs ms-3">{title}</p>
      </Link>
    </div>
  );
};

export default PortfolioLink;
