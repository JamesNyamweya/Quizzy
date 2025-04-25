import React, { useEffect, useState } from "react";

const ReportCard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/scores")
      .then((res) => res.json())
      .then((data) => setScores(data))
      .catch((err) => console.error("Error fetching scores:", err));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Report Card</h2>
      {scores.length === 0 ? (
        <p className="text-center text-gray-500">No scores available.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Score</th>
              <th className="border px-4 py-2">Percentage</th>
              <th className="border px-4 py-2">Total Questions</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{entry.user}</td>
                <td className="border px-4 py-2">{entry.subject}</td>
                <td className="border px-4 py-2">{entry.score}</td>
                <td className="border px-4 py-2">
                  {entry.percentage !== null ? `${entry.percentage}%` : "N/A"}
                </td>
                <td className="border px-4 py-2">{entry.totalQuestions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportCard;
