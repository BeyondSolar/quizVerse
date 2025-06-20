import { createContext, useContext, useState } from 'react';
import { getLeaderboard } from '../utils/quizService'; // ✅ Import leaderboard utility

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [lastQuiz, setLastQuiz] = useState(null); // stores { quiz, questions, answers, result }
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

  // 🔽 Leaderboard Fetch Function
  const fetchLeaderboard = async (quizCode, token) => {
    setLoadingLeaderboard(true);
    try {
      const data = await getLeaderboard(quizCode, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLeaderboard(data.leaderboard);
      return true;
    } catch (err) {
      console.error('Error fetching leaderboard:', err.response?.data || err.message);
      return false;
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        lastQuiz,
        setLastQuiz,
        leaderboard,
        loadingLeaderboard,
        fetchLeaderboard,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
