const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/progressLog.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);
router.get('/client/:clientId', ctrl.getLogs);
router.post('/client/:clientId', ctrl.addLog);
router.put('/:logId', ctrl.updateLog);
router.delete('/:logId', ctrl.deleteLog);

module.exports = router;
