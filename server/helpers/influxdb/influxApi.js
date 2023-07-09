const { InfluxDB } = require("@influxdata/influxdb-client");

const { influx } = require("../../config");

const {url,token,org,bucket} = influx;

const influxDB = new InfluxDB({ url, token });

const writeApi = influxDB.getWriteApi(org, bucket);

const queryApi = influxDB.getQueryApi(org);

module.exports = {
  writeApi,
  queryApi,
};
