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
      text: "connection"
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
      data: [30, 12, 13, 0, 89, 0, 12],
      borderColor: "#CEA16A",
      backgroundColor: "#ffff",
      borderLeftColor: "#ffff"
    }
  ]
};

const ChartDataContacts = ({ chartConnection }) => {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartDataValues, setChartDataValues] = useState([]);
  useEffect(() => {
    // Check if chartView is defined and has the expected structure
    if (
      chartConnection &&
      chartConnection.views &&
      Array.isArray(chartConnection.views)
    ) {
      // Extract data from chartView and transform it into the format Chart.js expects
      const extractedLabels = chartConnection.views.map((view) => view.date);
      const extractedDataValues = chartConnection.views.map(
        (view) => view.views
      );

      // Update the state variables with the transformed data
      setChartLabels(extractedLabels);
      setChartDataValues(extractedDataValues);
    }
  }, [chartConnection]);
  // conditionally Update the chart title to include the total_view value

  if (
    chartConnection &&
    chartConnection.views &&
    Array.isArray(chartConnection.views)
  ) {
    options.plugins.title.text = `Total Connection: ${chartConnection.total_view}`;
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
    <div className="bg-white pb-4 rounded-lg">
      {chartConnection ? (
        <Line options={options} data={data} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default ChartDataContacts;
