const { queryLatestWeatherData } = require("../helpers/influxdb");

exports.getWeather = async (req, res) => {
  try {
    // Fetch the latest weather data from the database
    const latestWeatherData = await queryLatestWeatherData();
    console.log("Api RESULT ", latestWeatherData);
    res.status(200).json(latestWeatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
