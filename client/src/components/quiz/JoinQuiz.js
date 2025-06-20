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
    <div className="text-white max-w-md mx-auto mt-20">
      <h2 className="text-2xl mb-4 font-bold text-center">Join a Quiz</h2>
      <input
        type="text"
        placeholder="Enter Quiz Code"
        className="w-full p-3 mb-4 border rounded text-black"
        value={quizCode}
        onChange={(e) => setQuizCode(e.target.value)}
      />
      <button
        onClick={handleFetchQuiz}
        disabled={loading || !quizCode.trim()}
        className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700"
      >
        {loading ? 'Loading...' : 'Join Quiz'}
      </button>
    </div>
  );
};

export default JoinQuizPage;
