const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Program = sequelize.define(
  'Program',
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    durationWeeks: {
      type: DataTypes.INTEGER,
      defaultValue: 4,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    startDate: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: 'programs',
    timestamps: true,
  }
);

module.exports = Program;
