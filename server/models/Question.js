const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  questionText: { type: String, required: true },
  options: [String], // ['A', 'B', 'C', 'D']
  correctAnswer: { type: Number, required: true }, // index of correct option (0-3)
});

module.exports = mongoose.model('Question', questionSchema);
