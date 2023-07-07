require("dotenv").config();

//PORT
const port = process.env.PORT;

//InfluxDb.config
const url = process.env.INFLUX_URL;
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET;

//Weather Api
const weatherApi = process.env.WEATHER_API;

module.exports = { url, token, org, bucket, weatherApi, port };
