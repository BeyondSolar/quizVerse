import React, { useState } from 'react';
import {addQuestion} from '../../utils/quizService';

const QuestionForm = ({ quiz, numberOfQuestions }) => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addQuestion({
        quiz: quiz._id,
        questionText,
        options,
        correctAnswer
      });

      setSubmittedQuestions([
        ...submittedQuestions,
        { questionText, options, correctAnswer }
      ]);

      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectAnswer(0);
      setCurrentIndex(currentIndex + 1);
    } catch (err) {
      alert('Failed to add question: ' + err.message);
    }
  };

  if (currentIndex >= numberOfQuestions) {
    return (
      <div className="text-center mt-10 bg-white bg-opacity-90 p-8 rounded-xl shadow-xl max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-green-600">🎉 Quiz Created Successfully!</h2>
        <p className="mt-4 text-lg text-gray-800">
          Your Quiz Code:{' '}
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded font-mono">
            {quiz.quizCode}
          </span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 text-black p-6 rounded shadow-xl max-w-xl mx-auto mt-10 space-y-3 font-sans">
      <h2 className="text-xl font-bold mb-4">Add Question {currentIndex + 1}</h2>

      <label className="block mb-2 font-semibold">Question</label>
      <textarea
        className="w-full p-2 mb-3 border rounded"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        required
      />

      {options.map((opt, idx) => (
        <input
          key={idx}
          type="text"
          placeholder={`Option ${idx + 1}`}
          className="w-full p-2 mb-2 border rounded"
          value={opt}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[idx] = e.target.value;
            setOptions(newOptions);
          }}
          required
        />
      ))}

      <label className="block mb-2 font-semibold">Correct Answer</label>
      <select
        className="w-full p-2 mb-4 border rounded"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
      >
        {options.map((_, idx) => (
          <option key={idx} value={idx}>
            Option {idx + 1}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
      >
        Add Question
      </button>
    </form>
  );
};

export default QuestionForm;
