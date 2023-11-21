import HeaderTwo from "@/components/HeaderTwo";
import Layout from "@/components/Layout";
import Link from "next/link";
import Footer from "@/components/Footer";
import React from "react";

const noticeSettings = () => {
  return (
    <>
      <HeaderTwo href="/" />
      <Layout>
        <div>
          <p className="py-4 rounded-lg bg-[#EEEFEF]">پیامک</p>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default noticeSettings;
