import Chart from "@/components/Chart";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowDownIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import StatsCard from "@/components/StatsCard";
import StatsHorz from "@/components/StatsHorz";
import StatsListItems from "@/components/StatsListItems";
import { StatsVert } from "@/components/StatsVert";
import React, { useEffect, useState } from "react";
import { generateApiUrl } from "@/components/ApiUr";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import axios from "axios";
import BottomSheet from "@/components/BottomSheet";
import BottomSheetStatsDate from "@/components/BottomSheetStatsDate";
import BottomSheetStatsPresets from "@/components/BottomSheetStatsPresets";
import LoadingState from "@/components/LoadingState";
import { Drawer } from "@mui/material";
import ComingSoon from "@/components/ComingSoon";
import BottomSheetWrapper from "@/components/bottomSheet/BottomSheetWrapper";

const PersonsStats = () => {
  const [isSelected, setIsSelected] = useState("content");
  const accessToken = useAccessToken();
  const [statsData, setStatsData] = useState([]); // State to store data from api for top card section
  const [pageData, setPageData] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(); // State to store the selected card's id

  const [selectedButton, setSelectedButton] = useState("");

  const [chartView, setChartView] = useState(); // Chart data for view
  const [chartConnection, setChartConnection] = useState(); // chart data for connection
  const [chartShare, setChartShare] = useState(); // chart data for share
  const [chartConvert, setChartConvert] = useState(); // chart data for conver

  const [goToCal, setGoToCal] = useState(false); //to navigate inside bottom sheet setting

  // handle date values for custom date
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  // below code handles two buttons above chart
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [comingSoon, setComingSoon] = useState(true);

  const [selectedOption, setSelectedOption] = useState("view"); //value to pass to chart

  console.log("statsData");

  // options
  const handleOptionChange = (event) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);

    // Save the selectedOption in localStorage (only on the client-side)
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedOption", newOption);
    }
  };
  useEffect(() => {
    // Check if localStorage is available (only on the client-side)
    if (typeof window !== "undefined") {
      const storedOption = localStorage.getItem("selectedOption");
      if (storedOption) {
        setSelectedOption(storedOption);
      }
    }
  }, []);
  useEffect(() => {
    // Check if localStorage is available (only on the client-side)
    if (typeof window !== "undefined") {
      const storedOption = localStorage.getItem("selectedOption");
      if (storedOption) {
        setSelectedOption(storedOption);
      }
    }
  }, []);

  // get data for top cards
  useEffect(() => {
    // Fetch data from the API
    const apiUrl = generateApiUrl("/api/v1/analytics/pages/");

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`, // Pass the access token in the headers
          "accept-language": "fa"
        }
      })
      .then((response) => {
        // Handle the API response here
        const data = response.data;
        setStatsData(data); // Update the state with the fetched data
        // Set the selectedCardId to the id of the first item in statsData
        if (data.length > 0) {
          setSelectedCardId(data[0].id);
        }
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching data:", error);
      });
  }, [accessToken.accessToken]);

  // fetch bottom data
  const fetchDataFromSecondApi = () => {
    if (selectedCardId) {
      const apiUrl = generateApiUrl(
        `/api/v1/analytics/get_list_contents_taps_based_on_date_range/${selectedCardId}`
      );
      // Set the params object with the appropriate type
      const params = {
        type_: selectedButton
        // Add other params if needed
      };
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "accept-language": "fa"
          },
          params: params // Pass the params in the request
        })
        .then((response) => {
          const data = response.data;
          setPageData(data); // Update the state with the fetched data
        })
        .catch((error) => {
          console.error("Error fetching page data:", error);
        });
    }
  };

  // Fetch data for chart View
  useEffect(() => {
    if (selectedCardId) {
      const apiUrl = generateApiUrl(
        `/api/v1/analytics/get_page_view_based_on_date_range/${selectedCardId}`
      );

      const params = {
        from_date: fromDate, // Use fromDate prop from BottomSheetStatsDate
        to_date: toDate // Use toDate prop from BottomSheetStatsDate
      };
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "accept-language": "fa"
          },
          params: params
        })
        .then((response) => {
          const data = response.data;
          setChartView(data);
        })
        .catch((error) => {
          console.error("Error fetching chart view data:", error);
        });
    }
  }, [
    accessToken.accessToken,
    selectedCardId,
    fromDate,
    toDate,
    selectedOption
  ]);

  // Fetch data for chart View
  useEffect(() => {
    if (selectedCardId) {
      const apiUrl = generateApiUrl(
        `/api/v1/analytics/get_page_connection_stats_based_on_date_range/${selectedCardId}`
      );

      const params = {
        from_date: fromDate, // Use fromDate prop from BottomSheetStatsDate
        to_date: toDate // Use toDate prop from BottomSheetStatsDate
      };
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "accept-language": "fa"
          },
          params: params
        })
        .then((response) => {
          const data = response.data;
          setChartConnection(data);
        })
        .catch((error) => {
          console.error("Error fetching chart view data:", error);
        });
    }
  }, [
    accessToken.accessToken,
    selectedCardId,
    fromDate,
    toDate,
    selectedOption
  ]);

  // Fetch data for chart share
  useEffect(() => {
    if (selectedCardId) {
      const apiUrl = generateApiUrl(
        `/api/v1/analytics/get_page_view_based_on_date_range_by_share/${selectedCardId}`
      );

      const params = {
        from_date: fromDate, // Use fromDate prop from BottomSheetStatsDate
        to_date: toDate // Use toDate prop from BottomSheetStatsDate
      };
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "accept-language": "fa"
          },
          params: params
        })
        .then((response) => {
          const data = response.data;
          setChartShare(data);
        })
        .catch((error) => {
          console.error("Error fetching chart view data:", error);
        });
    }
  }, [
    accessToken.accessToken,
    selectedCardId,
    fromDate,
    toDate,
    selectedOption
  ]);

  // Fetch data for chart convert
  useEffect(() => {
    if (selectedCardId) {
      const apiUrl = generateApiUrl(
        `/api/v1/analytics/get_page_convert_rate_based_on_date_range/${selectedCardId}`
      );

      const params = {
        from_date: fromDate, // Use fromDate prop from BottomSheetStatsDate
        to_date: toDate // Use toDate prop from BottomSheetStatsDate
      };
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "accept-language": "fa"
          },
          params: params
        })
        .then((response) => {
          const data = response.data;
          setChartConvert(data);
        })
        .catch((error) => {
          console.error("Error fetching chart view data:", error);
        });
    }
  }, [
    accessToken.accessToken,
    selectedCardId,
    fromDate,
    toDate,
    selectedOption
  ]);

  // Button click handlers
  const handleButtonClick = (value) => {
    setSelectedButton(value); // Set the selectedButton state to the value of the button clicked

    // Call the function to fetch data from the second API
    fetchDataFromSecondApi();
  };

  // Function to handle card selection
  const handleCardSelect = (cardId) => {
    setSelectedCardId(cardId);
  };

  // options
  const [showOption, setShowOption] = useState(false);
  const toggleShowOption = () => {
    setShowOption(!showOption);
  };
  // Add a function to handle a click on a menu item and set the selected option
  const handleMenuItemClick = (newOption) => {
    setSelectedOption(newOption);
    toggleShowOption(); // Close the menu
  };

  const optionTexts = {
    view: "بازدید‌ها",
    contacts: "مخاطبین",
    convertRate: "نرخ تبدیل",
    shares: "اشتراک‌ها"
  };

  return (
    <>
      <Header />
      <>
        {!comingSoon ? (
          <Layout className="!pt-1 !h-fit min-h-screen !px-5">
            {selectedCardId ? (
              <>
                <p className="text-xl font-medium text-right mb-4">
                  آمار به تفکیک کارت‌
                </p>
              </>
            ) : (
              <p className="text-xl font-medium text-right mb-4">
                کارت را انتخواب کنید
              </p>
            )}

            {/* card section */}

            {statsData ? (
              <div className="">
                <div
                  className="grid grid-flow-col auto-cols-[36%] gap-2 overscroll-contain
          overflow-x-auto hide-scrollbar
          snap-x"
                >
                  {statsData.map((item) => (
                    <StatsCard
                      key={item.id}
                      item={item}
                      selectedCardId={selectedCardId}
                      onClick={() => handleCardSelect(item.id)} // Call handleCardSelect when a card is clicked
                    />
                  ))}
                </div>
              </div>
            ) : (
              <LoadingState />
            )}

            {/* stats */}
            <div className="my-5 w-full">
              <div className="flex justify-between items-center mb-5">
                <button
                  onClick={() => setShowSubMenu(!showSubMenu)}
                  className="bg-dark text-white rounded-2xl px-3 py-[6px] focus:outline-none
         text-sm flex justify-center items-center"
                  // onClick={toggleDateMenu}
                >
                  <span className="me-1">انتخاب زمان</span>
                  <ArrowDownIcon />
                </button>
                <div className="flex flex-wrap">
                  {/* <label htmlFor="options">Choose a car:</label> */}

                  {/* drop down chart options */}
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        onClick={toggleShowOption}
                        type="button"
                        className="inline-flex w-full justify-center items-center gap-x-1 rounded-2xl bg-dark text-white px-3 py-[6px] text-sm font-medium shadow-sm  "
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                      >
                        {optionTexts[selectedOption]}
                        {/* Display the selected option text */}
                        <ArrowDownIcon />
                      </button>
                    </div>

                    {showOption ? (
                      <div
                        className="absolute left-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg "
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabindex="-1"
                      >
                        <div className="" role="none">
                          {Object.keys(optionTexts).map((value) => (
                            <button
                              key={value}
                              onClick={() => handleMenuItemClick(value)} // Handle click and set option
                              value={value}
                              className="text-gray-700 block px-4 py-2 text-xs w-full border-b-[1px]"
                              role="menuitem"
                              tabindex="-1"
                              id={`menu-item-${value}`}
                            >
                              {optionTexts[value]}{" "}
                              {/* Display the option text */}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* chart */}

              <Chart
                chartView={chartView}
                selectedOption={selectedOption}
                chartConnection={chartConnection}
                chartShare={chartShare}
                chartConvert={chartConvert}
              />

              {/* text */}
            </div>

            {/* list */}
            <div>
              <div className="flex justify-between items-center mt-9 mb-6">
                <p className="text-lg font-medium ">
                  {selectedButton === "content" &&
                    // Render content for the "content" button

                    "content"}

                  {selectedButton === "hm_item" && "hm_item"}
                </p>
              </div>
              <div>
                {/* Conditionally render content based on selectedButton */}

                <p>آیتم های بیشتر</p>
              </div>
            </div>
          </Layout>
        ) : (
          <ComingSoon />
        )}
      </>
      <Footer />
      <div>
        {/* <Drawer
          anchor="bottom"
          open={showSubMenu}
          onClose={() => {
            setShowSubMenu(false);
            setGoToCal(false);
          }}
        >
          {goToCal ? (
            <BottomSheetStatsDate
              setFromDate={setFromDate}
              setToDate={setToDate}
            />
          ) : (
            <BottomSheetStatsPresets
              goToCal={goToCal}
              setGoToCal={setGoToCal}
              fromDate={fromDate}
              setFromDate={setFromDate}
              setToDate={setToDate}
              toDate={toDate}
            />
          )}
        </Drawer> */}

        <BottomSheetStatsPresets
          setFromDate={setFromDate}
          setToDate={setToDate}
          open={showSubMenu}
          onClose={() => {
            setShowSubMenu(false);
          }}
        />
      </div>
    </>
  );
};

export default PersonsStats;
