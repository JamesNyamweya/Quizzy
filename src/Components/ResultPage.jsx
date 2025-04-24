import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // import Toastify styles

function ResultsPage({ userAnswers, subject, userName }) {
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [totalMark, setTotalMark] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postedResult, setPostedResult] = useState(null); // store result from server

  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
      .then((res) => res.json())
      .then((data) => {
        if (data[subject]) {
          setCorrectAnswers(data[subject].map((q) => q.correctAnswer));
          setTotalMark(data[subject].length);
        } else {
          setError("Subject not found");
        }
      })
      .catch(() => setError("Error fetching questions"))
      .finally(() => setLoading(false));
  }, [subject]);

  useEffect(() => {
    if (correctAnswers.length && userAnswers.length) {
      let calculated = 0;
      correctAnswers.forEach((answer, i) => {
        if (userAnswers[i] === answer) calculated++;
      });
      setScore(calculated);
    }
  }, [correctAnswers, userAnswers]);

  const postScore = () => {
    const resultData = {
      user: userName,
      subject: subject,
      score: score,
      percentage: ((score / totalMark) * 100).toFixed(2),
      totalQuestions: totalMark,
    };

    fetch("http://localhost:3000/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Score saved successfully!"); // Show toast
        setPostedResult(data); // Update state with returned result
      })
      .catch(() => toast.error("Failed to save score"));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 rounded shadow">
      <h1>Results for {subject} Quiz</h1>
      <p>
        Your Score: {score} / {totalMark}
      </p>
      <p>
        Percentage: {totalMark > 0 ? ((score / totalMark) * 100).toFixed(2) : 0}
        %
      </p>
      <button
        onClick={postScore}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save score
      </button>

      {postedResult && (
        <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">
          Score saved: {postedResult.score} ({postedResult.percentage}%)
        </div>
      )}
    </div>
  );
}

export default ResultsPage;
