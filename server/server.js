const express = require("express");
const { connectDatabase } = require("./utils/database");
const userRoutes = require("./routes/userRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const cors = require("cors");
const fetchWeatherAndPublish = require("./weatherStation");
const { connectMqttClient, subscribeTopic } = require("./utils/mqtt/mqttConnection");
const topic = require("./utils/constants");
const { weatherApi, port: PORT } = require("./config");

const app = express();

const port = PORT || 5000;

connectDatabase();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/weather", weatherRoutes);

app.listen(port, () => {
  connectMqttClient();
  subscribeTopic(topic, 0);
  // Fetch weather data and publish it at regular intervals (e.g., every 1 hour)
  setInterval(async () => {
    await fetchWeatherAndPublish(weatherApi, topic);
  }, 5000); // 5000 milliseconds = 5 seconds
});

module.exports = app;
