const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Client = sequelize.define(
  'Client',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    trainerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    goal: {
      type: DataTypes.ENUM('lose_weight', 'gain_muscle', 'maintain'),
      defaultValue: 'lose_weight',
    },
    currentWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    targetWeight: {
      type: DataTypes.FLOAT,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false,
    },
    activityLevel: {
      type: DataTypes.ENUM('sedentary', 'light', 'moderate', 'active', 'very_active'),
      defaultValue: 'moderate',
    },
    bmr: {
      type: DataTypes.FLOAT,
    },
    tdee: {
      type: DataTypes.FLOAT,
    },
    targetCalories: {
      type: DataTypes.FLOAT,
    },
    targetProtein: {
      type: DataTypes.FLOAT,
    },
    targetCarbs: {
      type: DataTypes.FLOAT,
    },
    targetFat: {
      type: DataTypes.FLOAT,
    },
    notes: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'clients',
    timestamps: true,
  }
);

module.exports = Client;
