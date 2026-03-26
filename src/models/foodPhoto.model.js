const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FoodPhoto = sequelize.define('FoodPhoto', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  clientId: { type: DataTypes.UUID, allowNull: false },
  mealType: { type: DataTypes.ENUM('breakfast','lunch','dinner','snack','other'), defaultValue: 'other' },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  photoUrl: { type: DataTypes.STRING, allowNull: false },
  notes: { type: DataTypes.TEXT, defaultValue: '' },
}, { tableName: 'food_photos' });

module.exports = FoodPhoto;
