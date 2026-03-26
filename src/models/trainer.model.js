const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Trainer = sequelize.define(
  'Trainer',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    bio: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    specialties: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    experience: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: { min: 0, max: 5 },
    },
    totalReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    pricePerHour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    availability: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'trainers',
  }
);

module.exports = Trainer;
