const { influx } = require("../config");

const {bucket} = influx;

exports.query = `
    from(bucket: "${bucket}")
      |> range(start: -10s)
      |> filter(fn: (r) => r._measurement == "weather")
      |> last()
      |> sort(desc: true)
      |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
      |> drop(columns: ["_time", "_start", "_stop", "_measurement"])
  `;
