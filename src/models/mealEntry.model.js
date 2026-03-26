const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MealEntry = sequelize.define(
  'MealEntry',
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
    foodItemId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'food_items', key: 'id' },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    mealType: {
      type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack'),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    protein: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    carbs: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    fat: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    tableName: 'meal_entries',
    timestamps: true,
  }
);

module.exports = MealEntry;
