import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showSetGoalModal, setShowSetGoalModal] = useState(false);
  const [showUpdateProgressModal, setShowUpdateProgressModal] = useState(false);

  const navigate = useNavigate();

  const [goalData, setGoalData] = useState({
    goal_type: "",
    goal_value: "",
    start_date: "",
    end_date: "",
  });

  const [progressData, setProgressData] = useState({
    activity_type: "",
    duration: "",
    calories_burned: "",
    date: "",
    profile: 9,
  });

  const [goals, setGoals] = useState([]);

  // Fetch Goals from API
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/goals/");
        if (response.ok) {
          const data = await response.json();
          setGoals(data);
        } else {
          console.error("Failed to fetch goals.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGoals();
  }, []);

  const handleSetGoalSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/goals/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goalData),
      });
      if (response.ok) {
        alert("Goal set successfully!");
        setShowSetGoalModal(false);
        setGoalData({ goal_type: "", goal_value: "", start_date: "", end_date: "" });
        // Refresh goals
        const updatedGoals = await response.json();
        setGoals([...goals, updatedGoals]);
      } else {
        alert("Failed to set goal.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProgressSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/activity-logs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(progressData),
      });
      if (response.ok) {
        alert("Progress updated successfully!");
        setShowUpdateProgressModal(false);
        setProgressData({ activity_type: "", duration: "", calories_burned: "", date: "", profile: "" });
      } else {
        alert("Failed to update progress.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Inspirational Image and Quote */}
      <div className="text-center p-6 bg-white shadow-md">
        <img
          src="https://i.pinimg.com/474x/70/70/1d/70701d644c455635a98ec3a1752b5e27.jpg" 
          alt="Inspiration"
          className="mx-auto rounded-lg w-[300px] h-[200px]"
        />
        <p className="mt-4 text-lg font-semibold italic text-gray-700">
          "The journey of a thousand miles begins with a single step."
        </p>
      </div>

      {/* Display Goals */}
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4 text-blue-500 text-center">Your Goals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-lg font-bold mb-2">{goal.goal_type}</h3>
              <p className="text-sm">Value: {goal.goal_value}</p>
              <p className="text-sm">Start: {goal.start_date}</p>
              <p className="text-sm">End: {goal.end_date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-10 right-10 flex flex-col gap-4">
        <button
          onClick={() => setShowSetGoalModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
        >
          Set Goal
        </button>
        <button
          onClick={() => setShowUpdateProgressModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
        >
          Update Progress
        </button>
        <button
        onClick={() => navigate("/progress")}
        className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
        >View Progress</button>
      </div>

      {/* Set Goal Modal */}
      {showSetGoalModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-xl font-bold mb-4">Set Goal</h2>
      {/* Dropdown for Goal Type */}
      <select
        value={goalData.goal_type}
        onChange={(e) => setGoalData({ ...goalData, goal_type: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      >
        <option value="">Select Goal Type</option>
        <option value="cardio">Cardio</option>
        <option value="strength">Strength</option>
        <option value="steps">Steps</option>
        <option value="workout">Workout</option>
        <option value="flexibility">Flexibility</option>
      </select>
      <input
        type="number"
        placeholder="Goal Value"
        value={goalData.goal_value}
        onChange={(e) => setGoalData({ ...goalData, goal_value: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="date"
        placeholder="Start Date"
        value={goalData.start_date}
        onChange={(e) => setGoalData({ ...goalData, start_date: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="date"
        placeholder="End Date"
        value={goalData.end_date}
        onChange={(e) => setGoalData({ ...goalData, end_date: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowSetGoalModal(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleSetGoalSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}


      {/* Update Progress Modal */}
     {/* Update Progress Modal */}
{showUpdateProgressModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-xl font-bold mb-4">Update Progress</h2>
      {/* Dropdown for Activity Type */}
      <select
        value={progressData.activity_type}
        onChange={(e) => setProgressData({ ...progressData, activity_type: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      >
        <option value="">Select Activity Type</option>
        <option value="cardio">Cardio</option>
        <option value="strength">Strength</option>
        <option value="steps">Steps</option>
        <option value="workout">Workout</option>
        <option value="flexibility">Flexibility</option>
      </select>
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={progressData.duration}
        onChange={(e) => setProgressData({ ...progressData, duration: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Calories Burned"
        value={progressData.calories_burned}
        onChange={(e) => setProgressData({ ...progressData, calories_burned: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="date"
        placeholder="Date"
        value={progressData.date}
        onChange={(e) => setProgressData({ ...progressData, date: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      {/* <input
        type="number"
        value={progressData.profile} // Profile ID is prefilled as 9
        onChange={(e) => setProgressData({ ...progressData, profile: e.target.value })}
        className="w-full mb-3 p-2 border rounded bg-gray-100"
      /> */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowUpdateProgressModal(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateProgressSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;
