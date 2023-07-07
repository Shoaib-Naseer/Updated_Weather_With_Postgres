const { InfluxDB } = require('@influxdata/influxdb-client');
require('dotenv').config();

const url = process.env.INFLUX_URL;
const token = process.env.INFLUX_TOKEN;

let influxDB;

function connectInfluxDB() {
  influxDB = new InfluxDB({ url, token,  });
  return influxDB;
}

module.exports = {
  connectInfluxDB,
  influxDB
};
