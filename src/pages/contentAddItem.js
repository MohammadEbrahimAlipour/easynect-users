import Footer from "@/components/Footer";
import HeaderTwo from "@/components/HeaderTwo";
import Layout from "@/components/Layout";
import React from "react";

const contentStoreAddItem = () => {
  return (
    <>
      <HeaderTwo href="/mediaSelection" />
      <Layout>
        {/* top filters */}
        <div
          className="grid grid-flow-col auto-cols-[36%] overscroll-contain overflow-x-auto
         hide-scrollbar gap-2 snap-x"
        >
          <button className="border-[1px] border-dark rounded-lg  px-2 py-1 text-xs bg-white">
            شبکه ها ی اجتماعی
          </button>
          <button className="border-[1px] border-dark rounded-lg  px-2 py-1 text-xs bg-white">
            شبکه ها ی اجتماعی
          </button>
          <button className="border-[1px] border-dark rounded-lg  px-2 py-1 text-xs bg-white">
            شبکه ها ی اجتماعی
          </button>
          <button className="border-[1px] border-dark rounded-lg  px-2 py-1 text-xs bg-white">
            شبکه ها ی اجتماعی
          </button>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default contentStoreAddItem;
