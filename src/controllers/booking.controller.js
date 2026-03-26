const { Booking, Trainer, Course, User } = require('../models');

const bookingIncludes = [
  { model: Trainer, as: 'trainer', include: [{ model: User, as: 'user', attributes: ['id', 'name'] }] },
  { model: Course, as: 'course', attributes: ['id', 'title', 'category'] },
];

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: bookingIncludes,
      order: [['scheduledAt', 'DESC']],
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({ userId: req.user.id, ...req.body });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    await booking.update({ status: req.body.status });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    await booking.update({ status: 'cancelled' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
