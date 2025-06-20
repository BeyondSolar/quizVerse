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

  if (loading) {
    return <div className="text-white text-center mt-10 text-xl font-medium">⏳ Loading your quizzes...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 text-white font-sans px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-yellow-300">📖 My Quiz History</h2>

      {submissions.length === 0 ? (
        <div className="text-center text-lg mt-10 text-white/80">
          You haven’t attempted any quizzes yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="table-fixed w-full border-collapse rounded overflow-hidden">
            <thead>
              <tr className="bg-purple-700 text-white">
                <th className="w-2/5 p-4 text-center">Title</th>
                <th className="w-1/5 p-4 text-center">Score</th>
                <th className="w-2/5 p-4 text-center">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr
                  key={s._id}
                  className="bg-white/10 border-b border-purple-600 hover:bg-white/20 transition"
                >
                  <td className="p-4 text-center font-medium">
                    {s.quiz?.title || 'Unknown Quiz'}
                  </td>
                  <td className="p-4 text-center font-bold text-green-300">{s.score}</td>
                  <td className="p-4 text-center">{new Date(s.submittedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyStudentQuizzes;
