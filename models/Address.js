const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const User = require('./User');

class Address extends Model {}

Address.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Address',
  timestamps: false,
});

module.exports = Address;
