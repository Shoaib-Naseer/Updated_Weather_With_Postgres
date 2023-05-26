const apiKey = "06268e299c197d902832697c2d8f8c3f";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=islamabad&units=metric&appid=69259004c2ebac362b71a19cefe024b6";

displayWeather = (data) => {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".temp").innerText = temp + "°C";
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".humidity").innerText = humidity;
  document.querySelector(".wind").innerText = speed;
};

let weather = {
  apiKey: "06268e299c197d902832697c2d8f8c3f",
  fetchWeather: async function (city) {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      );
      const data = await response.json();
      this.displayWeather(data);
    } catch (error) {
      console.log(error);
    }
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
weather.fetchWeather("Islamabad");
