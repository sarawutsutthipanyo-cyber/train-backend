const { Course, Trainer, User } = require('../models');

const trainerInclude = {
  model: Trainer,
  as: 'trainer',
  include: [{ model: User, as: 'user', attributes: ['id', 'name', 'avatar'] }],
};

exports.getAllCourses = async (req, res) => {
  try {
    const where = { isActive: true };
    if (req.query.category) where.category = req.query.category;

    const courses = await Course.findAll({ where, include: [trainerInclude] });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, { include: [trainerInclude] });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ where: { userId: req.user.id } });
    if (!trainer) return res.status(403).json({ message: 'You must be a trainer to create courses' });

    const course = await Course.create({ trainerId: trainer.id, ...req.body });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ where: { userId: req.user.id } });
    if (!trainer) return res.status(403).json({ message: 'Forbidden' });

    const course = await Course.findOne({ where: { id: req.params.id, trainerId: trainer.id } });
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await course.update(req.body);
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ where: { userId: req.user.id } });
    if (!trainer) return res.status(403).json({ message: 'Forbidden' });

    const deleted = await Course.destroy({ where: { id: req.params.id, trainerId: trainer.id } });
    if (!deleted) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
