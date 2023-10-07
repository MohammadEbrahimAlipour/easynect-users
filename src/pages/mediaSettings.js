import Layout from "@/components/Layout";
import React from "react";
import Link from "next/link";
import { LinkedIn } from "@/components/Icons";
import Footer from "@/components/Footer";
import HeaderTwo from "@/components/HeaderTwo";

const MediaSettings = () => {
  return (
    <>
      <HeaderTwo />
      <Layout>
        <div className="bg-white rounded-lg container py-10">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">لینکد این</h3>
            {/* left side btns */}
            <div className="text-sm">
              <Link
                href="/"
                className="me-3 border-[1px] border-black px-4 py-1 rounded-lg"
              >
                انصراف
              </Link>
              <Link
                href="/"
                className="bg-dark text-white px-4 py-1 rounded-lg border-[1px] border-black"
              >
                ذخیره
              </Link>
            </div>
          </div>

          {/* icon */}
          <div className="mt-10 flex flex-col items-center">
            <LinkedIn />
            <form className="mt-10 flex flex-col w-full">
              <label for="icon" className="mb-2">
                اطلاعات را وارد کنید:
              </label>
              <input
                id="icon"
                type="text"
                className="border-2 rounded-md text-sm py-1 px-1"
                placeholder="اطلاعات را وارد کنید"
              />
            </form>
          </div>

          <div className="mt-10 py-5 border-[1px] rounded-lg px-2 flex justify-between">
            <h3>اندازه کارت:</h3>
            <div className="flex">
              {/* rectengle */}
              <div className="w-[120px] h-[15px] bg-muted me-4 rounded-sm opacity-40" />
              <div className="w-[55px] h-[55px] bg-muted rounded-sm opacity-40" />
            </div>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default MediaSettings;
