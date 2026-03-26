const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FoodItem = sequelize.define(
  'FoodItem',
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
    nameTh: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'other',
    },
    caloriesPer100g: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    proteinPer100g: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    carbsPer100g: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    fatPer100g: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    defaultServingSize: {
      type: DataTypes.FLOAT,
      defaultValue: 100,
    },
    defaultServingUnit: {
      type: DataTypes.STRING,
      defaultValue: 'g',
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isCustom: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: 'food_items',
    timestamps: true,
  }
);

module.exports = FoodItem;
