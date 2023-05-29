const { Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize("weather", "shoaib", "1234", {
  host: "localhost",
  dialect: "postgres",
});

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
},{tableName: 'Users'});

module.exports = User;
