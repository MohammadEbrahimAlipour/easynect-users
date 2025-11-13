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
      text: "Connection"
    }
  },
  scales: {
    x: {
      grid: { display: false }
    },
    y: {
      grid: { display: false }
    }
  },
  elements: {
    line: {
      borderColor: "#CEA16A",
      borderWidth: 2,
      tension: 0.2,
      fill: true,
      backgroundColor: "rgba(206, 161, 106, 0.15)"
    }
  },
  legend: {
    display: false
  }
};

const ChartDataContacts = ({ chartConnection }) => {
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
    if (Array.isArray(chartConnection) && chartConnection.length > 0) {
      // بر اساس داده‌های فعلی، از title برای labels و taps برای مقدار استفاده می‌کنیم
      const labels = chartConnection.map((item) => item.title);
      const dataValues = chartConnection.map((item) => item.taps);

      setChartData({
        labels,
        datasets: [
          {
            label: "Taps per Item",
            data: dataValues,
            borderColor: "#CEA16A",
            backgroundColor: "rgba(206, 161, 106, 0.25)",
            borderWidth: 2,
            tension: 0.3
          }
        ]
      });

      options.plugins.title.text = "Total Connections";
    } else {
      // در صورت نبود داده
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
  }, [chartConnection]);

  console.log("chartConnection:", chartConnection);

  return (
    <div className="bg-white pb-4 rounded-lg">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default ChartDataContacts;
