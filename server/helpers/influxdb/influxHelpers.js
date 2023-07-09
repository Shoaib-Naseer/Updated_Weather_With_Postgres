const { queryApi, writeApi } = require("./influxApi");
const { Point } = require("@influxdata/influxdb-client");

exports.queryData = async (query) => {
  try {
    var result;
    for await (const { values, tableMeta } of queryApi.iterateRows(query)) {
      result = tableMeta.toObject(values);
    }
    console.log("After ");
    return result;
  } catch (error) {
    // Logging Errors on Console
    throw new Error("Error While Executing Query", error);
  }
};

const createPoints = (data) => {
  const point = new Point(data.measurement);

  for (const [field, value] of Object.entries(data.fields)) {
    if (typeof value === "string") {
      point.stringField(field, value);
    } else if (typeof value === "number") {
      point.floatField(field, value);
    }
  }

  point.tags = { ...data.tags };
  point.timestamp(data.timestamp);

  return point;
};

exports.insertDataInflux = (data) => {
  try {
    const point = createPoints(data);
    writeApi.writePoint(point);
    writeApi.flush();
    console.log("Points inserted");
  } catch (error) {
    throw new Error("Error Writing Point", error);
  }
};
