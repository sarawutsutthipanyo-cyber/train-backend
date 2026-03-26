const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MealPlan = sequelize.define(
  'MealPlan',
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
    trainerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    weekStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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
    meals: {
      type: DataTypes.JSONB,
      defaultValue: {},
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
    tableName: 'meal_plans',
    timestamps: true,
  }
);

module.exports = MealPlan;
