const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const {connectDatabase }= require("./config/database");
const userRoutes = require("./routes/userRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const cors = require("cors");
const fetchWeatherAndPublish = require('./weatherStation');
const { connectMqttClient, subscribeTopic, weatherTopics } = require("./utils/mqttConnection");
const topic = require("./utils/constants");
const { connectInfluxDB } = require("./influxdb/connection");

const url = process.env.WEATHER_API

const app = express();

const port = process.env.PORT || 5000;


connectDatabase();



app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/weather", weatherRoutes);



app.listen(port, () => {
  connectMqttClient();
  subscribeTopic(topic,  0);
  // Fetch weather data and publish it at regular intervals (e.g., every 1 hour)
  setInterval(async () => {
    await fetchWeatherAndPublish(url, topic);
  }, 5000); // 5000 milliseconds = 5 seconds
});

module.exports = app;
