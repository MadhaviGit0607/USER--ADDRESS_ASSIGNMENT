const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
  },
}, {
  sequelize,
  modelName: 'User',
  timestamps: false,
});

module.exports = User;
