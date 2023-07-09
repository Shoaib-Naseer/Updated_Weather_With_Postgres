const express = require("express");

const { connectDatabase } = require("./utils/database");
const topic = require("./utils/constants");

const userRoutes = require("./routes/userRoutes");
const weatherRoutes = require("./routes/weatherRoutes");


const fetchWeatherAndPublish = require("./weatherStation");
const { connectMqttClient, subscribeTopic } = require("./utils/mqttConnection");

const { port : PORT } = require("./config");
const cors = require("cors");


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
  // Publish Weather at regular intervals (e.g., every 1 hour)
  setInterval(async () => {
    await fetchWeatherAndPublish( topic);
  }, 5000); // 5000 milliseconds = 5 seconds
});

module.exports = app;
