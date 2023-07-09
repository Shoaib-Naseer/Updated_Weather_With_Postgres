const mqttOptions = {
    host: process.env.VUE_APP_MQTT_HOST,
    port: process.env.VUE_APP_MQTT_PORT,
    username: process.env.VUE_APP_MQTT_USER,
    password: process.env.VUE_APP_MQTT_PASS,
    clientId: "emqx_nodejs_" + Math.random().toString(16).substring(2, 8),
    ssl: process.env.VUE_APP_MQTT_SSL,
    topic:  process.env.VUE_APP_MQTT_TOPIC
  };

  export default mqttOptions;