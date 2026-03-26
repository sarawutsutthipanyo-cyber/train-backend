const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/exercise.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);

module.exports = router;
