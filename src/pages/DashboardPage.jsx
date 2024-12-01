import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [quote, setQuote] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    goal_type: "steps",
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
        goal_type: "steps",
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
        className="fixed bottom-20 right-4 sm:right-8 bg-blue-500 text-white rounded-full p-3 sm:p-4 shadow-lg cursor-pointer hover:bg-green-600 transition duration-300"
      >
        <span className="text-base sm:text-xl font-bold">Set Goal</span>
      </div>

      <div
        onClick={() => navigate("/progress")}
        className="fixed bottom-4 right-4 sm:right-8 bg-blue-500 text-white rounded-full p-3 sm:p-4 shadow-lg cursor-pointer hover:bg-green-600 transition duration-300"
      >
        <span className="text-base sm:text-xl font-bold">View Progress</span>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Set a New Goal</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <select
                name="goal_type"
                value={newGoal.goal_type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="steps">Steps</option>
                <option value="calories">Calories</option>
                <option value="workout">Workout Duration</option>
              </select>
              <input
                type="number"
                name="goal_value"
                placeholder="Goal Value"
                value={newGoal.goal_value}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="date"
                name="start_date"
                value={newGoal.start_date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="date"
                name="end_date"
                value={newGoal.end_date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-600"
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
