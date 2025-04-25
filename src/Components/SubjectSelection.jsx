// src/Components/SubjectSelection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const subjects = ["Math", "Physics", "Chemistry", "Biology", "Geography"];

const SubjectSelection = ({ setSelectedSubject, setUserName }) => {
  const navigate = useNavigate();

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setUserName("Mary Jane"); // You can customize or make this user input
    navigate("/quiz");
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Choose a Subject</h2>
      {subjects.map((subject) => (
        <button
          key={subject}
          onClick={() => handleSubjectClick(subject)}
          className="m-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {subject}
        </button>
      ))}
    </div>
  );
};

export default SubjectSelection;
