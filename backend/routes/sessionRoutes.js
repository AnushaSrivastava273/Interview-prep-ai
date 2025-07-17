const express = require('express');
const {
  createSession,
  getSessionById,
  getMySessions,
  deleteSession,
} = require('../controllers/sessionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', protect, createSession);
router.get('/my-sessions', protect, getMySessions);
router.get('/:id', protect, getSessionById);
router.delete('/:id', protect, deleteSession);  // Fixed typo here

module.exports = router;
