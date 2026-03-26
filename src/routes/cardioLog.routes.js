const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cardioLog.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);
router.get('/client/:clientId', ctrl.getLogs);
router.post('/client/:clientId', ctrl.addLog);
router.delete('/:logId', ctrl.deleteLog);

module.exports = router;
