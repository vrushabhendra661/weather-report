import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDetails from './components/WeatherDetails';
import RecentSearches from './components/RecentSearches';
import { getWeather, getHistory } from './services/api';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch history on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistory(10);
      setHistory(data.history);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const handleSearch = async (city) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await getWeather(city);
      setWeatherData(data);
      // Refresh history after successful search
      await fetchHistory();
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (cityName) => {
    handleSearch(cityName);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="weather-icon">🌤️</span>
            Weather Dashboard
          </h1>
          <p className="subtitle">Real-time weather information for cities worldwide</p>
        </header>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="error-message fade-in">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Fetching weather data...</p>
          </div>
        )}

        {!loading && weatherData && (
          <WeatherDetails weather={weatherData} />
        )}

        <RecentSearches
          history={history}
          onHistoryClick={handleHistoryClick}
          onClearHistory={handleClearHistory}
        />

        <footer className="footer">
          <p>Powered by OpenWeatherMap API</p>
          <p className="footer-note">© 2024 Weather Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

