# Weather Dashboard

A beautiful and responsive weather dashboard that fetches real-time weather data from the OpenWeatherMap API.

## Features

✨ **Current Weather Display**
- City and country information
- Current temperature and weather condition
- Feels-like temperature
- Humidity, wind speed, pressure, visibility, and UV index

📅 **5-Day Forecast**
- Daily temperature ranges
- Weather conditions for each day
- Weather emoji indicators

💾 **Saved Cities**
- Automatically saves recently viewed cities
- Quick access to favorite locations
- Stores up to 6 cities in browser localStorage

🎨 **Beautiful UI**
- Modern gradient design
- Smooth animations and transitions
- Fully responsive layout (desktop, tablet, mobile)
- Emoji-based weather indicators

🔍 **Easy Search**
- Search any city worldwide
- Real-time weather data fetch
- Error handling for invalid cities

## Setup Instructions

### 1. Get a Free API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate a free API key
4. Copy your API key

### 2. Add API Key to Project

1. Open `script.js`
2. Find line 4: `const API_KEY = 'YOUR_API_KEY_HERE';`
3. Replace `'YOUR_API_KEY_HERE'` with your actual API key

```javascript
const API_KEY = 'your_actual_api_key_here';
```

### 3. Run the Application

1. Open `index.html` in your web browser
2. Allow any browser permissions if prompted
3. Start searching for cities!

## How to Use

1. **Search**: Type a city name in the search box and press Enter or click Search
2. **View Details**: See current weather, temperature, and various meteorological data
3. **Check Forecast**: View the 5-day weather forecast below current weather
4. **Save Cities**: Recently viewed cities are automatically saved
5. **Quick Access**: Click on a saved city card to quickly view its weather

## API Used

- **OpenWeatherMap API** (Free tier)
  - Weather data endpoint
  - Forecast endpoint
  - Geolocation endpoint

## Technologies

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- Fetch API
- LocalStorage API

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## File Structure

```
weather-dashboard/
├── index.html       # Main HTML file
├── style.css        # Styling and responsive design
├── script.js        # JavaScript logic and API integration
└── README.md        # Documentation
```

## Features Breakdown

### Weather Details Displayed
- **Temperature**: Current, feels-like, and forecast ranges
- **Humidity**: Percentage of moisture in air
- **Wind Speed**: Converted to km/h for readability
- **Pressure**: Atmospheric pressure in hPa
- **Visibility**: How far you can see (in km)
- **UV Index**: Sun exposure level

### Data Persistence
- Saved cities are stored in browser localStorage
- Persists across browser sessions
- Up to 6 most recent cities are saved

## Notes

- Free OpenWeatherMap API tier includes all necessary data
- API calls are limited to 60 per minute on free tier (more than enough for personal use)
- Weather emojis are used for visual representation
- Responsive design works on all screen sizes

## License

Free to use and modify for personal and commercial projects.

## Support

For issues with the OpenWeatherMap API, visit their [documentation](https://openweathermap.org/api).
