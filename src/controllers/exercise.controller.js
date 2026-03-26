const { Exercise } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.muscleGroup) where.muscleGroup = req.query.muscleGroup;
    if (req.query.search) where.name = { [Op.iLike]: `%${req.query.search}%` };
    const exercises = await Exercise.findAll({ where, order: [['muscleGroup', 'ASC'], ['name', 'ASC']] });
    res.json(exercises);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const ex = await Exercise.findByPk(req.params.id);
    if (!ex) return res.status(404).json({ message: 'Exercise not found' });
    res.json(ex);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
