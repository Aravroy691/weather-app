// Weather App Script

console.log("The weather app is initialised.......");
console.log("Developed by Arav Roy (2910)");

const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};

const form = document.querySelector("#search-form");
const searchBox = document.querySelector(".search-box");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchBox.value.trim();
  if (!query) return;

  try {
    const response = await fetch(
      `${api.base}weather?q=${query}&units=metric&appid=${api.key}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const weather = await response.json();
    displayWeather(weather);

  } catch (error) {
    console.error(error);
    displayError();
  }
});

function displayWeather(weather) {
  document.querySelector("#city").innerText =
    `${weather.name}, ${weather.sys.country}`;

  updateDateTime();

  document.querySelector("#temp").innerHTML =
    `${Math.round(weather.main.temp)}<span>°c</span>`;

  document.querySelector("#status").innerText =
    weather.weather[0].main;

  document.querySelector("#range").innerText =
    `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function displayError() {
  document.querySelector("#city").innerText = "City Not Found";
  updateDateTime();
  document.querySelector("#temp").innerText = "—";
  document.querySelector("#status").innerText = "Not found";
  document.querySelector("#range").innerText = "Check city name";
}

function updateDateTime() {
  const now = new Date();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  document.querySelector("#zone").innerText =
    `${day}, ${date} ${month} ${year}`;

  document.querySelector("#time").innerText =
    `${hours}:${minutes}:${seconds}`;
}
