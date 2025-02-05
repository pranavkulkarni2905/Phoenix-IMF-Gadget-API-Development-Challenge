const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Gadget = sequelize.define('Gadget', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM,
    values: ['Available', 'Deployed', 'Destroyed', 'Decommissioned'],
    defaultValue: 'Available'
  },
  missionSuccessProbability: {
    type: DataTypes.INTEGER,
    defaultValue: Math.floor(Math.random() * 100) + 1 // Random percentage between 1 and 100
  },
  decommissionedAt: {
    type: DataTypes.DATE
  }
});

module.exports = Gadget;
