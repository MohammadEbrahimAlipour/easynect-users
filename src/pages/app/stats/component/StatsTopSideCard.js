import { useEffect, useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import StatsCard from "@/components/StatsCard";
import LoadingState from "@/components/LoadingState";
import StatsMenuTop from "./StatsMenuTop";

const StatsTopSideCard = ({
  isCard,
  onSelectedId,
  onSelectedSubId,
  selectedCardId,
  selectedCatalogId,
}) => {
  const statsCardFetch = useFetch();

  useEffect(() => {
    statsCardFetch.load({ url: "/api/v1/analytics/pages/" });
  }, []);

  useEffect(() => {
    const data = statsCardFetch.response?.data;
    if (data && Array.isArray(data) && data.length) {
      onSelectedId(data[0]?.id);
    }
  }, [statsCardFetch.response?.data]);

  const statsList = useMemo(() => {
    const data = statsCardFetch.response?.data;
    return Array.isArray(data) ? data : [];
  }, [statsCardFetch.response?.data]);

  if (statsCardFetch.isLoading) return <LoadingState />;

  return (
    <div className="w-full">
      {/* 🟢 کارت‌ها با اسکرول افقی */}
      <div
        className="grid grid-flow-col auto-cols-[36%] overscroll-contain overflow-x-auto 
                  hide-scrollbar gap-2 snap-x overflow-y-auto"
      >
        {statsList.map((item) => (
          <StatsCard
            key={item.id}
            item={item}
            selectedCardId={selectedCardId}
            onClick={() => onSelectedId(item.id)}
          />
        ))}
      </div>

      {/* 🟢 منوها زیر کارت انتخاب‌شده و تمام‌عرض */}
      {!isCard && (
        <div className="w-full mt-4">
          {statsList
            .filter((item) => selectedCardId === item.id)
            .map((item) => (
              <div key={item.id} className="w-full flex flex-col  gap-1">
                <p className="font-medium text-sm text-gray-700 mb-1">منوها</p>
                <div className="grid grid-flow-col auto-cols-[36%] overscroll-contain overflow-x-auto 
                  hide-scrollbar gap-2 snap-x overflow-y-auto">
                  {item.catalogs?.map((value) => (
                    <StatsMenuTop
                      key={value.id}
                      item={value}
                      selectedCardId={selectedCatalogId}
                      onClick={() => onSelectedSubId(value.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default StatsTopSideCard;
