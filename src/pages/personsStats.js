import Chart from "@/components/Chart";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowDownIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import StatsCard from "@/components/StatsCard";
import StatsHorz from "@/components/StatsHorz";
import StatsListItems from "@/components/StatsListItems";
import { StatsVert } from "@/components/StatsVert";
import React, { useState } from "react";

const PersonsStats = () => {
  const [cardSelected, setCardSelected] = useState(true);
  const [isSelected, setIsSelected] = useState(true);

  // Function to handle vert button click
  const handleVertClick = () => {
    setIsSelected(true);
  };

  // Function to handle horz button click
  const handleHorzClick = () => {
    setIsSelected(false);
  };
  return (
    <>
      <Header />
      <Layout className="!pt-1 !h-fit min-h-screen ">
        {cardSelected ? (
          <>
            <p className="text-xl font-medium text-right mb-4">
              آمار به تفکیک کارت‌ها
            </p>
          </>
        ) : (
          <p className="">
            آمار کارت‌ها
            <span className="font-semibold ms-2">محمدامین خاکشوری</span>
          </p>
        )}

        {/* card section */}
        <div className="">
          <div
            className="grid grid-flow-col auto-cols-[34%] gap-2 overscroll-contain
          overflow-x-auto hide-scrollbar
          snap-x"
          >
            <StatsCard title="محمدامین " />
            <StatsCard title="محمدامین خاکشوری" />
            <StatsCard title="محمدامین خاکشوری" />
            <StatsCard title="محمدامین " />
            <StatsCard title="محمدامین خاکشوری" />
            <StatsCard title="محمدامین خاکشوری" />
          </div>
        </div>

        {/* stats */}
        <div className="my-5 w-full">
          {/* chart */}
          <Chart />
          {/* text */}
        </div>

        {/* list */}
        <div>
          <div className="flex justify-between items-center mt-9 mb-6">
            <p className="text-lg font-medium ">ترکیب ورودی‌ها</p>

            {/* left side btns */}
            <div className="text-sm">
              <button
                id="horz"
                className={`me-3 border-[1px] border-black px-4 py-1 rounded-lg ${
                  !isSelected ? "bg-dark text-white" : ""
                }`}
                onClick={handleHorzClick}
              >
                افقی
              </button>
              <button
                id="vert"
                className={`${
                  isSelected ? "bg-dark text-white" : ""
                } px-4 py-1 rounded-lg border-[1px] border-black`}
                onClick={handleVertClick}
              >
                عمودی
              </button>
            </div>
          </div>
          {isSelected ? <StatsVert /> : <StatsHorz />}
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default PersonsStats;
