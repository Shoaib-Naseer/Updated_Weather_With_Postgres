const Weather = require("../models/weather");

exports.getWeather = async (req, res) => {
  try {
    // Fetch the latest weather data from the database
    const latestWeatherData = await Weather.findOne({
      where : {
        city:'Islamabad'
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(latestWeatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
