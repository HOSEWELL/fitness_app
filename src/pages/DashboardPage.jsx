import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [quote, setQuote] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    goal_type: "choose goal type",
    goal_value: "",
    start_date: "",
    end_date: "",
    user: 1,
  });
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const motivationalQuotes = [
      "Push yourself because no one else is going to do it for you.",
      "Success starts with self-discipline.",
      "Don’t limit your challenges. Challenge your limits.",
      "The pain you feel today will be the strength you feel tomorrow.",
      "It always seems impossible until it’s done.",
    ];
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

    const fetchGoals = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/goals/");
        setGoals(response.data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, []);

  // Progress update states
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [activityLog, setActivityLog] = useState({
    activity_type: "cardio",
    duration: "",
    calories_burned: "",
    date: "",
    profile: 1,
  });

  const handleActivityInputChange = (e) => {
    const { name, value } = e.target;
    setActivityLog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleActivityFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/activity-logs/", activityLog);
      alert("Activity log updated successfully!");
      setIsProgressModalOpen(false);
      setActivityLog({
        activity_type: "cardio",
        duration: "",
        calories_burned: "",
        date: "",
        profile: 1,
      });
    } catch (error) {
      console.error("Error updating activity log:", error);
      alert("Error updating activity log. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/goals/", newGoal);
      alert("Goal set successfully!");
      setIsModalOpen(false);
      setGoals((prevGoals) => [...prevGoals, response.data]);
      setNewGoal({
        goal_type: "choose goal type",
        goal_value: "",
        start_date: "",
        end_date: "",
        user: 1,
      });
    } catch (error) {
      console.error("Error setting goal:", error);
      alert("Error setting goal. Please check your input and try again.");
    }
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
      <div className="flex flex-col space-y-6 sm:space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 text-center">Dashboard</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 md:ml-[15em]">
          <img
            src="https://i.pinimg.com/736x/70/70/1d/70701d644c455635a98ec3a1752b5e27.jpg"
            alt="Motivational"
            className="rounded-md w-full sm:h-[8em] sm:w-[25em] mb-4 sm:mb-0 md:h-[15em]"
          />
          <p className="text-lg font-semibold text-gray-700 italic text-center sm:text-left">"{quote}"</p>
        </div>

        <div>
          <h3 className="text-3xl sm:text-4xl font-bold text-blue-500 text-center">My Goals</h3>
          {goals.length > 0 ? (
            <ul className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-5 px-2 sm:p-9">
              {goals.map((goal) => (
                <li key={goal.id} className="p-4 bg-white rounded shadow">
                  <p>Goal Type: {goal.goal_type}</p>
                  <p>Goal Value: {goal.goal_value}</p>
                  <p>Status: {goal.status}</p>
                  <p>Start Date: {goal.start_date}</p>
                  <p>End Date: {goal.end_date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No goals set yet.</p>
          )}
        </div>
      </div>

      <div
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-40 right-4 sm:right-8 bg-blue-500 text-white rounded-full p-3 sm:p-4 shadow-lg cursor-pointer hover:bg-green-600 transition duration-300"
      >
        <span className="text-base sm:text-xl font-bold">Set Goal</span>
      </div>

      <div
        onClick={() => navigate("/progress")}
        className="fixed bottom-24 right-4 sm:right-8 bg-blue-500 text-white rounded-full p-3 sm:p-4 shadow-lg cursor-pointer hover:bg-green-600 transition duration-300"
      >
        <span className="text-base sm:text-xl font-bold">View Progress</span>
      </div>

      {/* Floating Update Progress Button */}
      <div
        onClick={() => setIsProgressModalOpen(true)}
        className="fixed bottom-6 right-4 sm:right-8 bg-blue-500 text-white rounded-full p-3 sm:p-4 shadow-lg cursor-pointer hover:bg-green-600 transition duration-300"
      >
        <span className="text-base sm:text-xl font-bold">Update Progress</span>
      </div>

      {/* Update Progress Modal */}
      {isProgressModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Update Progress</h3>
            <form onSubmit={handleActivityFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="activity_type" className="block text-gray-700 mb-1">Activity Type</label>
                <select
                  id="activity_type"
                  name="activity_type"
                  value={activityLog.activity_type}
                  onChange={handleActivityInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="cardio">Cardio</option>
                  <option value="strength">Strength</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="steps">Steps</option>
                  <option value="workout">Workout</option>
                </select>
              </div>
              <div>
                <label htmlFor="duration" className="block text-gray-700 mb-1">Duration (minutes)</label>
                <input
                  id="duration"
                  type="number"
                  name="duration"
                  placeholder="Enter duration in minutes"
                  value={activityLog.duration}
                  onChange={handleActivityInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="calories_burned" className="block text-gray-700 mb-1">Calories Burned</label>
                <input
                  id="calories_burned"
                  type="number"
                  name="calories_burned"
                  placeholder="Enter calories burned"
                  value={activityLog.calories_burned}
                  onChange={handleActivityInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-gray-700 mb-1">Date</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={activityLog.date}
                  onChange={handleActivityInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                Submit Progress
              </button>
            </form>
            <button
              onClick={() => setIsProgressModalOpen(false)}
              className="mt-4 text-green-500 hover:text-red-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
