const QuizQuestion = ({ question, selected, onSelect }) => {
  return (
    <div>
      <p className="text-lg font-semibold mb-3">{question.questionText}</p>
      {question.options.map((opt, index) => (
        <div
          key={index}
          onClick={() => onSelect(index)}
          className={`p-2 mb-2 rounded cursor-pointer border ${
            selected === index ? 'bg-green-500 text-white' : 'bg-white text-black'
          }`}
        >
          {opt}
        </div>
      ))}
    </div>
  );
};

export default QuizQuestion;
