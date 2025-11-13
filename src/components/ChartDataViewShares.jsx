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
      text: "Shares"
    }
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { display: false } }
  },
  elements: {
    line: {
      borderColor: "#CEA16A",
      borderWidth: 2,
      tension: 0.3,
      fill: true,
      backgroundColor: "rgba(206, 161, 106, 0.15)"
    }
  },
  legend: { display: false }
};

const ChartDataViewShares = ({ chartShare }) => {
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
    if (Array.isArray(chartShare) && chartShare.length > 0) {
      const labels = chartShare.map((item) =>
        moment(item.date, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD")
      );

      const dataValues = chartShare.map((item) => item.taps);

      setChartData({
        labels,
        datasets: [
          {
            label: "تعداد اشتراک‌گذاری‌ها",
            data: dataValues,
            borderColor: "#CEA16A",
            backgroundColor: "rgba(206, 161, 106, 0.2)",
            borderWidth: 2,
            tension: 0.25
          }
        ]
      });

      options.plugins.title.text = "نمودار اشتراک‌گذاری‌ها";
    } else {
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
  }, [chartShare]);

  console.log("chartShare:", chartShare);

  return (
    <div className="bg-white pb-4 rounded-lg">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default ChartDataViewShares;
