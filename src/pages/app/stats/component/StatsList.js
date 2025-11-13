import LoadingState from "@/components/LoadingState";
import useFetch from "@/hooks/useFetch";
import { API_ROUTES } from "@/services/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const StatsList = ({ selectedCatalogId, isCard, selectedCardId, fromDate, toDate }) => {
  const visitedFetch = useFetch();
  const [visitedList, setVisitedList] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  // Add a state to keep track of the previous skip
  const [prevSkip, setPrevSkip] = useState(0);

  useEffect(() => {
    if (selectedCardId) {
      console.log('i am run')
      setVisitedList([]);
      setPrevSkip(0);
      loadData(true);
    }
  }, [selectedCardId, selectedCatalogId, fromDate, toDate, isCard]);

  useEffect(() => {
    const data = visitedFetch.response?.data;
    if (data && data?.length) {
      setVisitedList([...visitedList, ...data]);
    }
  }, [visitedFetch.response?.data]);

  const loadData = (freshData = false) => {
    setPrevSkip((prev) => prev + limit);

    const nextSkip = freshData ? 0 : prevSkip;
    const url = API_ROUTES.ANALYTICS_ITEM_TAB_BASES_DATE_RANGE(selectedCatalogId);
    visitedFetch.load({
      url: isCard ? `/api/v1/analytics/get_list_contents_taps_based_on_date_range/${selectedCardId}` : url,
      params: {
        from_date: fromDate,
        to_date: toDate,
        limit,
        skip: nextSkip
      },
      suppress404Toast: true
    });

  };
  const infinityDataLoad = () => {
    return (
      <InfiniteScroll
        dataLength={visitedList.length}
        next={loadData}
        hasMore
      // hasMore={hasMoreVisitedItems} // Boolean indicating if there's more data to load
      // loader={<LoadingState />} // Component that shows a loading indicator
      >
        {visitedList.map((item) => (
          <div key={item.guid}>
            {/* Profile image display */}
            <div
              className=" rounded-md py-2 px-5 mb-3 bg-white overflow-hidden
                      flex items-center justify-between"
            >
              <span className="flex items-center">
                <Image
                  width={36}
                  height={36}
                  alt={item.title}
                  src={item.s3_icon_url}
                  className=" rounded-full me-5"
                />

                <p className="font-semibold">{item.title}</p>
              </span>
              <span className="flex items-center">
                <p className="me-2 underline">{item.taps}</p>
                <p className="text-sm">کلیک</p>
              </span>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-9 mb-6">
        <p className="text-lg font-medium "></p>
      </div>
      <p className="font-semibold mb-4">آمار بازدید آیتم ها</p>
      {!visitedFetch.isLoading && visitedList.length == 0 ? (
        <div className="bg-muted py-2 px-3 rounded-md opacity-60 mt-10">
          <p>اطلاعاتی موجود نیست</p>
        </div>
      ) : (
        infinityDataLoad()
      )}
    </div>
  );
};

export default StatsList;
