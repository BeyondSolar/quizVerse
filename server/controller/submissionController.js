const Question = require('../models/Question');
const Submission = require('../models/Submission');
const Quiz = require('../models/Quiz');

exports.submitQuiz = async (req, res) => {
  try {
    const { quizCode } = req.params;
    const { answers } = req.body; // [{ questionId, selectedOption }]
    const studentId = req.user.id; // from verifyToken middleware

     //Check for prior submission
    const quiz = await Quiz.findOne({ quizCode });

    if (!quiz) {
      return res.status(404).json({ message: 'Invalid quiz code' });
    }

    const quizId = quiz._id;
    console.log(quizId);

    const alreadySubmitted = await Submission.findOne({
      quiz: quizId,
      student: studentId
    });

    if (alreadySubmitted) {
      return res.status(400).json({ message: 'You have already submitted this quiz.' });
    }

    // Fetch all related questions for the quiz
    const questionIds = answers.map(ans => ans.questionId);
    const questions = await Question.find({ _id: { $in: questionIds }, quiz: quizId });

    if (!questions.length) {
      return res.status(404).json({ message: "No valid questions found for this quiz." });
    }

    // Create a map for quick access to correct answers
    const answerKey = {};
    questions.forEach(q => {
      answerKey[q._id.toString()] = q.correctAnswer;
    });

    // Calculate score
    let score = 0;
    answers.forEach(ans => {
      const correct = answerKey[ans.questionId];
      if (correct !== undefined && ans.selectedOption === correct) {
        score++;
      }
    });

    // Save submission
    const submission = new Submission({
      quiz: quizId,
      student: studentId,
      answers,
      score
    });

    await submission.save();

    res.status(201).json({
      message: "Submission successful",
      score,
      total: questions.length
    });

  } catch (err) {
    console.error("Error in submitQuiz:", err);
    res.status(500).json({ message: "Submission failed", error: err.message });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findOne({ quizCode: quizId });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const leaderboard = await Submission.find({ quiz: quiz._id })
      .populate('student', 'username email') // get name and email from User
      .sort({ score: -1, submittedAt: 1 })   // higher score first, then earliest time
      .select('student score submittedAt');

    res.status(200).json({
      message: 'Leaderboard fetched successfully',
      leaderboard
    });

  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ message: "Error fetching leaderboard", error: err.message });
  }
};

exports.getSubmissionsByStudent = async (req, res) => {
  try {
    const studentId = req.user.id; // extracted from verifyToken middleware
    const submissions = await Submission.find({ student: studentId })
      .populate('quiz') // get quiz details
      .sort({ submittedAt: -1 });

    res.json(submissions);
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(500).json({ message: 'Server error fetching submissions' });
  }
};
