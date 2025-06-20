import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMySubmissions } from '../utils/quizService';

const MyStudentQuizzes = () => {
  const { token } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await getMySubmissions(token);
        setSubmissions(data);
      } catch (err) {
        alert('Failed to load your quiz history: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [token]);

  if (loading) return <div className="text-white text-center mt-10">Loading your quizzes...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">📖 My Quiz History</h2>

      {submissions.length === 0 ? (
        <p className="text-center">You haven't attempted any quizzes yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-700">
              <th className="p-2">Title</th>
              <th className="p-2">Score</th>
              <th className="p-2">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s._id} className="bg-white bg-opacity-10 border-b border-purple-600">
                <td className="p-2">{s.quiz?.title || 'Unknown Quiz'}</td>
                <td className="p-2 font-bold">{s.score}</td>
                <td className="p-2">
                  {new Date(s.submittedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyStudentQuizzes;
