const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/foodItem.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);
router.get('/', ctrl.search);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);

module.exports = router;
