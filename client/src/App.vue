<template>
  <div id="app">
    <router-view></router-view>
    <!-- <WeatherCard city="Islamabad" /> -->
  </div>
</template>

<script>
import { connectMqttClient, subscribeTopic } from "./assets/mqttConnection";
import topic from "./assets/mqttconstants";

export default {
  name: "App",
  components: {},
  mounted() {
    connectMqttClient();
    subscribeTopic(topic, 0);
  },
};
</script>

<style>
body {
  font-family: "Open Sans";
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: "Open Sans", sans-serif;
  background: #222;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("https://images.unsplash.com/photo-1489515217757-5fd1be406fef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80");
}
</style>
