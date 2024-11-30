import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TeaserPage from "./pages/TeaserPage";
import ProfilesPage from "./pages/ProfilesPage";
import SignInPage from "./pages/SignInPage";
import ProfileDetailsPage from "./pages/ProfileDetailsPage"; 
import DashboardPage from "./pages/DashboardPage"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeaserPage />} />
        <Route path="/profiles" element={<ProfilesPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/profile-details" element={<ProfileDetailsPage />} /> 
        <Route path="/dashboard" element={<DashboardPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
