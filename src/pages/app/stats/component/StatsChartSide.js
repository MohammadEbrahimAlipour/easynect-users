import { useMemo, useState, useEffect } from "react";

import useFetch from "@/hooks/useFetch";

import Chart from "@/components/Chart";
import { ArrowDownIcon } from "@/components/Icons";

const optionTexts = {
	view: "بازدید‌ها",
	contacts: "مخاطبین",
	convertRate: "نرخ تبدیل",
	shares: "اشتراک‌ها"
};

const StatsChartSide = ({
	onChangeShowFilterDateMenu,
	onChangeTypeFilter,
	typeFilter,
	selectedCardId,
	fromDate,
	toDate,
}) => {
	const [toggleMenu, setToggleMenu] = useState(false);
	const viewFetch = useFetch();
	const connectionFetch = useFetch();
	const convertFetch = useFetch();
	const shareFetch = useFetch();

	useEffect(() => {
		if (selectedCardId && typeFilter) {
			getData(typeFilter);
		}
	}, [selectedCardId, typeFilter, fromDate, toDate]);

	const getData = (filter) => {
		const params = {
			from_date: fromDate,
			to_date: toDate,
		};

		switch (filter) {
			case 'view':
				viewFetch.load({
					url: `/api/v1/analytics/get_page_view_based_on_date_range/${selectedCardId}`,
					params
				})
				break;
			case 'contacts':
				connectionFetch.load({
					url: `/api/v1/analytics/get_page_connection_stats_based_on_date_range/${selectedCardId}`,
					params
				})
				break;
			case 'convertRate':
				convertFetch.load({
					url: `/api/v1/analytics/get_page_convert_rate_based_on_date_range/${selectedCardId}`,
					params
				})
				break;
			case 'shares':
				shareFetch.load({
					url: `/api/v1/analytics/get_page_view_based_on_date_range_by_share/${selectedCardId}`,
					params
				})
				break;

			default:
				break;
		}

	}

	const viewData = useMemo(() => {
		if (viewFetch.response?.data)
			return viewFetch.response?.data
		return {};
	}, [viewFetch.response])

	const connectionData = useMemo(() => {
		if (connectionFetch.response?.data)
			return connectionFetch.response?.data
		return {};
	}, [connectionFetch.response])

	const convertData = useMemo(() => {
		if (convertFetch.response?.data)
			return convertFetch.response?.data
		return {};
	}, [convertFetch.response])

	const shareData = useMemo(() => {
		if (shareFetch.response?.data)
			return shareFetch.response?.data
		return {};
	}, [shareFetch.response])

	return (
		<div className="my-5 w-full">
			<div className="flex justify-between items-center mb-5">
				<button
					onClick={() => onChangeShowFilterDateMenu(true)}
					className="bg-dark text-white rounded-2xl px-3 py-[6px] focus:outline-none
 text-sm flex justify-center items-center"
				>
					<span className="me-1">انتخاب زمان</span>
					<ArrowDownIcon />
				</button>
				<div className="flex flex-wrap">
					<div className="relative inline-block text-left">
						<div>
							<button
								onClick={() => setToggleMenu(prev => !prev)}
								type="button"
								className="inline-flex w-full justify-center items-center gap-x-1 rounded-2xl bg-dark text-white px-3 py-[6px] text-sm font-medium shadow-sm  "
								id="menu-button"
								aria-expanded="true"
							>
								{optionTexts[typeFilter]}
								<ArrowDownIcon />
							</button>
						</div>
						{
							toggleMenu &&
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
											onClick={() => {
												onChangeTypeFilter(value);
												setToggleMenu(false);
											}}
											value={value}
											className="text-gray-700 block px-4 py-2 text-xs w-full border-b-[1px]"
											role="menuitem"
											tabindex="-1"
											id={`menu-item-${value}`}
										>
											{optionTexts[value]}{" "}
										</button>
									))}
								</div>
							</div>
						}
					</div>
				</div>
			</div>
			<Chart
				selectedOption={typeFilter}
				chartView={viewData}
				chartConnection={connectionData}
				chartShare={convertData}
				chartConvert={shareData}
			/>
		</div>
	)
}

export default StatsChartSide;