<template>
  <div class="card">
    <div class="search">
      <input
        type="text"
        v-model="searchedCity"
        placeholder="Search"
        class="search-bar"
      />
      <button @click="getData">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 1024 1024"
          height="1.5em"
          width="1.5em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
          ></path>
        </svg>
      </button>
    </div>
    <div class="weather loading">
      <h2 class="city">Weather in {{ city }}</h2>
      <h1 class="temp">{{ temp }}°C</h1>
      <div class="flex">
        <img v-bind:src="image" alt="" class="icon" />
        <div class="description">{{ description }}</div>
      </div>
      <div class="humidity">Humidity: {{ humidity }}%</div>
      <div class="wind">Wind speed: {{ speed }} km/h</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WeatherCard",
  props: {
    name: String,
  },
  data() {
    return {
      city: "",
      searhedCity: "islamabad",
      weatherMain: "",
      temp: "",
      pressure: "",
      humidity: "",
      speed: "",
      description: "",
      image: "https://openweathermap.org/img/wn/04n.png",
    };
  },
  methods: {
    async getData() {
      const cityName = this.searchedCity ? this.searchedCity : "islamabad";
      try {
        const response = await axios.post(
          "http://localhost:5001/weather",
          {
            cityName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        const { city, temp, speed, humidity, description } = response.data;
        this.city = city;
        this.temp = temp;
        this.humidity = humidity;
        this.speed = speed;
        this.description = description;
      } catch (err) {
        alert(err.response.data);
        alert("Redirecting to Login Page");
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex {
  display: flex;
  align-items: center;
}

.card {
  background-color: #000;
  color: #fff;
  padding: 2em;
  width: 100%;
  max-width: 420px;
  margin: 1em;
  border-radius: 30px;
}
.search {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-bar {
  padding: 0.7em 1em;
  background-color: #222;
  outline: none;
  border: none;
  border-radius: 24px;
  font-size: 105%;
  color: #fff;
  width: calc(100% - 100px);
}
button {
  color: white;
  margin: 0.5em;
  border-radius: 50%;
  height: 44px;
  width: 44px;
  border: none;
  background-color: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;
}

button:hover {
  background: #7c7c7c6b;
}

h1.temp {
  margin: 0;
  margin-bottom: 0.4em;
}
</style>
