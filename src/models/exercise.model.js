const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Exercise = sequelize.define(
  'Exercise',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    muscleGroup: {
      type: DataTypes.ENUM('chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'cardio', 'full_body'),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('compound', 'isolation', 'cardio', 'bodyweight'),
      defaultValue: 'compound',
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    instructions: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
  },
  {
    tableName: 'exercises',
    timestamps: true,
  }
);

module.exports = Exercise;
