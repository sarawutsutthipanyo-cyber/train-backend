const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkoutLog = sequelize.define(
  'WorkoutLog',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'clients', key: 'id' },
    },
    programDayId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: 'program_days', key: 'id' },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    exercises: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    notes: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'workout_logs',
    timestamps: true,
  }
);

module.exports = WorkoutLog;
