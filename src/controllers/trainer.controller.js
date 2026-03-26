const { Trainer, User } = require('../models');

exports.getAllTrainers = async (req, res) => {
  try {
    const where = {};
    if (req.query.specialty) {
      // PostgreSQL array contains
      const { Op } = require('sequelize');
      where.specialties = { [Op.contains]: [req.query.specialty] };
    }
    if (req.query.minRating) {
      const { Op } = require('sequelize');
      where.rating = { [Op.gte]: Number(req.query.minRating) };
    }

    const trainers = await Trainer.findAll({
      where,
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'avatar'] }],
    });
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findByPk(req.params.id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'avatar'] }],
    });
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
    res.json(trainer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTrainerProfile = async (req, res) => {
  try {
    const existing = await Trainer.findOne({ where: { userId: req.user.id } });
    if (existing) return res.status(400).json({ message: 'Trainer profile already exists' });

    const trainer = await Trainer.create({ userId: req.user.id, ...req.body });
    res.status(201).json(trainer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTrainerProfile = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ where: { userId: req.user.id } });
    if (!trainer) return res.status(404).json({ message: 'Trainer profile not found' });

    await trainer.update(req.body);
    res.json(trainer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
