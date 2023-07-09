const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("weather", "shoaib", "1234", {
  host: "localhost",
  dialect: "postgres",
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  await sequelize.sync({ force: true });
  console.log("All models were synchronized successfully.");
};

module.exports = {
  sequelize,
  connectDatabase,
};
