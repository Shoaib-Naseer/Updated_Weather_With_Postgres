const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const {connectDatabase }= require("./config/database");
const userRoutes = require("./routes/userRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const cors = require("cors");
const weatherStation = require('./weatherStation');
const { default: axios } = require("axios");
const mqtt = require("mqtt");
const Weather = require("./models/weather");

const brokerUrl = "mqtt://localhost";
const brokerOptions = {
  clientId: "weather-broker",
};

const client = mqtt.connect(brokerUrl, brokerOptions);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
    // Fetch weather data and publish it at regular intervals (e.g., every 1 Minute)
    
});

const fetchWeatherAndPublish = async () => {
  const url = process.env.WEATHER_API
  try {
    const response = await axios.get(url);
    const data = response.data;

    const { name: city } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, pressure } = data.main;
    const { speed } = data.wind;

    const weatherData = await Weather.create({
      city,
      temp,
      humidity,
      speed,
      icon,
      description,
      pressure,
    });
    // Publish weather data to a specific topic
    client.publish("weather", JSON.stringify(weatherData));
    console.log("Weather data published", weatherData);
  } catch (error) {
    console.log("Error fetching weather data:", error.message);
  }
};


// Event handler for MQTT message received
client.on('message', async (topic, message) => {
    if (topic === 'weather') {
      try {
        const weatherData = JSON.parse(message.toString());
        // Store weather data in the database using the Weather model
        const createdWeather = await Weather.create(weatherData);
        console.log('Weather data stored in the database:', createdWeather);
      } catch (error) {
        console.log('Error storing weather data:', error.message);
      }
    }
  });


const app = express();

const port = process.env.PORT || 5000;


connectDatabase();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/weather", weatherRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // Fetch weather data and publish it at regular intervals (e.g., every 1 hour)
  setInterval(fetchWeatherAndPublish, 3600000);
});

module.exports = app;
