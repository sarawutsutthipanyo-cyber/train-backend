const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/mealEntry.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);
router.get('/client/:clientId/date/:date', ctrl.getDayEntries);
router.get('/client/:clientId/date/:date/summary', ctrl.getDaySummary);
router.post('/client/:clientId', ctrl.addEntry);
router.delete('/:entryId', ctrl.deleteEntry);

module.exports = router;
