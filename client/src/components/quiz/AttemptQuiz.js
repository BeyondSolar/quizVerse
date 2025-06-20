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
      <div className="text-white text-center mt-10">
        <h2 className="text-2xl font-bold">🎉 Submission Successful!</h2>
        <p className="mt-4 text-lg">
          You scored <strong>{result.score}</strong> out of <strong>{result.total}</strong>
        </p>
        <button
          onClick={() => navigate(`/dashboard/leaderboard/${quiz.quizCode}`)}
          className="mt-6 bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded text-white"
        >
          View Leaderboard
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="text-white max-w-2xl mx-auto mt-10 space-y-6">
      <QuizTimer timeLeft={timeLeft} />
      <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>

      <QuizQuestion
        question={currentQuestion}
        selected={answers[currentIndex]}
        onSelect={handleSelectOption}
      />

      <button
        onClick={handleSubmitAnswer}
        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white mt-4"
      >
        Submit Answer
      </button>
    </div>
  );
};

export default AttemptQuiz;
