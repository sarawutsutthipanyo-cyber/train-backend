const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CardioLog = sequelize.define(
  'CardioLog',
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('running', 'cycling', 'swimming', 'hiit', 'walking', 'jump_rope', 'other'),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    distance: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    caloriesBurned: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    notes: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
  },
  {
    tableName: 'cardio_logs',
    timestamps: true,
  }
);

module.exports = CardioLog;
