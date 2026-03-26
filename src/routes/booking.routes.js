const express = require('express');
const router = express.Router();
const {
  getUserBookings,
  createBooking,
  updateBookingStatus,
  cancelBooking,
} = require('../controllers/booking.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', getUserBookings);
router.post('/', createBooking);
router.put('/:id/status', updateBookingStatus);
router.put('/:id/cancel', cancelBooking);

module.exports = router;
