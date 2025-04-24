import React, { useEffect, useState } from 'react'

function ResultComponent({ userAnswers, subject , userName }) {
  const [score, setScore] = useState(0); // Number for total score
  const [correctAnswers, setCorrectAnswers] = useState([]); // Array for correct answers
  const [totalMark, setTotalMark] = useState(0); // Number for maximum score

  useEffect(() => {
    fetch(`http://localhost:3000/questions`) // Fetch all questions
      .then((res) => res.json())
      .then((data) => {
        console.log(correctAnswers);
setCorrectAnswers(data[subject].map((question) => question.correctAnswer));
      });
  }, [subject]);

useEffect(() => {
  if (correctAnswers.length > 0 && userAnswers.length > 0) {
    let calculatedScore = 0;
    correctAnswers.forEach((correctAnswer, index) => {
      if (userAnswers[index] === correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setTotalMark(correctAnswers.length); // Total possible marks based on the number of questions
  }
}, [correctAnswers, userAnswers]);
  
  const postScore = () => {
    const resultData = {
      user: userName,
      subject: subject,
      score: score,
      percentage: (score / totalMark) * 100, // Score as a percentage
      totalQuestions: totalMark,
    };

    fetch(`http://localhost:4000/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultData), // Convert resultData to JSON
    })
      .then((res) => {
        if (res.ok) {
          console.log("Score posted successfully:", resultData);
        } else {
          console.error("Failed to post score");
        }
      })
      .catch((error) => console.error("Error posting score:", error));
  };
return (
  <div>
    <h1>Results for {subject} Quiz</h1>
    <p>
      Your Score: {score} / {totalMark}
    </p>
    <p>Percentage: {(score / totalMark) * 100}%</p>
    <button onClick={postScore}>Save score</button>
  </div>
);
}

export default ResultComponent

