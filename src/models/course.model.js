const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define(
  'Course',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    trainerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'trainers', key: 'id' },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER, // minutes
      allowNull: false,
    },
    maxStudents: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    thumbnail: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'courses',
  }
);

module.exports = Course;
