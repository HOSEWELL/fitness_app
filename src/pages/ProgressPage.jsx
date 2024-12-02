import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressPage = () => {
  const navigate = useNavigate(); 
  const [activityLogs, setActivityLogs] = useState([]); 
  
  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/activity-logs/");
        const data = await response.json();
        setActivityLogs(data); 
      } catch (error) {
        console.error("Error fetching activity logs:", error); 
      }
    };

    fetchActivityLogs(); 
  }, []); 

  const getChartData = () => {
    return {
      labels: activityLogs.map(log => log.date), 
      datasets: [
        {
          label: "Calories Burned",
          data: activityLogs.map(log => log.calories_burned), 
          borderColor: "#4BC0C0", 
          backgroundColor: "rgba(75, 192, 192, 0.2)", 
          fill: true, 
          tension: 0.4, 
          pointRadius: 5, 
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true, 
    plugins: {
      title: {
        display: true, 
        text: "Activity Progress Over Time", 
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`; 
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true, 
          text: "Date", 
        },
      },
      y: {
        title: {
          display: true, 
          text: "Calories Burned", 
        },
        beginAtZero: true, 
      },
    },
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Title Section */}
      <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 text-center mb-6">
        Activity Progress Page
      </h2>

      {/* Graph Section */}
      <div className="mb-6">
        <Line data={getChartData()} options={chartOptions} />
      </div>

      {/* Floating Button for navigation */}
      <div className="fixed bottom-4 right-4 sm:right-8 bg-blue-500 text-white rounded-full p-4 shadow-lg cursor-pointer hover:bg-green-600 transition duration-300">
        <button
          onClick={() => navigate("/dashboard")} 
          className="text-base sm:text-lg font-bold"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ProgressPage;
