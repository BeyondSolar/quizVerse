import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { getLeaderboard } from '../utils/quizService';

const Leaderboard = () => {
  const { quizCode } = useParams(); // ✅ Get quizCode from route
  const { token } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard(quizCode, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLeaderboard(data.leaderboard);
      } catch (err) {
        alert('Error fetching leaderboard: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [quizCode, token]);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading leaderboard...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">🏆 Leaderboard</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-purple-700">
            <th className="p-2">Rank</th>
            <th className="p-2">Username</th>
            <th className="p-2">Email</th>
            <th className="p-2">Score</th>
            <th className="p-2">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry._id} className="bg-white bg-opacity-10 border-b border-purple-600">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{entry.student.username}</td>
              <td className="p-2">{entry.student.email}</td>
              <td className="p-2 font-bold">{entry.score}</td>
              <td className="p-2">
                {new Date(entry.submittedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
