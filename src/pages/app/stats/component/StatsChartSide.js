import { useMemo, useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import Chart from "@/components/Chart";
import { ArrowDownIcon } from "@/components/Icons";
import { API_ROUTES } from "@/services/api";
import ToggleSwitch from "@/components/analytics/ToggleSwitchTitle";

const optionTexts = {
  view: "بازدید‌ها",
  contacts: "مخاطبین",
  convertRate: "نرخ تبدیل",
  shares: "اشتراک‌ها",
};

const mockData = {
  ANALYTICS_CATALOG_ITEMS_TOTAL_TAP: [
    { id: "1", title: "محصول شماره ۱", banner: "https://via.placeholder.com/150", view: 42 },
    { id: "2", title: "محصول شماره ۲", banner: "https://via.placeholder.com/150", view: 75 },
  ],
  ANALYTICS_CATALOG_TOTAL_VIEW: { views: 117 },
  ANALYTICS_VIEW_BASES_DATE_RANGE: {
    total_view: 117,
    views: [
      { date: "2025-09-08", views: 40 },
      { date: "2025-09-09", views: 52 },
      { date: "2025-09-10", views: 25 },
    ],
  },
  ANALYTICS_ITEM_TAB_BASES_DATE_RANGE: [
    { id: "1", taps: 20, title: "تب شماره ۱", s3_icon_url: "https://via.placeholder.com/50", guid: "guid-1" },
    { id: "2", taps: 37, title: "تب شماره ۲", s3_icon_url: "https://via.placeholder.com/50", guid: "guid-2" },
  ],
};

const StatsChartSide = ({ onChangeShowFilterDateMenu, onChangeTypeFilter, typeFilter, selectedCardId, fromDate, toDate }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isCard, setIsCard] = useState(false);

  // fetch hooks
  const viewFetch = useFetch();
  const connectionFetch = useFetch();
  const convertFetch = useFetch();
  const shareFetch = useFetch();

  const catalogFetch = useFetch(); // برای حالت منو

  // دریافت داده‌ها
  const getData = (filter) => {
    if (!selectedCardId) return;
    const params = { from_date: fromDate, to_date: toDate };

    if (isCard) {
      // حالت کارت → فقط فیلتر انتخاب شده
      switch (filter) {
        case "view":
          viewFetch.load({ url: API_ROUTES.ANALYTICS_VIEW_BASES_DATE_RANGE(selectedCardId), params, suppress404Toast: true });
          break;
        case "contacts":
          connectionFetch.load({ url: `/api/v1/analytics/get_page_connection_stats_based_on_date_range/${selectedCardId}`, params, suppress404Toast: true });
          break;
        case "convertRate":
          convertFetch.load({ url: `/api/v1/analytics/get_page_convert_rate_based_on_date_range/${selectedCardId}`, params, suppress404Toast: true });
          break;
        case "shares":
          shareFetch.load({ url: `/api/v1/analytics/get_page_view_based_on_date_range_by_share/${selectedCardId}`, params, suppress404Toast: true });
          break;
        default:
          break;
      }
    } else {
      // حالت منو → همه API ها همزمان
      const menuAPIs = [
        API_ROUTES.ANALYTICS_CATALOG_ITEMS_TOTAL_TAP(selectedCardId),
        API_ROUTES.ANALYTICS_VIEW_BASES_DATE_RANGE(selectedCardId),
        API_ROUTES.ANALYTICS_CATALOG_TOTAL_VIEW(selectedCardId),
        API_ROUTES.ANALYTICS_ITEM_TAB_BASES_DATE_RANGE(selectedCardId),
      ];

      menuAPIs.forEach((url) => catalogFetch.load({ url, params, suppress404Toast: true }));
    }
  };

  useEffect(() => {
    if (selectedCardId && typeFilter) getData(typeFilter);
  }, [selectedCardId, typeFilter, fromDate, toDate, isCard]);

  // داده‌ها برای چارت
  const chartViewData = useMemo(
    () => (isCard ? viewFetch.response?.data || null : catalogFetch.response?.data || mockData.ANALYTICS_VIEW_BASES_DATE_RANGE),
    [isCard, viewFetch.response, catalogFetch.response]
  );

  const chartConnectionData = useMemo(
    () => (isCard ? connectionFetch.response?.data || null : catalogFetch.response?.data || mockData.ANALYTICS_CATALOG_ITEMS_TOTAL_TAP),
    [isCard, connectionFetch.response, catalogFetch.response]
  );

  const chartConvertData = useMemo(
    () => (isCard ? convertFetch.response?.data || null : catalogFetch.response?.data || mockData.ANALYTICS_CATALOG_TOTAL_VIEW),
    [isCard, convertFetch.response, catalogFetch.response]
  );

  const chartShareData = useMemo(
    () => (isCard ? shareFetch.response?.data || null : catalogFetch.response?.data || mockData.ANALYTICS_ITEM_TAB_BASES_DATE_RANGE),
    [isCard, shareFetch.response, catalogFetch.response]
  );

  return (
    <div className="my-5 w-full">
      {/* فیلتر تاریخ */}
      <div className="flex justify-between items-center mb-5 gap-2">
        <button
          onClick={() => onChangeShowFilterDateMenu(true)}
          className="bg-dark text-white rounded-2xl px-3 py-[6px] focus:outline-none text-sm flex justify-center items-center"
        >
          <span className="me-1">انتخاب زمان</span>
          <ArrowDownIcon />
        </button>

        {/* انتخاب نوع داده */}
        <div className="relative inline-block text-left">
          <button
            onClick={() => setToggleMenu((prev) => !prev)}
            type="button"
            className="inline-flex w-full justify-center items-center gap-x-1 rounded-2xl bg-dark text-white px-3 py-[6px] text-sm font-medium shadow-sm"
          >
            {optionTexts[typeFilter]}
            <ArrowDownIcon />
          </button>
          {toggleMenu && (
            <div className="absolute left-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg">
              {Object.keys(optionTexts).map((value) => (
                <button
                  key={value}
                  onClick={() => {
                    onChangeTypeFilter(value);
                    setToggleMenu(false);
                  }}
                  className="text-gray-700 block px-4 py-2 text-xs w-full border-b-[1px]"
                >
                  {optionTexts[value]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* سوییچ منو / کارت */}
      <div className="w-full relative mb-5">
        <ToggleSwitch
          isChecked={isCard}
          toggleSwitch={() => setIsCard((prev) => !prev)}
          leftLabel="براساس منو"
          rightLabel="براساس کارت ویزیت"
        />
        <div className="mt-4 text-sm text-gray-700">
          حالت انتخاب شده: <span className="font-bold">{isCard ? "کارت ویزیت" : "منو"}</span>
        </div>
      </div>

      {/* چارت */}
      <Chart
        selectedOption={typeFilter}
        chartView={chartViewData}
        chartConnection={chartConnectionData}
        chartShare={chartShareData}
        chartConvert={chartConvertData}
      />
    </div>
  );
};

export default StatsChartSide;
