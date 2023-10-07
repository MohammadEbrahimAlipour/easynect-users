import Link from "next/link";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useState } from "react";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";

const EditMedias = () => {
  // Initialize checked states for each ToggleSwitch
  const [toggleStates, setToggleStates] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  });

  // Function to toggle a specific ToggleSwitch
  const toggleSwitch = (name) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [name]: !prevState[name]
    }));
  };

  // top tags
  const FilterOptions = ({ href, title, className = "" }) => {
    return (
      <Link
        href={href}
        className={`${className} text-xs bg-white border-[1px] px-3 py-2 border-black rounded-md ms-1 w-auto whitespace-nowrap`}
      >
        {title}
      </Link>
    );
  };

  // menu options
  const MediaOptions = ({ title, href, value = "", name = "" }) => {
    const isChecked = toggleStates[name]; // Get the checked state

    return (
      <div className={`bg-lightMenu rounded-lg mb-3 border-2 box-border `}>
        <div className="flex justify-start items-center py-3">
          <label
            className="font-semibold border-e-2 text-muted me-2 pe-2 ps-4"
            htmlFor={`toggleSwitch-${name}`}
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
            <ToggleSwitch
              id={`toggleSwitch-${name}`}
              isChecked={isChecked}
              toggleSwitch={() => toggleSwitch(name)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <Layout>
        <div className="bg-white container py-5 rounded-lg">
          {/* filter options */}
          <div className="mb-8 flex justify-start overflow-y-scroll hide-scrollbar">
            <FilterOptions title="سوشیال مدیا" href="/" />
            <FilterOptions title="سوشیال " href="/" />
            <FilterOptions title="سوشیال مدیا" href="/" />
            <FilterOptions title="سوشیال مدیا" href="/" />
            <FilterOptions title="سوشیال " href="/" />
            <FilterOptions title="سوشیال مدیا" href="/" />
            <FilterOptions title="سوشیال مدیا" href="/" />
          </div>

          {/* title */}
          <div className="mb-3">
            <h3 href="/" className="text-lg font-semibold">
              سوشیال مدیا
            </h3>
          </div>

          {/* media options */}
          <MediaOptions href="/" title=" لینکد این" name="1" />
          <MediaOptions href="/" title=" لینکد این" name="2" />
          <MediaOptions href="/" title=" لینکد " name="3" />
          <MediaOptions href="/" title=" لینکد این" name="4" />
          <MediaOptions href="/" title=" لینکد این" name="5" />

          <div className="mt-5">
            <Link
              href="/"
              className="flex justify-center items-center border-2 rounded-lg py-3"
            >
              <span className="me-1">کارت جدید</span>
            </Link>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default EditMedias;
