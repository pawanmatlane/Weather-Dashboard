 // Get your API key from OpenWeatherMap or another weather service

// DOM elements
const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const weatherIcon = document.getElementById("weather-icon");

searchButton.addEventListener("click", fetchWeather);

// Fetch weather data from API
function fetchWeather() {
    const apiKey = "9faae5db8ee843f5c0c936f59817770d";
    const city = cityInput.value.trim();
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(err => alert("City not found or invalid API key."));
}

// Display weather data
function displayWeather(data) {
    const { name, main, weather } = data;
    
    // Update the weather details
    cityName.textContent = name;
    temperature.textContent = `${Math.round(main.temp)}°C`;
    condition.textContent = weather[0].description;
    weatherIcon.innerHTML = getWeatherIcon(weather[0].main);

    // Change background color based on weather condition
    document.body.style.backgroundColor = getBackgroundColor(weather[0].main);
}

// Weather icons based on conditions
function getWeatherIcon(condition) {
    switch (condition.toLowerCase()) {
        case "clear":
            return "☀️"; // Sunny
        case "rain":
            return "🌧️"; // Rainy
        case "clouds":
            return "☁️"; // Cloudy
        case "snow":
            return "❄️"; // Snowy
        default:
            return "🌈"; // Other (default)
    }
}

// Background color based on weather condition
function getBackgroundColor(condition) {
    switch (condition.toLowerCase()) {
        case "clear":
            return "#87CEEB"; // Light blue for sunny
        case "rain":
            return "#A9A9A9"; // Gray for rainy
        case "clouds":
            return "#B0C4DE"; // Light gray for cloudy
        case "snow":
            return "#ADD8E6"; // Light blue for snowy
        default:
            return "#f0f0f0"; // Default light gray
    }
}
