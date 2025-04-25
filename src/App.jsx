import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomePage";
import Quizpage from "./Components/Quizpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ReportCard from "./Components/ReportCard";

// Wrapper to force Quizpage to re-render on every visit
function QuizRouteWrapper({ userName }) {
  const location = useLocation();
  const selectedSubject = localStorage.getItem("selectedSubject");

  return (
    <Quizpage
      key={location.key} // unique key so it re-renders every time
      selectedSubject={selectedSubject}
      userName={userName}
    />
  );
}

const App = () => {
  const [userName] = useState("Irene");

  return (
    <Router>
      <Navbar username={userName} />
      <Routes>
        <Route path="/" element={<HomePage username={userName} />} />
        <Route
          path="/quiz"
          element={<QuizRouteWrapper userName={userName} />}
        />
        <Route path="/report" element={<ReportCard userName={userName} />} />{" "}
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
