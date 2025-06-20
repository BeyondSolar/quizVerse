const Quiz = require("../models/Quiz");
const Questions = require("../models/Question");
const Submission = require("../models/Submission")

function generateQuizCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit string
}

exports.createQuiz = async(req, res, next)=>{
    const {title, description, timeLimit} = req.body;
    try{
        let quizCode;
        let existing;

        // ensure quizCode is unique
        do {
        quizCode = generateQuizCode();
        existing = await Quiz.findOne({ quizCode });
        } while (existing);

        const quiz = await Quiz.create({title, description, timeLimit, createdBy: req.user.id, quizCode});
        res.status(201).json(quiz);
        next();
    }
    catch(err){
        res.status(500).json({message: 'Failed to create quiz', error:err});
    }
};

exports.addQuestion = async(req, res)=>{
    const {questionText, options, correctAnswer} = req.body;
    try{
        const quiz = await Quiz.findOne({ createdBy: req.user.id }).sort({ createdAt: -1 });
        if (!quiz) return res.status(404).json({ message: 'No quiz found for this user.' });

        const question = await Questions.create({quiz: quiz._id, questionText, options, correctAnswer});
        res.status(201).json(question);
    }
    catch(err){
        res.status(500).json({message: 'Failed to create question', error:err});
    }
}

exports.getQuiz = async (req, res) => {
  try {
    const quizCode = req.params.quizCode;

    const quiz = await Quiz.findOne({ quizCode });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Fetch all questions for the quiz, include only questionText and options
    const questions = await Questions.find({ quiz: quiz._id }).select('questionText options');

    // Send quiz metadata and questions (without correct answers)
    res.status(200).json({
      quiz: {
        title: quiz.title,
        description: quiz.description,
        timeLimit: quiz.timeLimit,
        quizCode: quiz.quizCode
      },
      questions
    });
  } catch (err) {
    console.error('Error fetching quiz:', err);
    res.status(500).json({ message: 'Server error while fetching quiz' });
  }
};

exports.getQuizzesByTeacher = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const quizzes = await Quiz.find({ createdBy: teacherId }).sort({ createdAt: -1 });

    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Server error while fetching quizzes.' });
  }
};

exports.deleteByCode = async (req, res) => {
  try {
    const { quizId } = req.params;

    // 1. Find the quiz
    const quiz = await Quiz.findOne({quizCode: quizId });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found with given code' });
    }


    await Questions.deleteMany({ quiz: quiz._id });
    await Submission.deleteMany({ quiz: quiz._id });
    await Quiz.findByIdAndDelete(quiz._id);


    res.json({ message: 'Quiz, questions, and submissions deleted successfully' });
  } catch (err) {
    console.error('Error deleting quiz:', err);
    res.status(500).json({ message: 'Failed to delete quiz', error: err.message });
  }
};

