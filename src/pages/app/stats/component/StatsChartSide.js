import Chart from "@/components/Chart";
import { ArrowDownIcon } from "@/components/Icons";
import { useState } from "react";

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
}) => {
	const [toggleMenu, setToggleMenu] = useState(false);
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
			{/* <Chart
				chartView={chartView}
				selectedOption={selectedOption}
				chartConnection={chartConnection}
				chartShare={chartShare}
				chartConvert={chartConvert}
			/> */}
		</div>
	)
}

export default StatsChartSide;