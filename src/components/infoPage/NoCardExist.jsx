import React from "react";
import Layout from "../Layout";
import HeaderTwo from "../HeaderTwo";

const NoCardExist = () => {
  return (
    <Layout>
      <HeaderTwo />
      <div className="bg-mutedDark rounded-lg p-3 opacity-60 mt-[90px]">
        <p>
          برای شما هنوز کارتی ساخته نشده است. لطفا ابتدا یک کارت برای خود
          بسازید.
        </p>
        <p className="underline mt-2">برای ساخت کارت اینجا کلیک کنید.</p>
      </div>
    </Layout>
  );
};

export default NoCardExist;
