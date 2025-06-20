import React, { useState } from 'react';
import QuizForm from './CreateQuizForm';
import QuestionForm from './AddQuestionForm';

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState(null); // Holds full quiz object
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);

  return (
    <div className="max-w-2xl mx-auto text-white ">
      {!quiz ? (
        <QuizForm setQuiz={setQuiz} setNumberOfQuestions={setNumberOfQuestions} />
      ) : (
        <QuestionForm quiz={quiz} numberOfQuestions={numberOfQuestions} />
      )}
    </div>
  );
};

export default CreateQuiz;
