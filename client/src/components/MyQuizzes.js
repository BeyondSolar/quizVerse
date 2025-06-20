import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getQuizzesByTeacher, deleteQuizById } from '../utils/quizService';

const MyQuizzes = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!user) return;
      try {
        const data = await getQuizzesByTeacher(user.id, token);
        setQuizzes(data);
      } catch (err) {
        alert('Failed to fetch quizzes: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [user, token]);

  const handleDelete = async (quizCode) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this quiz?');
    if (!confirmDelete) return;

    try {
      await deleteQuizById(quizCode, token);
      setQuizzes((prev) => prev.filter((q) => q.quizCode !== quizCode));
    } catch (err) {
      alert('Failed to delete quiz: ' + err.message);
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-16 text-xl font-medium">⏳ Loading quizzes...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 text-white font-sans px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-yellow-300">📚 My Quizzes</h2>

      {quizzes.length === 0 ? (
        <div className="text-center text-lg mt-10 text-white/80">You haven’t created any quizzes yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="table-fixed w-full border-collapse rounded overflow-hidden">
            <thead>
              <tr className="bg-purple-700 text-white">
                <th className="w-1/4 p-4 text-center">Title</th>
                <th className="w-1/4 p-4 text-center">Quiz Code</th>
                <th className="w-1/4 p-4 text-center">Created At</th>
                <th className="w-1/4 p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr
                  key={quiz._id}
                  className="bg-white/10 border-b border-purple-600 hover:bg-white/20 transition"
                >
                  <td className="p-4 text-center font-medium">{quiz.title}</td>
                  <td className="p-4 text-center font-mono text-yellow-200">{quiz.quizCode}</td>
                  <td className="p-4 text-center">{new Date(quiz.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => navigate(`/dashboard/leaderboard/${quiz.quizCode}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded text-sm"
                      >
                        Leaderboard
                      </button>
                      <button
                        onClick={() => handleDelete(quiz.quizCode)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
};

export default MyQuizzes;
