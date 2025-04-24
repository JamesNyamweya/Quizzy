import React, { useState, useEffect } from "react";
import ResultComponent from "./ResultComponent";


function Quizpage({ selectedSubject, userName}) {
  const [questions, setquestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [results, setResults] = useState(false);
    // const selectedSubject = "Math";
    // const userName= "Arif"
const handleSubmit = () => {
  console.log(userAnswers);
  setResults(true);
  console.log("Results state:", results); 
};

  const handleAnswerChange = (index, answer) => {
      const updatedAnswers = [...userAnswers];
      console.log(updatedAnswers)
    updatedAnswers[index] = answer;
      setUserAnswers(updatedAnswers);
        console.log(userAnswers);
  };
useEffect(() => {
  fetch(`http://localhost:3000/questions`) // Fetch all questions
    .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setquestions(data[selectedSubject]); // Set only the selected subject's questions
    });
}, [selectedSubject]);

  return (
    <div>
      <h1>Quiz: {selectedSubject}</h1>
      {questions.map((question, index) => (
        <div key={question.id}>
          <p>
            {index + 1}.{question.text}
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
      <button onClick={handleSubmit}>Submit Quiz</button>{" "}
      {results && (
        <ResultComponent
          userAnswers={userAnswers}
          subject={selectedSubject}
          userName={userName}
        />
      )}
    </div>
  );
}

export default Quizpage;
