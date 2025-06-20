const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  quiz: {type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true},
  student: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
      },
      selectedOption: {
        type: Number,
        required: true
      }
    }
  ],
  score: Number,
  submittedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Submission', submissionSchema);
