import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilesPage = () => {
  const [newProfile, setNewProfile] = useState({
    email: "",
    password: "",
    age: "",
    weight: "",
    height: "",
    profile_image: null,
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProfile({ ...newProfile, profile_image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in newProfile) {
      formData.append(key, newProfile[key]);
    }

    axios
      .post("http://127.0.0.1:8000/api/profiles/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        // Navigate and pass profile data to ProfileDetailsPage
        navigate("/profile-details", {
          state: { profile: newProfile },
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="p-6 min-h-screen flex items-center justify-center gap-[20%]">
      {/* Main Layout */}
      <div className="flex max-w-5xl mx-auto space-x-8 items-center">
        {/* Image Section */}
        <div className="flex-1 relative">
          <div className="relative w-full h-auto rounded-lg overflow-hidden">
            {/* Image */}
            <img
              src="/gym.jpg"
              alt="Profile Illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Caption */}
          <p className="mt-4 text-center text-gray-600 italic">
            "Your fitness journey starts here."
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex-1 p-6 rounded-lg">
          {/* Form Fields */}
          <div className="mb-4">
            <label className="block font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={newProfile.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={newProfile.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={newProfile.age}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={newProfile.weight}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={newProfile.height}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Profile Image</label>
            <input
              type="file"
              name="profile_image"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Add Profile
          </button>
        </form>
      </div>

      {/* Display Error */}
      {error && <div className="text-center text-red-500 mt-4">Error: {error}</div>}
    </div>
  );
};

export default ProfilesPage;
