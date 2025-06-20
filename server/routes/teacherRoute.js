const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const authRole = require('../middleware/authRole');
const {createQuiz, addQuestion} = require('../controller/quizController')

router.post('/createQuiz', verifyToken, authRole, createQuiz);
router.post('/addQuestion', verifyToken, authRole, addQuestion);

module.exports = router;