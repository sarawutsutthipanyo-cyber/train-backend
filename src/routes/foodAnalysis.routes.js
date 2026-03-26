const router = require('express').Router();
const authenticate = require('../middleware/auth.middleware');
const { analyzeFood } = require('../controllers/foodAnalysis.controller');

router.post('/analyze', authenticate, analyzeFood);

module.exports = router;
