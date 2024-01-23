import { useEffect, useMemo } from "react";

import useFetch from "@/hooks/useFetch";

import StatsCard from "@/components/StatsCard";
import LoadingState from "@/components/LoadingState";

const StatsTopSideCard = ({
	onSelectedId,
	selectedCardId,
}) => {
	const statsCardFetch = useFetch();

	useEffect(() => {
		statsCardFetch.load({ url: '/api/v1/analytics/pages/' })
	}, [])

	useEffect(() => {
		const data = statsCardFetch.response?.data;
		if (data && Array.isArray(data) && data?.length) {
			onSelectedId(data?.[0]?.id);
		}
	}, [statsCardFetch.response?.data]);

	const statsList = useMemo(() => {
		const data = statsCardFetch.response?.data;
		if (data && Array.isArray(data)) {
			return data;
		}

		return [];
	}, [statsCardFetch.response?.data])

	if (statsCardFetch.isLoading)
		return <LoadingState />

	return (
		<div
			// ref={containerRef}
			className="grid grid-flow-col auto-cols-[36%] overscroll-contain overflow-x-auto 
                  hide-scrollbar gap-2 snap-x"
		// onMouseDown={handleMouseDown}
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
	)
}

export default StatsTopSideCard;