import React from "react";
import { useNavigate } from "react-router-dom";

const subjects = ["Math", "Physics", "Chemistry", "Biology", "Geography"];

export default function HomePage({ username }) {
  const navigate = useNavigate();

  const handleSelect = (subject) => {
    localStorage.setItem("selectedSubject", subject);
    navigate("/quiz");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Think you're a genius? Prove it. Select a subject!{username ? `, ${username}` : ""}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject}
            onClick={() => handleSelect(subject)}
            className="bg-white rounded-xl shadow hover:shadow-md p-6 text-center cursor-pointer transition"
          >
            <h2 className="text-lg font-medium">{subject}</h2>
          </div>
        ))}
      </div>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        📘 Powered by <strong>Ultimate Quizzy</strong>
      </footer>
    </div>
  );
}
