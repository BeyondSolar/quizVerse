import React, { useState, useEffect } from 'react';
import API from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import QuizTimer from './QuizTimer';
import QuizQuestion from './QuizQuestion';
import { useQuiz } from '../../context/QuizContext';

const AttemptQuiz = ({ quiz, questions }) => {
  const { user } = useAuth();
  const { setLastQuiz } = useQuiz();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  // ✅ Save quiz info in context when component mounts
  useEffect(() => {
    setLastQuiz({ quiz, questions, answers, result: null });
  }, [quiz, questions, setLastQuiz]);

  // ⏱ Reset timer when question changes
  useEffect(() => {
    setTimeLeft(quiz.timeLimit);
  }, [currentIndex]);

  // ⏱ Countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitAnswer(); // auto-advance if time is up
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSelectOption = (optionIndex) => {
    const updated = [...answers];
    updated[currentIndex] = optionIndex;
    setAnswers(updated);
  };

  const handleSubmitAnswer = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      handleFinalSubmit(); // last question
    }
  };

  const handleFinalSubmit = async () => {
    const payload = {
      answers: questions.map((q, i) => ({
        questionId: q._id,
        selectedOption: answers[i] === null ? -1 : answers[i],
      })),
    };

    try {
      const res = await API.post(`/quiz/${quiz.quizCode}/submit`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const quizState = {
        quiz,
        questions,
        answers,
        result: res.data,
      };

      // ✅ Store complete state in context and localStorage
      localStorage.setItem('lastQuizCode', quiz.quizCode);
      setLastQuiz(quizState);
      setSubmitted(true);
      setResult(res.data);
    } catch (err) {
      alert('Submission failed: ' + (err.response?.data?.message || err.message));
    }
  };

  if (submitted && result) {
  return (
    <div className="text-white text-center mt-20 font-sans space-y-6">
      <h2 className="text-4xl font-bold text-green-400 animate-bounce">🎉 Quiz Submitted!</h2>
      <p className="text-lg">
        You scored <span className="font-bold text-yellow-300">{result.score}</span> out of{' '}
        <span className="font-bold">{result.total}</span>
      </p>
      <button
        onClick={() => navigate(`/dashboard/leaderboard/${quiz.quizCode}`)}
        className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 px-6 py-3 text-white font-semibold rounded-xl shadow transition-all duration-300 hover:scale-105"
      >
        View Leaderboard
      </button>
    </div>
  );
}


  const currentQuestion = questions[currentIndex];

  return (
  <div className="text-white max-w-2xl mx-auto mt-12 p-6 bg-white bg-opacity-10 rounded-2xl shadow-lg font-sans space-y-6">
    <QuizTimer timeLeft={timeLeft} />

    <h2 className="text-3xl font-bold text-center mb-4 text-yellow-300">{quiz.title}</h2>

    <QuizQuestion
      question={currentQuestion}
      selected={answers[currentIndex]}
      onSelect={handleSelectOption}
    />

    <div className="text-center">
      <button
        onClick={handleSubmitAnswer}
        className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-105"
      >
        {currentIndex === questions.length - 1 ? 'Submit Quiz' : 'Submit Answer'}
      </button>
    </div>
  </div>
);
};

export default AttemptQuiz;
