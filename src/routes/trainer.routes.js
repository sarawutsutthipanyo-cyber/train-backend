const express = require('express');
const router = express.Router();
const {
  getAllTrainers,
  getTrainerById,
  createTrainerProfile,
  updateTrainerProfile,
} = require('../controllers/trainer.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', getAllTrainers);
router.get('/:id', getTrainerById);
router.post('/', authMiddleware, createTrainerProfile);
router.put('/me', authMiddleware, updateTrainerProfile);

module.exports = router;
