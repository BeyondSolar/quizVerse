const QuizTimer = ({ timeLeft }) => {
  return (
    <div className="text-right text-lg font-semibold">
      Time Left: {timeLeft} seconds
    </div>
  );
};

export default QuizTimer;
