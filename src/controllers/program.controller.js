const { Program, ProgramDay, Client } = require('../models');

exports.getClientPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll({
      where: { clientId: req.params.clientId },
      include: [{ model: ProgramDay, as: 'days', order: [['dayOfWeek', 'ASC']] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(programs);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getActiveProgram = async (req, res) => {
  try {
    const program = await Program.findOne({
      where: { clientId: req.params.clientId, isActive: true },
      include: [{ model: ProgramDay, as: 'days', order: [['dayOfWeek', 'ASC']] }],
    });
    res.json(program);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createProgram = async (req, res) => {
  try {
    const { clientId, name, description, durationWeeks, startDate, days } = req.body;

    // Deactivate existing programs
    await Program.update({ isActive: false }, { where: { clientId } });

    const program = await Program.create({
      clientId, trainerId: req.user.id, name, description, durationWeeks, startDate, isActive: true,
    });

    if (days && days.length > 0) {
      const dayRecords = days.map(d => ({ ...d, programId: program.id }));
      await ProgramDay.bulkCreate(dayRecords);
    }

    const full = await Program.findByPk(program.id, {
      include: [{ model: ProgramDay, as: 'days', order: [['dayOfWeek', 'ASC']] }],
    });
    res.status(201).json(full);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateProgramDay = async (req, res) => {
  try {
    const day = await ProgramDay.findByPk(req.params.dayId);
    if (!day) return res.status(404).json({ message: 'Day not found' });
    await day.update(req.body);
    res.json(day);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteProgram = async (req, res) => {
  try {
    await Program.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Program deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
