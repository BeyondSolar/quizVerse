import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {createQuiz} from '../../utils/quizService';

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
        createdBy: user.id
      };

      const createdQuiz = await createQuiz(quizData);
      setQuiz(createdQuiz);
      setNumberOfQuestions(numQuestions);
    } catch (err) {
      alert('Failed to create quiz: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white text-black p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Quiz</h2>

      <label className="block mb-2 font-semibold">Title</label>
      <input
        type="text"
        className="w-full p-2 mb-3 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label className="block mb-2 font-semibold">Description</label>
      <textarea
        className="w-full p-2 mb-3 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className="block mb-2 font-semibold">Time Limit (seconds)</label>
      <input
        type="number"
        className="w-full p-2 mb-3 border rounded"
        value={timeLimit}
        onChange={(e) => setTimeLimit(parseInt(e.target.value))}
        required
      />

      <label className="block mb-2 font-semibold">Number of Questions</label>
      <input
        type="number"
        className="w-full p-2 mb-4 border rounded"
        value={numQuestions}
        onChange={(e) => setNumQuestions(parseInt(e.target.value))}
        required
      />

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
      >
        Submit Quiz Info
      </button>
    </form>
  );
};

export default QuizForm;
