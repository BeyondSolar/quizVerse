import React, { useState } from 'react';
import API from '../../utils/api';
import AttemptQuiz from './AttemptQuiz';

const JoinQuizPage = () => {
  const [quizCode, setQuizCode] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchQuiz = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/quiz/getQuiz/${quizCode}`);
      setQuiz(res.data.quiz);
      setQuestions(res.data.questions);
    } catch (err) {
      alert('Quiz not found: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (quiz && questions.length > 0) {
    return <AttemptQuiz quiz={quiz} questions={questions} />;
  }

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white bg-opacity-90 text-black p-8 rounded-2xl shadow-2xl font-sans space-y-6">
      <h2 className="text-3xl font-bold text-center text-purple-700">Join a Quiz</h2>
      
      <input
        type="text"
        placeholder="Enter Quiz Code"
        className="w-full p-4 border text-center border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
        value={quizCode}
        onChange={(e) => setQuizCode(e.target.value)}
        required
      />
      
      <button
        onClick={handleFetchQuiz}
        disabled={loading || !quizCode.trim()}
        className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 shadow-md cursor-pointer ${
          loading
            ? 'bg-purple-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:scale-105'
        }`}
      >
        {loading ? 'Loading...' : 'Join Quiz'}
      </button>
    </div>
  );
};

export default JoinQuizPage;
