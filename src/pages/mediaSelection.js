import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { LinkedIn, PlusSign } from "@/components/Icons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeaderTwo from "@/components/HeaderTwo";

const MediaSelection = () => {
  const MediaOptions = ({ title, href, value = "", name = "" }) => {
    return (
      <div className={`bg-lightMenu rounded-lg mb-3 border-2 box-border`}>
        <div className="flex justify-start items-center py-3">
          <label
            className="font-semibold border-e-2 text-muted me-2 pe-2 ps-4"
            for="data_inp"
          >
            {/* icon/text */}
            <div className="w-[28px] h-[28px] bg-dark rounded-lg" />
          </label>
          <div className="flex flex-row w-full justify-between items-center pe-5">
            <Link
              href={href}
              className="bg-lightMenu outline-0 font-semibold text-sm"
            >
              {title}
            </Link>
            {/* checkbox */}

            <form className="flex items-center justify-center">
              {/* <input
                    value={value}
                    name={name}
                    type="checkbox"
                    className="bg-black border-white w-5 h-5 rounded focus:ring-0"
                  /> */}

              <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle"
                  class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  for="toggle"
                  class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* add id to back route */}
      <HeaderTwo href={"/profileCard"} />
      <Layout>
        <div className="bg-white rounded-lg container py-10">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg"> نمایش افقی</h3>
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

          {/* items */}
          <div className="mt-10">
            <MediaOptions href="/" title=" لینکد این" />
            <MediaOptions href="/" title=" لینکد این" />
            <MediaOptions href="/" title=" لینکد این" />
            <MediaOptions href="/" title=" لینکد این" />
            <MediaOptions href="/" title=" لینکد این" />
          </div>

          {/* bottom side btns */}
          <div className="text-sm text-center w-full flex flex-col mt-5">
            <Link
              href="/contentAddItem"
              className="border-[1px] border-black px-4 py-3 rounded-lg mb-2 flex justify-center
              items-center"
            >
              <span className="me-1">
                <PlusSign />
              </span>
              آیتم جدید
            </Link>
            <Link
              href="/"
              className="bg-dark text-white px-4 py-3 rounded-lg border-[1px] border-black"
            >
              ذخیره
            </Link>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default MediaSelection;
