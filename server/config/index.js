require("dotenv").config();

//PORT
const port = process.env.PORT;

// JWT credentials
const jwtCredentials = {
    jwtSecret : process.env.JWT_SECRET
}

//InfluxDb.config
const influx = { url : process.env.INFLUX_URL,
 token : process.env.INFLUX_TOKEN,
 org : process.env.INFLUX_ORG,
 bucket : process.env.INFLUX_BUCKET,
}
//Weather Api
const weatherApi = process.env.WEATHER_API;

module.exports = { influx, jwtCredentials, port };
