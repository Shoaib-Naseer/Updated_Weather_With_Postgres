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




const config = {
    broker: {
      host: process.env.BROKER_HOST || "broker.emqx.io",
      port: process.env.BROKER_PORT || "8883",
      endpoint: process.env.BROKER_ENDPOINT || "mqtt",
      username: process.env.BROKER_USERNAME || "shoaibNaseer",
      password: process.env.BROKER_PASSWORD || "12345",
      clientId: process.env.BROKER_CLIENT_ID || "emqx_nodejs_",
      ssl: process.env.BROKER_SSL === "true" || false,
    },
  };
  

module.exports = { url, token, org, bucket, weatherApi, port };
