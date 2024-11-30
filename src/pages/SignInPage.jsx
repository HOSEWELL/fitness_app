import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInPage = () => {
  const [userId, setUserId] = useState("1"); // Default ID set to 1
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleFetchDetails = async (e) => {
    e.preventDefault();

    try {
      // Make API call using the entered user ID
      const response = await axios.get(`http://127.0.0.1:8000/api/profiles/${userId}/`);

      // Update the userDetails state with the response data
      setUserDetails(response.data);
      setError(null); // Clear any previous error
    } catch (err) {
      setError("Error fetching user details. Please check the ID and try again.");
      setUserDetails(null); // Clear previous user details if the fetch fails
    }
  };

  return (
    <div className="p-6 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full space-y-6">
        <h2 className="text-2xl font-bold text-center">User Profile</h2>
        {/* Input Form */}
        {!userDetails && (
          <form onSubmit={handleFetchDetails} className="space-y-4">
            <div>
              <label htmlFor="userId" className="block text-gray-700 font-medium">
                User ID
              </label>
              <input
                type="number"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full p-3 border rounded-lg mt-1"
                placeholder="Enter User ID (default: 1)"
                min="1"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Fetch Profile
              </button>
            </div>
          </form>
        )}

        {/* User Details Section */}
        {userDetails && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Profile Details</h3>
            <p>
              <strong>Email:</strong> {userDetails.email}
            </p>
            <p>
              <strong>Age:</strong> {userDetails.age}
            </p>
            <p>
              <strong>Weight:</strong> {userDetails.weight} kg
            </p>
            <p>
              <strong>Height:</strong> {userDetails.height} cm
            </p>
            {userDetails.profile_image && (
              <div>
                <strong>User Image:</strong>
                <img
                  src={`http://127.0.0.1:8000${userDetails.profile_image}`}
                  alt="Profile"
                  className="rounded-full w-32 h-32 mx-auto"
                />
              </div>
            )}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
