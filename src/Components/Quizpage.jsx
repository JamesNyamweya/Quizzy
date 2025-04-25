import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ResultsPage from "./ResultPage";

function Quizpage({ selectedSubject = "Math", userName = "Arif" }) {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/questions`)
      .then((res) => res.json())
      .then((data) => {
        if (data[selectedSubject]) {
          setQuestions(data[selectedSubject]);
        } else {
          console.error("Subject not found in database");
        }
      });
  }, [selectedSubject]);

  const handleAnswerChange = (index, answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Quiz: {selectedSubject}
      </h1>

      {!showResults && (
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-white shadow-md rounded-xl p-6 transition hover:shadow-lg"
            >
              <p className="text-lg font-semibold mb-4">
                {index + 1}. {question.text}
              </p>
              <div className="space-y-2">
                {question.options.map((option) => (
                  <label key={option} className="block cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      className="mr-2 accent-blue-600"
                      onChange={() => handleAnswerChange(index, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      )}

      {showResults && (
        <div className="mt-8">
          <ResultsPage
            userAnswers={userAnswers}
            subject={selectedSubject}
            userName={userName}
          />
          <Link
            to="/report"
            className="block mt-6 text-center text-blue-500 underline hover:text-blue-700"
          >
            View Your Report Card
          </Link>
        </div>
      )}
    </div>
  );
}

export default Quizpage;
