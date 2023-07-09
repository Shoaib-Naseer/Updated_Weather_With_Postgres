const { query } = require("../../services/influx_queries");
const { insertDataInflux, queryData } = require("./influxHelpers");
require("dotenv").config();

function storeWeatherData(weatherData) {
  try {
    const { city, icon, description, temp, pressure, humidity, speed } =
      weatherData;
    const data = {
      measurement: "weather",
      fields: {
        temperature: temp,
        humidity: humidity,
        description: description,
        pressure: pressure,
        speed: speed,
        icon: icon,
      },
      tags: {
        city: city,
      },
      timestamp: new Date(),
    };

    insertDataInflux(data);
  } catch (error) {
    console.log(error);
  }
}

// Query the latest weather data
async function queryLatestWeatherData() {
  try {
    await queryData(query);
  } catch (error) {
    console.error("Error querying latest weather data:", error);
  }
}

module.exports = {
  storeWeatherData,
  queryLatestWeatherData,
};
