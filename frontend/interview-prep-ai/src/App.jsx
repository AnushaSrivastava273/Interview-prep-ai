import React from 'react';
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import UserProvider from './context/userContext';
import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="main-content">
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
          </Routes>
        </div>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </Router>
    </UserProvider>
  );
}

export default App;
