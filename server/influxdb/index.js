const { Point } = require("@influxdata/influxdb-client");
const { connectInfluxDB } = require("./connection");
require("dotenv").config();

/** Environment variables **/
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET;

let influxDB = connectInfluxDB();

const writeApi = influxDB.getWriteApi(org, bucket);

// Function to store weather data
function storeWeatherData(weatherData) {
  const { city, icon, description, temp, pressure, humidity, speed } =
    weatherData;

  const point = new Point("weather")
    .tag("city", city)
    .stringField("icon", icon)
    .stringField("description", description)
    .floatField("temperature", temp)
    .floatField("pressure", pressure)
    .floatField("humidity", humidity)
    .floatField("speed", speed)
    .timestamp(new Date());

  // Write the data point
  writeApi.writePoint(point);

  writeApi.flush().then(() => {
    console.log(` ${point}`);
    console.log("WRITE FINISHED");
  });
}

const queryApi = influxDB.getQueryApi(org);

// Query the latest weather data
async function queryLatestWeatherData() {
  try {
    const fluxQuery = `
      from(bucket: "${bucket}")
        |> range(start: -10s)
        |> filter(fn: (r) => r._measurement == "weather")
        |> last()
        |> sort(desc: true)
        |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
        |> drop(columns: ["_time", "_start", "_stop", "_measurement"])
    `;

    const result = [];

    for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
      const rowObject = tableMeta.toObject(values);
      result.push(rowObject);
    }

    return result;
  } catch (error) {
    console.error("Error querying latest weather data:", error);
    throw error;
  }
}


module.exports = {
  storeWeatherData,
  queryLatestWeatherData,
};
