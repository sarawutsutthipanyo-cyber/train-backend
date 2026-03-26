const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProgressLog = sequelize.define(
  'ProgressLog',
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
    weight: {
      type: DataTypes.FLOAT,
    },
    bodyFat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    measurements: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    notes: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    photoUrl: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
  },
  {
    tableName: 'progress_logs',
    timestamps: true,
  }
);

module.exports = ProgressLog;
