const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/workoutLog.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);
router.get('/client/:clientId', ctrl.getLogs);
router.get('/client/:clientId/today', ctrl.getTodayLog);
router.post('/client/:clientId', ctrl.createOrUpdateLog);
router.put('/:logId/complete', ctrl.completeWorkout);

module.exports = router;
