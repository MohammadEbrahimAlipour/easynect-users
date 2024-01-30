import LoadingState from "@/components/LoadingState"
import useFetch from "@/hooks/useFetch"
import Image from "next/image"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

const StatsList = ({
	selectedCardId,
	fromDate,
	toDate,
}) => {
	const visitedFetch = useFetch();
	const [visitedList, setVisitedList] = useState([]);

	useEffect(() => {
		if (selectedCardId) {
			setVisitedList([]);
			loadData(true);
		}
	}, [selectedCardId, fromDate, toDate]);

	useEffect(() => {
		const data = visitedFetch.response?.data;
		if (data && data?.length) {
			setVisitedList([...visitedList, ...data]);
		}
	}, [visitedFetch.response?.data]);

	const loadData = (freshData = false) => {
		visitedFetch.load({
			url: `/api/v1/analytics/get_list_contents_taps_based_on_date_range/${selectedCardId}`,
			params: {
				from_date: fromDate,
				to_date: toDate,
				skip:  freshData ? 0 :visitedList?.length,
				limit: 10,
			}
		})

	}

	return (
		<div>
			<div className="flex justify-between items-center mt-9 mb-6">
				<p className="text-lg font-medium ">
					{/* {selectedButton === "content" &&
                    "content"}
                  {selectedButton === "hm_item" && "hm_item"} */}
				</p>
			</div>
			<p className="font-semibold mb-4">آمار بازدید آیتم ها</p>
			<InfiniteScroll
				dataLength={visitedList.length}
				next={loadData}
				hasMore
				// hasMore={hasMoreVisitedItems} // Boolean indicating if there's more data to load
				loader={<LoadingState />} // Component that shows a loading indicator
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
		</div>
	)
}

export default StatsList