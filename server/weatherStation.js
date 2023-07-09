const { publishWeatherData } = require("./utils/mqttConnection");

const fetchWeatherAndPublish = async (topic) => {
  try {

    const city = 'islamabad'
    const description = 'Cloudy Weather'
    function generateRandomValue(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const temp = generateRandomValue(-20, 40);
    
    const humidity = generateRandomValue(0, 100);
    
    const pressure = generateRandomValue(900, 1100);
    
    const speed = Math.random() * 20;
    

    const weatherData = {
      city,
      temp,
      humidity,
      speed,
      description,
      pressure,
    };
    // Publish weather data to a specific topic
    publishWeatherData(topic, weatherData);

  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
};

module.exports = fetchWeatherAndPublish;
