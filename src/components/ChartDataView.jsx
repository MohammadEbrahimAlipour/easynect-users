import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "jalali-moment";
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

const ChartDataView = ({ chartView }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "داده‌ای ثبت نشده",
        data: [],
        borderColor: "rgba(0, 0, 0, 0.1)",
        backgroundColor: "rgba(0, 0, 0, 0.05)"
      }
    ]
  });

useEffect(() => {
  if (chartView && Array.isArray(chartView.views)) {
    // حالت عادی
    const labels = chartView.views.map(view =>
      moment(view.date, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD")
    );
    const dataValues = chartView.views.map(view => view.views);

    setChartData({
      labels,
      datasets: [
        {
          label: "بازدیدها",
          data: dataValues,
          borderColor: "#CEA16A",
          backgroundColor: "#ffff"
        }
      ]
    });

    options.plugins.title.text = `Total View: ${chartView.total_view}`;
  } else if (chartView && typeof chartView.views === "number") {
    // اگر views عددی بود
    setChartData({
      labels: ["امروز"],
      datasets: [
        {
          label: "بازدیدها",
          data: [chartView.views],
          borderColor: "#CEA16A",
          backgroundColor: "#ffff"
        }
      ]
    });
    options.plugins.title.text = `Total View: ${chartView.views}`;
  } else {
    // داده‌ای نیست
    setChartData({
      labels: [],
      datasets: [
        {
          label: "داده‌ای ثبت نشده",
          data: [],
          borderColor: "rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(0, 0, 0, 0.05)"
        }
      ]
    });
    options.plugins.title.text = "داده‌ای ثبت نشده";
  }
}, [chartView]);


  return (
    <div className="bg-white pb-4 rounded-lg">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default ChartDataView;
