import { useState } from "react"

import Head from "next/head"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Layout from "@/components/Layout"
import BottomSheetStatsPresets from "@/components/BottomSheetStatsPresets"

import StatsTopSideCard from "./component/StatsTopSideCard"
import StatsList from "./component/StatsList"
import StatsChartSide from "./component/StatsChartSide"

const PersonsStats = () => {
  const [selectedCardId, setSelectedCardId] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [showFilterDateMenu, setShowFilterDateMenu] = useState(false);
  const [typeFilter, setTypeFilter] = useState('view');

  return (
    <>
      <Head>
        <title>ایزی‌نکت - صفحه آمار</title>
      </Head>
      <Layout className="!pt-1 !h-fit min-h-screen !px-5">
        <p className="text-xl font-medium text-right mb-4">
          {selectedCardId ? "آمار به تفکیک کارت" : "کارت را انتخواب کنید"}
        </p>
        <StatsTopSideCard
          onSelectedId={setSelectedCardId}
          selectedCardId={selectedCardId}
        />
        <StatsChartSide
          onChangeShowFilterDateMenu={setShowFilterDateMenu}
          onChangeTypeFilter={setTypeFilter}
          typeFilter={typeFilter}
          selectedCardId={selectedCardId}
          fromDate={fromDate}
          toDate={toDate}
        />
        <StatsList
          selectedCardId={selectedCardId}
          fromDate={fromDate}
          toDate={toDate}
        />
      </Layout>
      <Header />
      <Footer />
      <BottomSheetStatsPresets
        setFromDate={setFromDate}
        setToDate={setToDate}
        open={showFilterDateMenu}
        onClose={() => setShowFilterDateMenu(false)}
      />
    </>
  )
}

export default PersonsStats