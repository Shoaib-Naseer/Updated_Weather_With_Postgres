const { InfluxDB } = require("@influxdata/influxdb-client");

const { url, token, org, bucket } = require("../../config");

const influxDB = new InfluxDB({ url, token });

const writeApi = influxDB.getWriteApi(org, bucket);

const queryApi = influxDB.getQueryApi(org);

module.exports = {
  writeApi,
  queryApi,
};
