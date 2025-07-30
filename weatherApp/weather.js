const apiKey = "YOUR_API_KEY_HERE";

const description = document.getElementById("description");
const temperature = document.getElementById("temp");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const cityName = document.getElementById("cityInput");
const btn = document.getElementById("btn");
const errorMess = document.getElementById("errorMess");
const dataErr = document.getElementById("dataErr");

btn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityName.value.trim();

  if (city === "") {
    errorMess.textContent = "City cannot be empty!!";
    setTimeout(() => {
      errorMess.textContent = "";
    }, 2000);
    return;
  }

  if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
    dataErr.textContent = "API key is missing! Please add your API key.";
    setTimeout(() => {
      dataErr.textContent = "";
    }, 2000);
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Can't fetch details!!");
    }

    const weatherData = await response.json();
    showData(weatherData);
  } catch (err) {
    clearDataInput();
    dataErr.textContent = "Sorry, didn't find any city. Please check the name or try again!";
    setTimeout(() => {
      dataErr.textContent = "";
    }, 2000);
  }
}

function showData(weatherData) {
  description.textContent = weatherData.weather[0].description;
  windSpeed.textContent = `Wind-Speed: --${weatherData.wind.speed} m/s`;
  temperature.textContent = `Temperature: --${weatherData.main.temp} °C`;
  humidity.textContent = `Humidity: --${weatherData.main.humidity} %`;
}

function clearDataInput() {
  description.textContent = "";
  temperature.textContent = "";
  humidity.textContent = "";
  windSpeed.textContent = "";
}
