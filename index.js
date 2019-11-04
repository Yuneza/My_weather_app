let currentDateTimeContainer = document.querySelector("#current-date-time");
let currentDateTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let day = currentDateTime.getDate();
let dayofweek = days[currentDateTime.getDay()];
let hours = currentDateTime.getHours();
let minutes = currentDateTime.getMinutes();
let monthday = months[currentDateTime.getMonth()];
currentDateTimeContainer.innerHTML = `${day} ${monthday}, ${dayofweek} ${hours}: ${displayMinutes()}`;

function displayMinutes() {
  if (currentDateTime.getMinutes() < 10) {
    return "0" + currentDateTime.getMinutes();
  } else {
    return currentDateTime.getMinutes();
  }
}

function showTemperature(response) {
  let getTemperature = document.querySelector("#temperature");
  getTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  if (searchCity.value.length) {
    let city = document.querySelector("#city-name");
    city.innerHTML = searchCity.value;

    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric`;

    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  }
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", search);

let button = document.querySelector("#location");
button.addEventListener("click", getPosition);
