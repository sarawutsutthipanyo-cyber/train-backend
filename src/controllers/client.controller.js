const { calcBMR, calcTDEE, calcTargetCalories, calcMacros } = require('../utils/tdee');
const { Client, User, Program, ProgressLog, MealEntry, CardioLog } = require('../models');
const { Op } = require('sequelize');

exports.getMyClients = async (req, res) => {
  try {
    const clients = await Client.findAll({
      where: { trainerId: req.user.id, isActive: true },
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'avatar'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(clients);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findOne({
      where: { id: req.params.id },
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'avatar'] }],
    });
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createClient = async (req, res) => {
  try {
    const { name, pin, goal, currentWeight, targetWeight, height, age, gender, activityLevel, notes } = req.body;

    // Auto-generate unique email
    const autoEmail = `client_${Date.now()}@trainer.local`;
    const clientUser = await User.create({ name, email: autoEmail, password: pin || '1234', role: 'user' });

    // Calculate TDEE
    const bmr = calcBMR(currentWeight, height, age, gender);
    const tdee = calcTDEE(bmr, activityLevel);
    const targetCalories = calcTargetCalories(tdee, goal);
    const macros = calcMacros(targetCalories, currentWeight);

    const client = await Client.create({
      trainerId: req.user.id,
      userId: clientUser.id,
      goal, currentWeight, targetWeight, height, age, gender, activityLevel, notes,
      bmr, tdee, targetCalories,
      targetProtein: macros.protein,
      targetCarbs: macros.carbs,
      targetFat: macros.fat,
    });

    res.status(201).json({ ...client.toJSON(), user: clientUser });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    const updates = req.body;
    // Recalculate if body stats change
    if (updates.currentWeight || updates.height || updates.age || updates.gender || updates.activityLevel || updates.goal) {
      const w = updates.currentWeight || client.currentWeight;
      const h = updates.height || client.height;
      const a = updates.age || client.age;
      const g = updates.gender || client.gender;
      const al = updates.activityLevel || client.activityLevel;
      const goal = updates.goal || client.goal;
      const bmr = calcBMR(w, h, a, g);
      const tdee = calcTDEE(bmr, al);
      const targetCalories = calcTargetCalories(tdee, goal);
      const macros = calcMacros(targetCalories, w);
      Object.assign(updates, { bmr, tdee, targetCalories, targetProtein: macros.protein, targetCarbs: macros.carbs, targetFat: macros.fat });
    }

    await client.update(updates);
    res.json(client);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getMyProfile = async (req, res) => {
  try {
    const client = await Client.findOne({
      where: { userId: req.user.id },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email', 'avatar'] },
        { model: User, as: 'trainer', attributes: ['id', 'name', 'email', 'avatar'] },
      ],
    });
    if (!client) return res.status(404).json({ message: 'Client profile not found' });
    res.json(client);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getClientStats = async (req, res) => {
  try {
    const { clientId } = req.params;
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const [latestProgress, weekMeals, weekCardio] = await Promise.all([
      ProgressLog.findOne({ where: { clientId }, order: [['date', 'DESC']] }),
      MealEntry.findAll({ where: { clientId, date: { [Op.gte]: weekAgo } } }),
      CardioLog.findAll({ where: { clientId, date: { [Op.gte]: weekAgo } } }),
    ]);

    const totalCaloriesWeek = weekMeals.reduce((sum, m) => sum + m.calories, 0);
    const totalCardioWeek = weekCardio.reduce((sum, c) => sum + c.duration, 0);

    res.json({ latestProgress, totalCaloriesWeek, totalCardioMinutesWeek: totalCardioWeek, weekMealCount: weekMeals.length });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
