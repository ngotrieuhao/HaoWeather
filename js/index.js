var search = document.querySelector(".weather__search");
var city = document.querySelector(".weather__capital--city");
var country = document.querySelector(".weather__capital--country");
var value = document.querySelector(".temperature--value");
var season = document.querySelector(".weather__content--season");
var visibility = document.querySelector(".visibility span");
var wind = document.querySelector(".wind span");
var humidity = document.querySelector(".humidity span");
var time = document.querySelector(".weather__content--time");
var content = document.querySelector(".weather__content");
var body = document.querySelector("body");

var icon = document.querySelector("#weather__icon");
var degree = document.querySelector("#degrees");
var snowfall = document.querySelector(".wrapp__snowflake");

async function changeWeatherUI(capitalSearch) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=d5a24b803a5b4f5cd78313d2004ae267`;
  let data = await fetch(apiURL).then((res) => res.json());

  if (data.cod == 200) {
    content.classList.remove("hide");
    city.innerText = data.name;
    country.innerText = data.sys.country;
    visibility.innerText = data.visibility + "m";
    wind.innerText = data.wind.speed + "s";
    humidity.innerText = data.main.humidity + "(%)";
    let temp = Math.round(data.main.temp - 273.15);
    season.innerText = data.weather[0] ? data.weather[0].main : "";
    time.innerText = new Date().toLocaleString("vi");

    body.setAttribute("class", "hot");
    value.innerText = Math.round(data.main.temp - 273.15);
    degree.innerText = "o";
    let hasIcon = icon.classList.contains("fa-solid");

    if (hasIcon || "fa-cloud-sun" || "fa-cloud" || "fa-snowflake") {
      icon.classList.remove("fa-cloud-sun", "fa-cloud", "fa-snowflake");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.add("fa-solid");
    }

    if (temp <= 30) {
      value.innerText = Math.round(data.main.temp - 273.15);
      degree.innerText = "o";
      body.setAttribute("class", "warm");
      if (hasIcon || "fa-sun" || "fa-cloud" || "fa-snowflake") {
        icon.classList.remove("fa-sun", "fa-cloud", "fa-snowflake");
        icon.classList.add("fa-cloud-sun");
      } else {
        icon.classList.add("fa-solid");
      }
    }
    if (temp <= 22) {
      value.innerText = Math.round(data.main.temp - 273.15);
      degree.innerText = "o";
      body.setAttribute("class", "cool");
      if (hasIcon || "fa-sun" || "fa-cloud-sun" || "fa-snowflake") {
        icon.classList.remove("fa-sun", "fa-cloud-sun", "fa-snowflake");
        icon.classList.add("fa-cloud");
      } else {
        icon.classList.add("fa-solid");
      }
    }
    if (temp <= 18) {
      value.innerText = Math.round(data.main.temp - 273.15);
      degree.innerText = "o";
      body.setAttribute("class", "cold");
      if (hasIcon || "fa-sun" || "fa-cloud-sun" || "fa-cloud") {
        icon.classList.remove("fa-sun", "fa-cloud-sun", "fa-cloud");
        icon.classList.add("fa-snowflake");
        snowfall.style.display = "block";
      } else {
        icon.classList.add("fa-solid");
      }
    }
  } else {
    content.classList.add("hide");
  }
}
search.addEventListener("keypress", function (e) {
  if (e.code == "Enter" || e.keyCode == "13") {
    let capitalSearch = search.value.trim();
    // search.value = "";
    changeWeatherUI(capitalSearch);
  }
});

changeWeatherUI("Ho Chi Minh");
