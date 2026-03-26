const User = require('./user.model');
const Trainer = require('./trainer.model');
const Course = require('./course.model');
const Booking = require('./booking.model');
const Client = require('./client.model');
const Exercise = require('./exercise.model');
const Program = require('./program.model');
const ProgramDay = require('./programDay.model');
const WorkoutLog = require('./workoutLog.model');
const MealPlan = require('./mealPlan.model');
const FoodItem = require('./foodItem.model');
const MealEntry = require('./mealEntry.model');
const ProgressLog = require('./progressLog.model');
const CardioLog = require('./cardioLog.model');
const FoodPhoto = require('./foodPhoto.model');

// Existing associations
User.hasOne(Trainer, { foreignKey: 'userId', as: 'trainerProfile' });
Trainer.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Trainer.hasMany(Course, { foreignKey: 'trainerId', as: 'courses' });
Course.belongsTo(Trainer, { foreignKey: 'trainerId', as: 'trainer' });
User.hasMany(Booking, { foreignKey: 'userId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Trainer.hasMany(Booking, { foreignKey: 'trainerId', as: 'bookings' });
Booking.belongsTo(Trainer, { foreignKey: 'trainerId', as: 'trainer' });
Course.hasMany(Booking, { foreignKey: 'courseId', as: 'bookings' });
Booking.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

// Client associations
User.hasMany(Client, { foreignKey: 'trainerId', as: 'myClients' }); // trainer's clients
User.hasOne(Client, { foreignKey: 'userId', as: 'clientProfile' }); // client's profile
Client.belongsTo(User, { foreignKey: 'trainerId', as: 'trainer' });
Client.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Program associations
Client.hasMany(Program, { foreignKey: 'clientId', as: 'programs' });
Program.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
Program.hasMany(ProgramDay, { foreignKey: 'programId', as: 'days' });
ProgramDay.belongsTo(Program, { foreignKey: 'programId', as: 'program' });

// WorkoutLog associations
Client.hasMany(WorkoutLog, { foreignKey: 'clientId', as: 'workoutLogs' });
WorkoutLog.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
ProgramDay.hasMany(WorkoutLog, { foreignKey: 'programDayId', as: 'logs' });
WorkoutLog.belongsTo(ProgramDay, { foreignKey: 'programDayId', as: 'programDay' });

// MealPlan associations
Client.hasMany(MealPlan, { foreignKey: 'clientId', as: 'mealPlans' });
MealPlan.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });

// MealEntry associations
Client.hasMany(MealEntry, { foreignKey: 'clientId', as: 'mealEntries' });
MealEntry.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
FoodItem.hasMany(MealEntry, { foreignKey: 'foodItemId', as: 'entries' });
MealEntry.belongsTo(FoodItem, { foreignKey: 'foodItemId', as: 'foodItem' });

// ProgressLog associations
Client.hasMany(ProgressLog, { foreignKey: 'clientId', as: 'progressLogs' });
ProgressLog.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });

// CardioLog associations
Client.hasMany(CardioLog, { foreignKey: 'clientId', as: 'cardioLogs' });
CardioLog.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });

// FoodPhoto associations
Client.hasMany(FoodPhoto, { foreignKey: 'clientId', as: 'foodPhotos' });
FoodPhoto.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });

module.exports = {
  User, Trainer, Course, Booking,
  Client, Exercise, Program, ProgramDay,
  WorkoutLog, MealPlan, FoodItem, MealEntry,
  ProgressLog, CardioLog, FoodPhoto,
};
