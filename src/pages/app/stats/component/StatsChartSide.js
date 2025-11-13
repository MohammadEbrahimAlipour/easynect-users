import { useMemo, useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import Chart from "@/components/Chart";
import { ArrowDownIcon } from "@/components/Icons";
import ToggleSwitch from "@/components/analytics/ToggleSwitchTitle";
import { toast } from "react-toastify";

const optionTexts = {
  view: "بازدید‌ها",
  contacts: "مخاطبین",
  convertRate: "نرخ تبدیل",
  shares: "اشتراک‌ها",
};

const mockData = {
  ANALYTICS_CATALOG_ITEMS_TOTAL_TAP: [],
  ANALYTICS_CATALOG_TOTAL_VIEW: {},
  ANALYTICS_VIEW_BASES_DATE_RANGE: { views: [] },
  ANALYTICS_ITEM_TAB_BASES_DATE_RANGE: [],
};

const StatsChartSide = ({
  selectedCatalogId,
  isCard,
  setIsCard,
  onChangeShowFilterDateMenu,
  onChangeTypeFilter,
  typeFilter,
  selectedCardId,
  fromDate,
  toDate,
}) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  // fetch hooks
  const viewFetch = useFetch();
  const connectionFetch = useFetch();
  const convertFetch = useFetch();
  const shareFetch = useFetch();
  const catalogFetch = useFetch();

  // 📊 دریافت داده‌ها
  const getData = (filter) => {
    // 🛑 بررسی انتخاب‌ها
    if (!isCard && !selectedCatalogId) {
      toast.error("ابتدا منوی مورد نظر را انتخاب کنید");
      return;
    }
    if (isCard && !selectedCardId) {
      toast.error("ابتدا کارت ویزیت مورد نظر را انتخاب کنید");
      return;
    }

    const params = { from_date: fromDate, to_date: toDate };

    if (isCard) {
      // حالت کارت → فقط API همان فیلتر
      switch (filter) {
        case "view":
          viewFetch.load({
            url: `/api/v1/analytics/get_page_total_views/${selectedCardId}`,
            params,
            suppress404Toast: true,
          });
          break;
        case "contacts":
          connectionFetch.load({
            url: `/api/v1/analytics/get_list_contents_taps_based_on_date_range/${selectedCardId}`,
            params,
            suppress404Toast: true,
          });
          break;
        case "convertRate":
          convertFetch.load({
            url: `/api/v1/analytics/get_page_convert_rate_based_on_date_range/${selectedCardId}`,
            params,
            suppress404Toast: true,
          });
          break;
        case "shares":
          shareFetch.load({
            url: `/api/v1/analytics/get_contents_taps_based_on_date_range/${selectedCardId}`,
            params,
            suppress404Toast: true,
          });
          break;
      }
    } else {
      // حالت منو → فقط API مربوط به فیلتر انتخاب‌شده
      let url = "";
     

      switch (filter) {
        case "view":
          url = `/api/v1/analytics/catalogs/get_catalog_view_based_on_date_range/${selectedCatalogId}`;
          break;
        case "contacts":
          url = `/api/v1/analytics/catalogs/get_catalog_items_taps_based_on_date_range/${selectedCatalogId}`;
          break;
      
        default:
           break;
      }

      catalogFetch.load({ url, params, suppress404Toast: true });
    }
  };

  // 📅 واکنش به تغییرات
  useEffect(() => {
    if (typeFilter) getData(typeFilter);
  }, [selectedCardId, typeFilter, fromDate, toDate, isCard, selectedCatalogId]);

  // 🎨 داده‌های چارت
  const chartViewData = useMemo(
    () =>
      isCard
        ? viewFetch.response?.data || null
        : catalogFetch.response?.data || mockData.ANALYTICS_VIEW_BASES_DATE_RANGE,
    [isCard, viewFetch.response, catalogFetch.response]
  );

  const chartConnectionData = useMemo(
    () =>
      isCard
        ? connectionFetch.response?.data || null
        : catalogFetch.response?.data || mockData.ANALYTICS_CATALOG_ITEMS_TOTAL_TAP,
    [isCard, connectionFetch.response, catalogFetch.response]
  );

  const chartConvertData = useMemo(
    () =>
      isCard
        ? convertFetch.response?.data || null
        : catalogFetch.response?.data || mockData.ANALYTICS_CATALOG_TOTAL_VIEW,
    [isCard, convertFetch.response, catalogFetch.response]
  );

  const chartShareData = useMemo(
    () =>
      isCard
        ? shareFetch.response?.data || null
        : catalogFetch.response?.data || mockData.ANALYTICS_ITEM_TAB_BASES_DATE_RANGE,
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
              {Object.keys(optionTexts).map((value) => {
                // در حالت منو فقط view و contacts مجاز هستند
                if (!isCard && !["view", "contacts"].includes(value)) return null;
                return (
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
                );
              })}
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
          حالت انتخاب شده:{" "}
          <span className="font-bold">{isCard ? "کارت ویزیت" : "منو"}</span>
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
