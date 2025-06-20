const express = require('express');
const router = express.Router();
const {getQuiz, getQuizzesByTeacher, deleteByCode} = require('../controller/quizController')
const { submitQuiz, getLeaderboard, getSubmissionsByStudent } = require('../controller/submissionController');
const verifyToken = require('../middleware/verifyToken');
const authRole = require('../middleware/authRole')

router.get('/getQuiz/:quizCode', verifyToken, getQuiz);
router.post('/:quizCode/submit', verifyToken, submitQuiz);
router.get('/:quizId/leaderboard', verifyToken, getLeaderboard);
router.get('/created-by/:teacherId', verifyToken, getQuizzesByTeacher);
router.get('/my-submissions', verifyToken, getSubmissionsByStudent);

router.delete('/:quizId', verifyToken, authRole, deleteByCode);


module.exports = router;
