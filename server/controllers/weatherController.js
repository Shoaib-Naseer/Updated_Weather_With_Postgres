const Weather = require("../models/weather");
exports.getWeather = async (req, res) => {
  try {
    // Query the latest weather data from the database
    const weatherData = await Weather.findOne({
      order: [["createdAt", "DESC"]],
    });

    if (!weatherData) {
      return res.status(404).json({ message: "Weather data not found" });
    }

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
