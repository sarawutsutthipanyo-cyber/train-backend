const { FoodItem } = require('../models');
const { Op } = require('sequelize');

exports.search = async (req, res) => {
  try {
    const { q, category } = req.query;
    const where = {};
    if (q) where[Op.or] = [
      { name: { [Op.iLike]: `%${q}%` } },
      { nameTh: { [Op.iLike]: `%${q}%` } },
    ];
    if (category) where.category = category;
    const items = await FoodItem.findAll({ where, limit: 30, order: [['name', 'ASC']] });
    res.json(items);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const item = await FoodItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Food not found' });
    res.json(item);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const item = await FoodItem.create({ ...req.body, isCustom: true, createdBy: req.user.id });
    res.status(201).json(item);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
