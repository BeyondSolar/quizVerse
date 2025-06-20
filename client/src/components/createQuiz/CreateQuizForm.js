import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createQuiz } from '../../utils/quizService';

const QuizForm = ({ setQuiz, setNumberOfQuestions }) => {
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(10);
  const [numQuestions, setNumQuestions] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const quizData = {
        title,
        description,
        timeLimit,
        createdBy: user.id,
      };

      const createdQuiz = await createQuiz(quizData);
      setQuiz(createdQuiz);
      setNumberOfQuestions(numQuestions);
    } catch (err) {
      alert('Failed to create quiz: ' + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-90 text-black p-8 rounded shadow-xl max-w-xl mx-auto mt-10 space-y-6 font-sans"
    >
      <h2 className="text-3xl font-bold text-center mb-2 text-purple-700">Create a New Quiz</h2>

      <div>
        <label className="block text-sm font-semibold mb-1">Title</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Time Limit (in seconds)</label>
        <input
          type="number"
          min={5}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          value={timeLimit}
          onChange={(e) => setTimeLimit(parseInt(e.target.value))}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Number of Questions</label>
        <input
          type="number"
          min={1}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          value={numQuestions}
          onChange={(e) => setNumQuestions(parseInt(e.target.value))}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 rounded-xl shadow-md transition-transform hover:scale-105"
      >
        Submit Quiz Info
      </button>
    </form>
  );
};

export default QuizForm;
