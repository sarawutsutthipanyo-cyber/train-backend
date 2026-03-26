const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/mealPlan.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);
router.get('/client/:clientId', ctrl.getClientMealPlans);
router.get('/client/:clientId/active', ctrl.getActiveMealPlan);
router.post('/client/:clientId', ctrl.createMealPlan);
router.put('/:planId', ctrl.updateMealPlan);

module.exports = router;
