import { useState } from "react";
import "./App.css";
import Quizpage from "./Components/Quizpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


function App() {
  return (
    <>
      <Quizpage />
      <ToastContainer />
    </>
  );
}

export default App;
