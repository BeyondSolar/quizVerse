import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { getLeaderboard } from '../utils/quizService';

const Leaderboard = () => {
  const { quizCode } = useParams();
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
    return <div className="text-white text-center mt-10 text-xl font-medium">⏳ Loading leaderboard...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 text-white font-sans px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-yellow-300">🏆 Leaderboard</h2>

      {leaderboard.length === 0 ? (
        <div className="text-center text-lg mt-10 text-white/80">No submissions found for this quiz.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="table-fixed w-full border-collapse rounded overflow-hidden">
            <thead>
              <tr className="bg-purple-700 text-white">
                <th className="w-1/12 p-4 text-center">#</th>
                <th className="w-2/12 p-4 text-center">Username</th>
                <th className="w-3/12 p-4 text-center">Email</th>
                <th className="w-2/12 p-4 text-center">Score</th>
                <th className="w-4/12 p-4 text-center">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr
                  key={entry._id}
                  className="bg-white/10 border-b border-purple-600 hover:bg-white/20 transition"
                >
                  <td className="p-4 text-center font-medium">{index + 1}</td>
                  <td className="p-4 text-center">{entry.student.username}</td>
                  <td className="p-4 text-center">{entry.student.email}</td>
                  <td className="p-4 text-center font-bold text-green-300">{entry.score}</td>
                  <td className="p-4 text-center">{new Date(entry.submittedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
