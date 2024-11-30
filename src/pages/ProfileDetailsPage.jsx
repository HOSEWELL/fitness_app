import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access the profile data passed from ProfilesPage
  const { profile } = location.state || {};

  return (
    <div className="p-6 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">Profile Details</h2>
        {profile ? (
          <div>
            <div className="space-y-4">
              <p>ID <span className="text-red-600">(Remember this ID)</span>: {profile.id}</p>
              <p>Email: {profile.email}</p>
              <p>Age: {profile.age}</p>
              <p>Weight: {profile.weight} kg</p>
              <p>Height: {profile.height} cm</p>
              {profile.profile_image && (
                <img
                  src={URL.createObjectURL(profile.profile_image)} // Display uploaded image
                  alt="Profile"
                  className="rounded-full w-32 h-32 mx-auto"
                />
              )}
            </div>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetailsPage;
