import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

import WeatherCard from "./components/WeatherCard.vue";
import Signup from "./components/Signup.vue";
import Login from "./components/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/weather", component: WeatherCard },
    { path: "/signup", component: Signup },
    { path: "/login", component: Login }
  ],
});

createApp(App).use(router).mount("#app");
