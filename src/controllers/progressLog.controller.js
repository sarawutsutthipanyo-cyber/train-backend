const { ProgressLog, Client } = require('../models');

exports.getLogs = async (req, res) => {
  try {
    const logs = await ProgressLog.findAll({
      where: { clientId: req.params.clientId },
      order: [['date', 'ASC']],
    });
    res.json(logs);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.addLog = async (req, res) => {
  try {
    const { clientId } = req.params;
    const log = await ProgressLog.create({ clientId, ...req.body });

    // Update client's current weight
    if (req.body.weight) {
      await Client.update({ currentWeight: req.body.weight }, { where: { id: clientId } });
    }

    res.status(201).json(log);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateLog = async (req, res) => {
  try {
    const log = await ProgressLog.findByPk(req.params.logId);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    await log.update(req.body);
    res.json(log);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteLog = async (req, res) => {
  try {
    await ProgressLog.destroy({ where: { id: req.params.logId } });
    res.json({ message: 'Log deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
