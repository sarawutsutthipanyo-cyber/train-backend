const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProgramDay = sequelize.define(
  'ProgramDay',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    programId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'programs', key: 'id' },
    },
    dayOfWeek: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('workout', 'rest', 'cardio'),
      defaultValue: 'workout',
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    exercises: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    cardioType: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    cardioMinutes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: 'program_days',
    timestamps: true,
  }
);

module.exports = ProgramDay;
