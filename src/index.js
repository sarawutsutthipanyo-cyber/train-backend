require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');

// Import models (registers associations)
require('./models');

const authRoutes = require('./routes/auth.routes');
const trainerRoutes = require('./routes/trainer.routes');
const courseRoutes = require('./routes/course.routes');
const bookingRoutes = require('./routes/booking.routes');
const clientRoutes = require('./routes/client.routes');
const exerciseRoutes = require('./routes/exercise.routes');
const programRoutes = require('./routes/program.routes');
const workoutLogRoutes = require('./routes/workoutLog.routes');
const mealPlanRoutes = require('./routes/mealPlan.routes');
const foodItemRoutes = require('./routes/foodItem.routes');
const mealEntryRoutes = require('./routes/mealEntry.routes');
const progressLogRoutes = require('./routes/progressLog.routes');
const cardioLogRoutes = require('./routes/cardioLog.routes');

const { startCleanupJob } = require('./utils/cleanupPhotos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://trainner-frontend.vercel.app',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/bookings', bookingRoutes);

app.use('/api/clients', clientRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/workout-logs', workoutLogRoutes);
app.use('/api/meal-plans', mealPlanRoutes);
app.use('/api/food-items', foodItemRoutes);
app.use('/api/meal-entries', mealEntryRoutes);
app.use('/api/progress-logs', progressLogRoutes);
app.use('/api/cardio-logs', cardioLogRoutes);
app.use('/api/food-photos', require('./routes/foodPhoto.routes'));

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'ok', db: 'connected', message: 'Trainer Platform API is running' });
  } catch {
    res.status(500).json({ status: 'error', db: 'disconnected' });
  }
});

// Connect to PostgreSQL and sync tables
sequelize
  .sync({ alter: true }) // alter=true อัปเดต schema โดยไม่ลบข้อมูล
  .then(async () => {
    console.log('PostgreSQL connected & tables synced');

    // Ensure trainer account exists
    const { User } = require('./models');
    const existing = await User.findOne({ where: { name: 'trainmic' } });
    if (!existing) {
      await User.create({ name: 'trainmic', email: 'trainmic@trainer.local', password: '1234', role: 'trainer' });
      console.log('Trainer account created: trainmic / 1234');
    }

    startCleanupJob();

    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Change PORT in .env`);
      } else {
        console.error('Server error:', err);
      }
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });
