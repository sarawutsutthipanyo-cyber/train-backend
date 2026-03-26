const { WorkoutLog, ProgramDay } = require('../models');
const { Op } = require('sequelize');

exports.getLogs = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { startDate, endDate } = req.query;
    const where = { clientId };
    if (startDate && endDate) where.date = { [Op.between]: [startDate, endDate] };
    const logs = await WorkoutLog.findAll({ where, order: [['date', 'DESC']], limit: 50 });
    res.json(logs);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getTodayLog = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const log = await WorkoutLog.findOne({ where: { clientId: req.params.clientId, date: today } });
    res.json(log);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createOrUpdateLog = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { date, exercises, notes, programDayId } = req.body;

    let log = await WorkoutLog.findOne({ where: { clientId, date } });
    if (log) {
      await log.update({ exercises, notes, programDayId });
    } else {
      log = await WorkoutLog.create({ clientId, date, exercises, notes, programDayId });
    }
    res.json(log);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.completeWorkout = async (req, res) => {
  try {
    const log = await WorkoutLog.findByPk(req.params.logId);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    await log.update({ isCompleted: true, completedAt: new Date() });
    res.json(log);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
