import React from "react";
import { useNavigate } from "react-router-dom";

const ProgressPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex flex-col justify-between">
      <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 text-center mb-6">
        Progress Page
      </h2>
      {/* Floating Button */}
      <div className="fixed bottom-4 right-4 sm:right-8 bg-blue-500 text-white rounded-full p-4 shadow-lg cursor-pointer hover:bg-green-600 transition duration-300">
        <button
          onClick={() => navigate("/")}
          className="text-base sm:text-lg font-bold"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ProgressPage;
