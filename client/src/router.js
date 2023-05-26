import Vue from "vue";
import Router from "vue-router";
import WeatherCard from "./components/WeatherCard.vue";

Vue.use(Router);

export default Router({
  routes: [{ path: "/", component: WeatherCard }],
});
