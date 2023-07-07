import mqtt from "mqtt/dist/mqtt";
// MQTT broker connection options
const brokerOptions = {
  host: "broker.emqx.io",
  port: 8084,
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
  client.subscribe(topic, { qos }, (error) => {
    if (error) {
      console.log("Subscribe to topic error:", error);
      return;
    }
    console.log("Subscribed to topic:", topic);
  });
};

// Connect to MQTT broker and handle events
const connectMqttClient = () => {
  const address = `${brokerOptions.ssl ? "wss" : "ws"}://${
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

  return client;
};

// Disconnect MQTT client
const disconnectMqttClient = () => {
  if (client) {
    client.end();
    console.log("Disconnected from MQTT broker");
  }
};

export {
  weatherTopics,
  connectMqttClient,
  disconnectMqttClient,
  subscribeTopic,
  client,
};
