const QuizQuestion = ({ question, selected, onSelect }) => {
  return (
    <div className="bg-white bg-opacity-90 text-black p-6 rounded-xl shadow-md font-sans space-y-4">
      <p className="text-xl font-semibold text-purple-700">{question.questionText}</p>

      {question.options.map((opt, index) => (
        <div
          key={index}
          onClick={() => onSelect(index)}
          className={`w-full p-3 rounded border transition duration-300 cursor-pointer
            ${
              selected === index
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-white text-black border-gray-300 hover:bg-purple-100'
            }`}
        >
          {opt}
        </div>
      ))}
    </div>
  );
};

export default QuizQuestion;
