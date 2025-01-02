import React, { useState } from "react";
import './homepage.css'; // Import your styles
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ResponsiveDashboard } from './page/DashboardAdmin.jsx';
import { ResponsiveDashboardT } from './page/DashboardTaker.jsx';
import ResponsiveDashboardM from './page/DashboardMaker.jsx';

// Home Page Component
function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      // Fetch user data from the backend
      const response = await axios.get("http://localhost:8081/api/users");
      const users = response.data;

      // Find the user matching the email and password
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Navigate based on the user's role
        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "exammaker") {
          navigate("/maker");
        } else if (user.role === "examtaker") {
          navigate("/taker");
        } else {
          // Navigate to a default route or handle unexpected roles
          navigate("/taker");
        }
      } else {
        // Show an error if the credentials are incorrect
        alert("Wrong username or password");
      }

    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to sign in. Please try again later.");
    }
  };

  return (
    <div className="main-container">
      <div className="home-page">
        <div className="flex-column-cf">
          <div className="online-exam-banner" />
          <span className="unlock-your-potential">
            Unlock your potential with Smartex <br />
          </span>
          <span className="academic-excellence">
            The ultimate platform for academic excellence!
          </span>
          <div className="rectangle" />
        </div>
        <div className="flex-column-a">
          <span className="smartex">SmarTex</span>
          <div className="email" />
          <input
            type="email"
            className="email-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="line-2" />
          <div className="password" />
          <input
            type="password"
            className="password-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="line" />
          <button
            className="primary-button"
            onClick={handleSignIn}
          >
            <span className="sign-in">Sign In</span>
            <div className="rectangle-1" />
          </button>
        </div>
      </div>
    </div>
  );
}



// App Component with Routing
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home route */}
        <Route path="/admin/*" element={<ResponsiveDashboard />} />
        <Route path="/taker/*" element={<ResponsiveDashboardT />} />
        <Route path="/maker/*" element={<ResponsiveDashboardM />} />

      </Routes>
    </Router>
  );
}
