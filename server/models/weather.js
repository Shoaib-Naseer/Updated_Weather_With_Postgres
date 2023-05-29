const { DataTypes ,Sequelize} = require('sequelize');
const sequelize = new Sequelize("weather", "shoaib", "1234", {
  host: "localhost",
  dialect: "postgres",
});

const Weather = sequelize.define('Weather', {
  city: {
    type: DataTypes.STRING,
  },
  icon: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  temp: {
    type: DataTypes.STRING,
  },
  pressure: {
    type: DataTypes.STRING,
  },
  humidity: {
    type: DataTypes.STRING,
  },
  speed: {
    type: DataTypes.STRING,
  },
});

module.exports = Weather;
