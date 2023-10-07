import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { ArrowDownIcon } from "./Icons";
import ChartDataView from "./ChartDataView";
import ChartDataContacts from "./ChartDataContacts";
import ChartDataViewConvertRate from "./ChartDataViewConvertRate";
import ChartDataViewShares from "./ChartDataViewShares";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: ""
    }
  },
  scales: {
    x: {
      grid: {
        display: false // Remove grid lines on the x-axis
      }
    },
    y: {
      grid: {
        display: false // Remove grid lines on the y-axis
      }
    }
  },
  elements: {
    line: {
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      borderCapStyle: "round",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      tension: 0.1,
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.5)"
    }
  },
  legend: {
    display: false // Hide the legend
  }
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 12, 13, 33, 89, 0, 12],
      borderColor: "#CEA16A",
      backgroundColor: "#ffff",
      borderLeftColor: "#ffff"
    }
  ]
};

const Chart = () => {
  // Initialize selectedOption with the value from localStorage or "view" as a default
  const [selectedOption, setSelectedOption] = useState("view");

  useEffect(() => {
    // Check if localStorage is available (only on the client-side)
    if (typeof window !== "undefined") {
      const storedOption = localStorage.getItem("selectedOption");
      if (storedOption) {
        setSelectedOption(storedOption);
      }
    }
  }, []);

  const handleOptionChange = (event) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);

    // Save the selectedOption in localStorage (only on the client-side)
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedOption", newOption);
    }
  };

  // Use useEffect to trigger rendering of the selected component
  useEffect(() => {
    // Do any additional data fetching or rendering logic here if needed
  }, [selectedOption]);

  // Define a variable to hold the selected component
  let selectedComponent;

  switch (selectedOption) {
    case "view":
      selectedComponent = <ChartDataView />;
      break;
    case "contacts":
      selectedComponent = <ChartDataContacts />;
      break;
    case "convertRate":
      selectedComponent = <ChartDataViewConvertRate />;
      break;
    case "shares":
      selectedComponent = <ChartDataViewShares />;
      break;
    default:
      selectedComponent = null;
  }

  return (
    <div className="overflow-hidden ">
      {/* date options */}
      <div className="flex justify-between items-center mb-5">
        <button
          className="bg-dark text-white rounded-2xl px-3 py-[6px] focus:outline-none
         text-sm flex justify-center items-center"
        >
          <span className="me-[0.5]">۷ روز گذشته</span>
          <ArrowDownIcon />
        </button>
        <div className="flex flex-wrap">
          {/* <label htmlFor="options">Choose a car:</label> */}
          <select
            id="options"
            value={selectedOption}
            onChange={handleOptionChange}
            className="bg-dark text-white text-sm  py-1 px-3 rounded-2xl"
          >
            <option value="view" selected>
              بازدید‌ها
            </option>
            <option value="contacts">Option 1</option>
            <option value="convertRate">Option 2</option>
            <option value="shares">Option 3</option>
          </select>
        </div>
      </div>
      {/* first row charts */}
      <div className="grid  3xl:grid-cols-12  2xl:grid-cols-12  md:grid-cols-12 gap-4"></div>
      {/* {selectedOption === "view" && <ChartDataView />}
      {selectedOption === "contacts" && <ChartDataContacts />}
      {selectedOption === "convertRate" && <ChartDataViewConvertRate />}
      {selectedOption === "shares" && <ChartDataViewShares />} */}

      {/* {selectedOption === "option2" && <YourComponent2 />}
      {selectedOption === "option3" && <YourComponent3 />} */}
      {/* <Line options={options} data={data} /> */}
      {selectedComponent}
    </div>
  );
};

export default Chart;
