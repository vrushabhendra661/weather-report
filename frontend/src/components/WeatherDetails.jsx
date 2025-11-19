import './WeatherDetails.css';

function WeatherDetails({ weather }) {
  if (!weather) return null;

  const getWeatherBackground = (weatherMain) => {
    const backgrounds = {
      Clear: 'var(--gradient-sky)',
      Clouds: 'var(--gradient-1)',
      Rain: 'var(--gradient-night)',
      Drizzle: 'var(--gradient-night)',
      Thunderstorm: 'var(--gradient-2)',
      Snow: 'linear-gradient(135deg, #e6f2ff 0%, #b3d9ff 100%)',
      Mist: 'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)',
      Fog: 'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)',
    };
    return backgrounds[weatherMain] || 'var(--gradient-1)';
  };

  const getWeatherEmoji = (weatherMain) => {
    const emojis = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Fog: '🌫️',
      Haze: '🌫️',
    };
    return emojis[weatherMain] || '🌤️';
  };

  return (
    <div className="weather-details fade-in">
      <div
        className="weather-card"
        style={{ background: getWeatherBackground(weather.weather) }}
      >
        <div className="weather-header">
          <div className="location">
            <h2 className="city-name">
              {weather.city}, {weather.country}
            </h2>
            <p className="coordinates">
              📍 {weather.lat.toFixed(2)}°, {weather.lon.toFixed(2)}°
            </p>
          </div>
          <div className="weather-main">
            <span className="weather-emoji">{getWeatherEmoji(weather.weather)}</span>
          </div>
        </div>

        <div className="temperature-section">
          <div className="temperature">
            <span className="temp-value">{Math.round(weather.temperature)}</span>
            <span className="temp-unit">°C</span>
          </div>
          <p className="weather-description">{weather.weather_description}</p>
          <div className="feels-like">
            Feels like {Math.round(weather.feels_like)}°C
          </div>
        </div>

        <div className="weather-stats">
          <div className="stat-card">
            <div className="stat-icon">🌡️</div>
            <div className="stat-info">
              <p className="stat-label">Min / Max</p>
              <p className="stat-value">
                {Math.round(weather.temp_min)}° / {Math.round(weather.temp_max)}°
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💧</div>
            <div className="stat-info">
              <p className="stat-label">Humidity</p>
              <p className="stat-value">{weather.humidity}%</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💨</div>
            <div className="stat-info">
              <p className="stat-label">Wind Speed</p>
              <p className="stat-value">{weather.wind_speed} m/s</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔽</div>
            <div className="stat-info">
              <p className="stat-label">Pressure</p>
              <p className="stat-value">{weather.pressure} hPa</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">☁️</div>
            <div className="stat-info">
              <p className="stat-label">Cloudiness</p>
              <p className="stat-value">{weather.clouds}%</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👁️</div>
            <div className="stat-info">
              <p className="stat-label">Visibility</p>
              <p className="stat-value">{weather.visibility.toFixed(1)} km</p>
            </div>
          </div>
        </div>

        <div className="sun-times">
          <div className="sun-time">
            <span className="sun-icon">🌅</span>
            <div>
              <p className="sun-label">Sunrise</p>
              <p className="sun-value">{weather.sunrise}</p>
            </div>
          </div>
          <div className="sun-time">
            <span className="sun-icon">🌇</span>
            <div>
              <p className="sun-label">Sunset</p>
              <p className="sun-value">{weather.sunset}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;

