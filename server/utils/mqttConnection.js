const mqtt = require("mqtt");
const { storeWeatherData, queryLatestWeatherData} = require("../influxdb");

// MQTT broker connection options
const brokerOptions = {
  host: "broker.emqx.io",
  port: 8883,
  endpoint: "mqtt",
  username: "shoaibNaseer",
  password: "12345",
  clientId: "emqx_nodejs_" + Math.random().toString(16).substring(2, 8),
  ssl: true,
};

// Weather topics to subscribe to
const weatherTopics = [
  "weather/updates",
  //   "weather/humidity",
  //   "weather/forecast",
];

// MQTT client instance
let client;

// Subscribe to a topic
const subscribeTopic = (topic, qos) => {
  client.subscribe(topic, { qos }, (error, res) => {
    if (error) {
      console.log("Subscribe to topic error:", error);
      return;
    }
    console.log("Subscribed to topic:", topic);
  });
};

// Connect to MQTT broker and handle events
const connectMqttClient = () => {
  const address = `${brokerOptions.ssl ? "mqtts" : "mqtt"}://${
    brokerOptions.host
  }:${brokerOptions.port}/${brokerOptions.endpoint}`;
  console.log(`Connecting to MQTT broker on ${address}`);
  client = mqtt.connect(address, brokerOptions);

  client.on("connect", () => {
    console.log("Connection succeeded!");
  });

  client.on("error", (error) => {
    console.log("Connection failed!", error);
  });

  client.on("message", async (topic, message) => {
    const weatherData = JSON.parse(message.toString());
   
    // Store the weatherData in the database
    if (topic === weatherTopics[0]) {
     try {
      storeWeatherData(weatherData);
      console.log("data successfully stored in influxdb");

      await queryLatestWeatherData();
      console.log("Fetched weather data")

     } catch (error) {
      console.log("error while storing weather data to influxdb",error);
     }
    }
  });

  return client;
};

// Disconnect MQTT client
const disconnectMqttClient = () => {
  if (client) {
    client.end();
    console.log("Disconnected from MQTT broker");
  }
};

// Publish weather data to the MQTT broker
const publishWeatherData = (topic, data) => {
  if (client) {
    const payload = JSON.stringify(data);
    client.publish(topic, payload, { qos: 0 }, (error) => {
      if (error) {
        console.log("Failed to publish weather data:", error);
      } else {
        console.log("Weather data published successfully");
      }
    });
  }
};

module.exports = {
  weatherTopics,
  connectMqttClient,
  disconnectMqttClient,
  publishWeatherData,
  subscribeTopic,
};
