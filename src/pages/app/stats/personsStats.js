import { useState } from "react";
import Head from "next/head";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import BottomSheetStatsPresets from "@/components/BottomSheetStatsPresets";
import StatsTopSideCard from "./component/StatsTopSideCard";
import StatsList from "./component/StatsList";
import StatsChartSide from "./component/StatsChartSide";
import Contacts from "../contacts/contacts";

const PersonsStats = () => {
  const [isCard, setIsCard] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState();
  const [selectedCatalogId, setSelectedCatalogId] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [showFilterDateMenu, setShowFilterDateMenu] = useState(false);
  const [typeFilter, setTypeFilter] = useState("view");
  const [showContacts, setShowContacts] = useState(false);

  return (
    <>
      <Head>
        <title>
          {showContacts ? "ایزی‌نکت - مخاطبین" : "ایزی‌نکت - صفحه آمار"}
        </title>
      </Head>

      {/* 🔹 Header مشترک با دکمه‌ی سوئیچ */}
      {/* <Header>
        <div className="flex justify-between items-center px-5 py-3">
          <h1 className="text-lg font-semibold text-gray-800">
            {showContacts ? "مخاطبین" : "آمار کارت‌ها"}
          </h1>

          <button
            onClick={() => setShowContacts((prev) => !prev)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition"
          >
            {showContacts ? "صفحه آمار 📊" : "صفحه مخاطبین 👥"}
          </button>
        </div>
      </Header> */}
      <Header />
      <div className="flex justify-between items-center px-5 py-3">
        <h1 className="text-lg font-semibold text-gray-800">
          {showContacts ? "مخاطبین" : "آمار کارت‌ها"}
        </h1>

        <button
          onClick={() => setShowContacts((prev) => !prev)}
          className="bg-gradient-to-r from-[#EDDDC9] to-[#EDDDC9] text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition"
        >
          {showContacts ? "صفحه آمار 📊" : "صفحه مخاطبین 👥"}
        </button>
      </div>

      {/* 🔸 محتوای صفحه */}
      {showContacts ? (
        <Contacts />
      ) : (
        <>
          <Layout className="!pt-1 !h-fit min-h-screen !px-5">
            <p className="text-xl font-medium text-right mb-4">
              {selectedCardId ? "آمار به تفکیک کارت" : "کارت را انتخاب کنید"}
            </p>

            <StatsTopSideCard
              isCard={isCard}
              onSelectedId={setSelectedCardId}
              onSelectedSubId={setSelectedCatalogId}
              selectedCardId={selectedCardId}
              selectedCatalogId={selectedCatalogId}
            />

            <StatsChartSide
              selectedCatalogId={selectedCatalogId}
              setIsCard={setIsCard}
              isCard={isCard}
              onChangeShowFilterDateMenu={setShowFilterDateMenu}
              onChangeTypeFilter={setTypeFilter}
              typeFilter={typeFilter}
              selectedCardId={selectedCardId}
              fromDate={fromDate}
              toDate={toDate}
            />

            <StatsList
              selectedCatalogId={selectedCatalogId}
              isCard={isCard}
              selectedCardId={selectedCardId}
              fromDate={fromDate}
              toDate={toDate}
            />
          </Layout>

          <Footer />

          <BottomSheetStatsPresets
            setFromDate={setFromDate}
            setToDate={setToDate}
            open={showFilterDateMenu}
            onClose={() => setShowFilterDateMenu(false)}
          />
        </>
      )}
    </>
  );
};

export default PersonsStats;
