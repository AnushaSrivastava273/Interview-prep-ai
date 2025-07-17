const express = require('express');
const {
  togglePinQuestion,
  updateQuestionNote,
  addQuestionsToSession
} = require('../controllers/questionController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Question Routes
router.post('/add', protect, addQuestionsToSession);         // Add questions to a session
router.post('/:id/pin', protect, togglePinQuestion);         // Toggle pin on a question
router.post('/:id/note', protect, updateQuestionNote);       // Add or update note on a question

module.exports = router;
