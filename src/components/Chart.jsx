import React, { useEffect, useState, useRef } from "react";
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

const Chart = ({ chartView, selectedOption }) => {
  // Initialize selectedOption with the value from localStorage or "view" as a default

  const submenuRef = useRef(null);

  // Use useEffect to trigger rendering of the selected component
  useEffect(() => {
    // Do any additional data fetching or rendering logic here if needed
  }, [selectedOption]);

  // Define a variable to hold the selected component
  let selectedComponent;

  switch (selectedOption) {
    case "view":
      selectedComponent = <ChartDataView chartView={chartView} />;
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
    <>
      <div className="overflow-hidden ">
        {/* date options */}

        {selectedComponent}
      </div>
    </>
  );
};

export default Chart;
