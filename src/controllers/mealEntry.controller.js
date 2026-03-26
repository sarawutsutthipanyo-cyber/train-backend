const { MealEntry, FoodItem } = require('../models');
const { Op } = require('sequelize');

exports.getDayEntries = async (req, res) => {
  try {
    const { clientId, date } = req.params;
    const entries = await MealEntry.findAll({
      where: { clientId, date },
      include: [{ model: FoodItem, as: 'foodItem', attributes: ['name', 'nameTh', 'caloriesPer100g'] }],
      order: [['mealType', 'ASC']],
    });
    res.json(entries);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.addEntry = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { foodItemId, date, mealType, quantity } = req.body;

    const food = await FoodItem.findByPk(foodItemId);
    if (!food) return res.status(404).json({ message: 'Food not found' });

    const ratio = quantity / 100;
    const entry = await MealEntry.create({
      clientId, foodItemId, date, mealType, quantity,
      calories: Math.round(food.caloriesPer100g * ratio),
      protein: Math.round(food.proteinPer100g * ratio * 10) / 10,
      carbs: Math.round(food.carbsPer100g * ratio * 10) / 10,
      fat: Math.round(food.fatPer100g * ratio * 10) / 10,
    });
    res.status(201).json({ ...entry.toJSON(), foodItem: food });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteEntry = async (req, res) => {
  try {
    await MealEntry.destroy({ where: { id: req.params.entryId } });
    res.json({ message: 'Entry deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getDaySummary = async (req, res) => {
  try {
    const { clientId, date } = req.params;
    const entries = await MealEntry.findAll({ where: { clientId, date } });
    const summary = entries.reduce((acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + Number(e.protein),
      carbs: acc.carbs + Number(e.carbs),
      fat: acc.fat + Number(e.fat),
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
    res.json({ date, ...summary, entries });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
