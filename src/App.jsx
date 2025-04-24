import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomePage";
import Quizpage from "./Components/Quizpage";

const App = () => {
  return (
    <Router>
      <Navbar username="Irene" />
      <Routes>
        <Route path="/" element={<HomePage username="Irene" />} />
        <Route path="/quiz" element={<Quizpage />} />
      </Routes>
    </Router>
  );
};

export default App;
