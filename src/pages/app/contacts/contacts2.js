import { useState } from "react";
import Head from "next/head";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import ExelBottomSheet from "@/components/contacts/bottomSheet/ExelBottomSheet";
import ContactFilters from "@/components/contacts/bottomSheet/ContactFilters";

import HeaderFilter from "./component/HeaderFilter";
import ContactList from "./component/ContactList";

export default function () {
  const [contractPage, setContractPage] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [showExelSheet, setShowExelSheet] = useState(false);
  const [showContactFilters, setShowContactFilters] = useState(false);

  console.log('searchQuery => ', searchQuery);
  console.log('contractPage => ', contractPage);
  return (
    <>
      <Head>
        <title>ایزی‌نکت - مخاطبین</title>
        <meta name="easynect business card" content="Powered by Easynect" />
      </Head>
      <Header />
      <Layout>
        <HeaderFilter
          onChangeContractPage={setContractPage}
          contractPage={contractPage}
          onSearchQuery={setSearchQuery}
          onShowExelSheet={setShowExelSheet}
          onShowContactFilters={setShowContactFilters}
        />
        <ContactList
          contractPage={contractPage}
          searchQuery={searchQuery}
          fromDate={fromDate}
          toDate={toDate}
        />
      </Layout>
      <Footer />

      <ExelBottomSheet
        showExelSheet={showExelSheet}
        setShowExelSheet={setShowExelSheet}
        pageID={contractPage?.id}
      />

      <ContactFilters
        showContactFilters={showContactFilters}
        setShowContactFilters={setShowContactFilters}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
    </>
  )
}