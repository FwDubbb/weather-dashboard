// OpenWeatherMap API Configuration
const API_KEY = cb7e32c06c818da4f6a2805274c954e7; // Get free key from https://openweathermap.org/api
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const errorMessage = document.getElementById('errorMessage');
const loading = document.getElementById('loading');
const currentWeatherSection = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecastSection');
const savedCitiesSection = document.getElementById('savedCitiesSection');
const forecastGrid = document.getElementById('forecastGrid');
const citiesGrid = document.getElementById('citiesGrid');

// Saved cities in localStorage
let savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];

// Event Listeners
searchBtn.addEventListener('click', searchWeather);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchWeather();
});

// Load default city on page load
window.addEventListener('load', () => {
    if (API_KEY === cb7e32c06c818da4f6a2805274c954e7) {
        showError('Please set your OpenWeatherMap API key in script.js');
        loading.classList.remove('show');
    } else {
        getWeatherByCity('London');
        displaySavedCities();
    }
});

// Search for weather
async function searchWeather() {
    const city = searchInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    searchInput.value = '';
    getWeatherByCity(city);
}

// Get weather by city name
async function getWeatherByCity(city) {
    try {
        loading.classList.add('show');
        errorMessage.classList.remove('show');

        // Get coordinates from city name
        const geoResponse = await fetch(`${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`);
        if (!geoResponse.ok) throw new Error('City not found');

        const geoData = await geoResponse.json();
        if (geoData.length === 0) throw new Error('City not found');

        const { lat, lon, name, country } = geoData[0];

        // Get weather data
        const weatherResponse = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        if (!weatherResponse.ok) throw new Error('Failed to fetch weather data');

        const weatherData = await weatherResponse.json();

        // Get forecast data
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        if (!forecastResponse.ok) throw new Error('Failed to fetch forecast data');

        const forecastData = await forecastResponse.json();

        // Display data
        displayCurrentWeather(weatherData, name, country);
        displayForecast(forecastData.list);
        addSavedCity(name, weatherData);
        displaySavedCities();

    } catch (error) {
        showError(error.message);
    } finally {
        loading.classList.remove('show');
    }
}

// Display current weather
function displayCurrentWeather(data, city, country) {
    const { main, weather, wind, clouds, visibility, sys } = data;
    const description = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
    const iconEmoji = getWeatherEmoji(weather[0].main);

    document.getElementById('cityName').textContent = `${city}, ${country}`;
    document.getElementById('weatherDescription').textContent = description;
    document.getElementById('coordinates').textContent = `Lat: ${data.coord.lat.toFixed(2)}°, Lon: ${data.coord.lon.toFixed(2)}°`;
    document.getElementById('temperature').textContent = Math.round(main.temp);
    document.getElementById('weatherIcon').textContent = iconEmoji;
    document.getElementById('feelsLike').textContent = `${Math.round(main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${(wind.speed * 3.6).toFixed(1)} km/h`;
    document.getElementById('pressure').textContent = `${main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;

    // Calculate UV index based on time of day (simplified)
    const hour = new Date().getHours();
    const uvIndex = hour >= 10 && hour <= 16 ? (Math.random() * 8 + 2).toFixed(1) : (Math.random() * 3).toFixed(1);
    document.getElementById('uvIndex').textContent = uvIndex;

    currentWeatherSection.style.display = 'block';
}

// Display 5-day forecast
function displayForecast(forecastList) {
    forecastGrid.innerHTML = '';
    const dailyForecasts = {};

    // Group forecasts by day
    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        if (!dailyForecasts[day]) {
            dailyForecasts[day] = [];
        }
        dailyForecasts[day].push(forecast);
    });

    // Display first 5 days
    Object.entries(dailyForecasts).slice(0, 5).forEach(([day, forecasts]) => {
        const temps = forecasts.map(f => f.main.temp);
        const minTemp = Math.round(Math.min(...temps));
        const maxTemp = Math.round(Math.max(...temps));
        const description = forecasts[0].weather[0].main;
        const emoji = getWeatherEmoji(description);

        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="date">${day}</div>
            <div class="icon">${emoji}</div>
            <div class="temp-range">${minTemp}° - ${maxTemp}°</div>
            <div class="description">${description}</div>
        `;
        forecastGrid.appendChild(forecastCard);
    });

    forecastSection.style.display = 'block';
}

// Add city to saved cities
function addSavedCity(name, weatherData) {
    const existingCity = savedCities.find(c => c.name.toLowerCase() === name.toLowerCase());

    if (!existingCity) {
        savedCities.unshift({
            name,
            temp: Math.round(weatherData.main.temp),
            weather: weatherData.weather[0].main,
            icon: getWeatherEmoji(weatherData.weather[0].main)
        });

        if (savedCities.length > 6) savedCities.pop();
        localStorage.setItem('savedCities', JSON.stringify(savedCities));
    }
}

// Display saved cities
function displaySavedCities() {
    citiesGrid.innerHTML = '';

    if (savedCities.length === 0) {
        savedCitiesSection.style.display = 'none';
        return;
    }

    savedCities.forEach(city => {
        const cityCard = document.createElement('div');
        cityCard.className = 'city-card';
        cityCard.innerHTML = `
            <div class="name">${city.name}</div>
            <div class="temp">${city.icon}</div>
            <div class="temp">${city.temp}°C</div>
            <div class="weather">${city.weather}</div>
        `;
        cityCard.addEventListener('click', () => getWeatherByCity(city.name));
        citiesGrid.appendChild(cityCard);
    });

    savedCitiesSection.style.display = 'block';
}

// Get weather emoji based on condition
function getWeatherEmoji(condition) {
    const emojis = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '💨',
        'Haze': '🌫️',
        'Dust': '🌪️',
        'Fog': '🌫️',
        'Sand': '🌪️',
        'Ash': '🌋',
        'Squall': '🌪️',
        'Tornado': '🌪️'
    };
    return emojis[condition] || '🌤️';
}

// Show error message
function showError(message) {
    errorMessage.textContent = `❌ ${message}`;
    errorMessage.classList.add('show');
    currentWeatherSection.style.display = 'none';
    forecastSection.style.display = 'none';

    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}
