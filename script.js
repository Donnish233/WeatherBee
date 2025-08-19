const searchForm = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
const results = document.getElementById("results");

const API_key = "fd559b01ec0cfab212e35e7c9aab1930";

function getWeather() {
  // If the search field is empty
  if (searchForm.value.trim() === "") {
    alert("Please enter a Location!");
    return;
  }

  const cityQuery = searchForm.value.trim();
  const locationData = `https://api.openweathermap.org/geo/1.0/direct?q=${cityQuery}&limit=1&appid=${API_key}`;

  fetch(locationData)
    .then((res) => res.json())
    .then((data) => {
      if (!data.length) {
        alert("Location not found.");
        return;
      }

      const { name: city_name, lat, lon, country, state } = data[0];
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`;

      fetch(weatherUrl)
        .then((res) => res.json())
        .then((weatherData) => {
          const actualWeath = weatherData.weather[0].main;
          const weathDesc = weatherData.weather[0].description;

          results.innerHTML = `
            <h3>Location: ${city_name}, ${state || ""}, ${country}</h3>
            <h4>Current Weather: ${actualWeath}</h4>
            <p>Description: ${weathDesc}</p>
          `;
        })
        .catch((err) => console.error("Error fetching weather data:", err));
    })
    .catch((err) => console.error("Error fetching location data:", err));
}

searchBtn.addEventListener("click", getWeather);

searchForm.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); 
    getWeather();
  }
});
