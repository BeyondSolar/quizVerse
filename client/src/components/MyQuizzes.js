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
  const confirm = window.confirm('Are you sure you want to delete this quiz?');
  if (!confirm) return;

  try {
    await deleteQuizById(quizCode, token); // deleting by quizCode
    setQuizzes((prev) => prev.filter((q) => q.quizCode !== quizCode)); // filter by quizCode
  } catch (err) {
    alert('Failed to delete quiz: ' + err.message);
  }
};



  if (loading) return <div className="text-white text-center mt-10">Loading quizzes...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">📚 My Quizzes</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-purple-700">
            <th className="p-2">Title</th>
            <th className="p-2">Quiz Code</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz._id} className="bg-white bg-opacity-10 border-b border-purple-600">
              <td className="p-2 font-medium">{quiz.title}</td>
              <td className="p-2">{quiz.quizCode}</td>
              <td className="p-2">{new Date(quiz.createdAt).toLocaleDateString()}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => navigate(`/dashboard/leaderboard/${quiz.quizCode}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Leaderboard
                </button>
                <button
                    onClick={() => handleDelete(quiz.quizCode)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                    Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyQuizzes;
