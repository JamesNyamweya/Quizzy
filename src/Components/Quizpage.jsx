import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ResultsPage from "./ResultsPage";

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
    <div>
      <h1>Quiz: {selectedSubject}</h1>
      {!showResults &&
        questions.map((question, index) => (
          <div key={question.id}>
            <p>
              {index + 1}. {question.text}
            </p>
            {question.options.map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  onChange={() => handleAnswerChange(index, option)}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        ))}
      {!showResults && <button onClick={handleSubmit}>Submit Quiz</button>}
      {showResults && (
        <div>
          <ResultsPage
            userAnswers={userAnswers}
            subject={selectedSubject}
            userName={userName}
          />
          {/* Link to navigate to Report Card */}
          <Link
            to="/report"
            className="block mt-4 text-blue-500 underline hover:text-blue-700"
          >
            View Your Report Card
          </Link>
        </div>
      )}
    </div>
  );
}

export default Quizpage;
