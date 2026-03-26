const { MealPlan } = require('../models');

exports.getClientMealPlans = async (req, res) => {
  try {
    const plans = await MealPlan.findAll({ where: { clientId: req.params.clientId }, order: [['weekStartDate', 'DESC']] });
    res.json(plans);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getActiveMealPlan = async (req, res) => {
  try {
    const plan = await MealPlan.findOne({ where: { clientId: req.params.clientId, isActive: true }, order: [['weekStartDate', 'DESC']] });
    res.json(plan);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createMealPlan = async (req, res) => {
  try {
    const { clientId } = req.params;
    await MealPlan.update({ isActive: false }, { where: { clientId } });
    const plan = await MealPlan.create({ clientId, trainerId: req.user.id, ...req.body, isActive: true });
    res.status(201).json(plan);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateMealPlan = async (req, res) => {
  try {
    const plan = await MealPlan.findByPk(req.params.planId);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    await plan.update(req.body);
    res.json(plan);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
