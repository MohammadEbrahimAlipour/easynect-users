import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
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
      text: "choose one"
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

const ChartDataViewShares = ({ chartShare }) => {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartDataValues, setChartDataValues] = useState([]);

  useEffect(() => {
    // Check if chartView is defined and has the expected structure
    if (chartShare && chartShare.views && Array.isArray(chartShare.views)) {
      // Extract data from chartView and transform it into the format Chart.js expects
      const extractedLabels = chartShare.views.map((view) => view.date);
      const extractedDataValues = chartShare.views.map((view) => view.views);

      // Update the state variables with the transformed data
      setChartLabels(extractedLabels);
      setChartDataValues(extractedDataValues);
    }
  }, [chartShare]);
  // conditionally Update the chart title to include the total_view value
  if (chartShare && chartShare.views && Array.isArray(chartShare.views)) {
    options.plugins.title.text = `Total Shares: ${chartShare.total_view}`;
  }
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Dataset 1",
        data: chartDataValues,
        borderColor: "#CEA16A",
        backgroundColor: "#ffff",
        borderLeftColor: "#ffff"
      }
    ]
  };
  return (
    <div className="bg-white pb-4 rounded-lg ">
      <Line options={options} data={data} />
    </div>
  );
};

export default ChartDataViewShares;
