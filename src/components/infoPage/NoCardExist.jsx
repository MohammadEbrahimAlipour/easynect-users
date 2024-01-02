import React from "react";
import Layout from "../Layout";
import HeaderTwo from "../HeaderTwo";
import Link from "next/link";

const NoCardExist = () => {
  return (
    <Layout>
      <HeaderTwo />
      <div className="bg-mutedDark rounded-lg p-3 opacity-60 mt-[90px]">
        <p>
          برای شما هنوز کارتی ساخته نشده است. لطفا ابتدا یک کارت برای خود
          بسازید.
        </p>
        <Link href="/app/cards/createCard" className="underline mt-2">
          برای ساخت کارت اینجا کلیک کنید.
        </Link>
      </div>
    </Layout>
  );
};

export default NoCardExist;
