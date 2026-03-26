const { CardioLog } = require('../models');
const { Op } = require('sequelize');

exports.getLogs = async (req, res) => {
  try {
    const { clientId } = req.params;
    const where = { clientId };
    if (req.query.startDate) where.date = { [Op.gte]: req.query.startDate };
    const logs = await CardioLog.findAll({ where, order: [['date', 'DESC']], limit: 50 });
    res.json(logs);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.addLog = async (req, res) => {
  try {
    const log = await CardioLog.create({ clientId: req.params.clientId, ...req.body });
    res.status(201).json(log);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteLog = async (req, res) => {
  try {
    await CardioLog.destroy({ where: { id: req.params.logId } });
    res.json({ message: 'Log deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
