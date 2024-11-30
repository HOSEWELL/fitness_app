import React from "react";
import { useNavigate } from "react-router-dom";

const TeaserPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-green-500 flex flex-col items-center justify-center text-white text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Welcome to FitLife Tracker!
      </h1>
      <p className="text-lg md:text-2xl mb-8">
        Achieve your fitness goals with personalized stats and activity logs.
      </p>
      <div className="flex gap-4">
        {/* Set Profile Button */}
        <a
          href="/profiles"
          className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow hover:bg-gray-100"
        >
          Set Profile
        </a>
        {/* Sign In Button */}
        <button
          onClick={() => navigate("/sign-in")}
          className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default TeaserPage;
