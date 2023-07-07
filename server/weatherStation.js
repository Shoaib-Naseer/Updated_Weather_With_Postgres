const { default: axios } = require("axios");
const { publishWeatherData } = require("./utils/mqttConnection");

const fetchWeatherAndPublish = async (url, topic) => {
  try {
    const response = await axios.get(url);
    const data = response.data;

    const { name: city } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, pressure } = data.main;
    const { speed } = data.wind;

    const weatherData = {
      city,
      temp,
      humidity,
      speed,
      icon,
      description,
      pressure,
    };
    // Publish weather data to a specific topic
    publishWeatherData(topic, weatherData);

    console.log(weatherData);
  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
};

module.exports = fetchWeatherAndPublish;
