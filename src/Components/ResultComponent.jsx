/*import React, { useEffect, useState } from "react";

const ResultComponent = ({
  userAnswers,
  correctAnswers,
  subject,
  username,
}) => {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const calculateScore = () => {
    let tempScore = 0;

    correctAnswers.forEach((answer, index) => {
      if (userAnswers[index] === answer) {
        tempScore++;
      }
    });

    setScore(tempScore);
    setTotalQuestions(correctAnswers.length);
  };

  const postScore = () => {
    fetch("http://localhost:3000/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, subject, score }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to post score");
        }
        console.log("Score posted successfully");
      })
      .catch((error) => {
        console.error("Error posting score:", error);
      });
  };

  useEffect(() => {
    calculateScore();
    postScore();
  }, [userAnswers, correctAnswers]);

  return (
    <div>
      <h2>Results for {subject}</h2>
      <p>
        Your Score: {score} / {totalQuestions}
      </p>
      <p>
        {score > totalQuestions / 2
          ? "Great job!"
          : "Don't give up, keep practicing!"}
      </p>
    </div>
  );
};

export default ResultComponent;*/


import React, { useEffect, useState } from 'react'

function ResultComponent({ userAnswers, subject, userName }) {
  const [score, setScore] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [totalMark , setTotalMark]= useState([])
  
  useEffect(() => {
    fetch(`http://localhost:3000/questions/${selectedSubject}`)
      .then((res) => res.json())
      .then((data) => setquestions(data));
  }, [selectedSubject]);

  const handleCorrectAnswers = (() => {
    
  })
  return (<div></div>);
}

export default ResultComponent

