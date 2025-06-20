const QuizTimer = ({ timeLeft }) => {
  return (
    <div className="text-right text-white text-lg font-semibold mb-4">
      <span className="bg-gradient-to-r from-red-500 to-yellow-400 px-4 py-2 rounded-xl shadow-sm">
        ⏱️ Time Left: {timeLeft} sec
      </span>
    </div>
  );
};

export default QuizTimer;
