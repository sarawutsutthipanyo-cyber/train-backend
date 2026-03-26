const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/program.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);
router.get('/client/:clientId', ctrl.getClientPrograms);
router.get('/client/:clientId/active', ctrl.getActiveProgram);
router.post('/', ctrl.createProgram);
router.put('/days/:dayId', ctrl.updateProgramDay);
router.delete('/:id', ctrl.deleteProgram);

module.exports = router;
