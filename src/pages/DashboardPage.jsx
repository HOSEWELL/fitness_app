import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2"; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const [graphData, setGraphData] = useState(null);  
  const [isLoading, setIsLoading] = useState(true); 
  const [quote, setQuote] = useState("");  
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [newActivity, setNewActivity] = useState({  
    activity_type: "",  
    duration: "",
    calories_burned: "",
    date: "",
    user: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/graph-data/");
        setGraphData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };
    fetchGraphData();

    // Fetch a random motivational quote
    const motivationalQuotes = [
      "Push yourself because no one else is going to do it for you.",
      "Success starts with self-discipline.",
      "Don’t limit your challenges. Challenge your limits.",
      "The pain you feel today will be the strength you feel tomorrow.",
      "It always seems impossible until it’s done.",
    ];
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, []);

  // Handle input change in the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to save the new activity
      await axios.post("http://127.0.0.1:8000/api/activity-logs/", newActivity);
      alert("Activity added successfully!");
  
      // Close the modal and reset form data
      setIsModalOpen(false);
      setNewActivity({
        activity_type: "",
        duration: "",
        calories_burned: "",
        date: "",
        user: "",
      }); 
  
    } catch (error) {
      console.error("Error adding activity:", error);
      alert("Error adding activity. Please check your input and try again.");
    }
  };
  

  // Set up the chart data format
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Activity Trends Over Time",
      },
    },
  };

  const chartData = {
    labels: graphData?.labels || [],  // Assuming the API returns an array of labels (e.g., months, dates)
    datasets: [
      {
        label: "Activities",
        data: graphData?.data || [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

        {/* Motivational Section */}
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
          <div className="text-center">
            <img
              src="https://i.pinimg.com/736x/70/70/1d/70701d644c455635a98ec3a1752b5e27.jpg"
              alt="Motivational"
              className="w-[45em] rounded-md mb-4 h-[20em] animate-popFromTop"
            />
            <p className="text-lg font-semibold text-gray-700 italic animate-popFromTop delay-200">
              "{quote}"
            </p>
          </div>
        </div>

        {/* Display the graph */}
        {isLoading ? (
          <div className="text-gray-500">Loading graph...</div>
        ) : (
          <div className="w-full max-w-3xl">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 shadow-lg cursor-pointer hover:bg-blue-600 transition duration-300"
      >
        <span className="text-xl font-bold">New Activity</span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Activity</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <select
                name="activity_type"
                value={newActivity.activity_type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Activity Type</option>
                <option value="Running">Running</option>
                <option value="Cycling">Cycling</option>
                <option value="Yoga">Yoga</option>
                <option value="Swimming">Swimming</option>
                {/* Add more activity types as needed */}
              </select>

              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={newActivity.duration}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                name="calories_burned"
                placeholder="Calories Burned"
                value={newActivity.calories_burned}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="date"
                name="date"
                value={newActivity.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="user"
                placeholder="User"
                value={newActivity.user}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
