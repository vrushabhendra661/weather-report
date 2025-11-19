import { useState } from 'react';
import { clearHistory } from '../services/api';
import './RecentSearches.css';

function RecentSearches({ history, onHistoryClick, onClearHistory }) {
  const [isClearing, setIsClearing] = useState(false);

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear all search history?')) {
      setIsClearing(true);
      try {
        await clearHistory();
        onClearHistory();
      } catch (error) {
        console.error('Failed to clear history:', error);
        alert('Failed to clear history. Please try again.');
      } finally {
        setIsClearing(false);
      }
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!history || history.length === 0) {
    return (
      <div className="recent-searches">
        <div className="recent-searches-header">
          <h3>📜 Recent Searches</h3>
        </div>
        <div className="no-history">
          <span className="no-history-icon">🔍</span>
          <p>No search history yet</p>
          <p className="no-history-subtitle">Start by searching for a city above</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-searches fade-in">
      <div className="recent-searches-header">
        <h3>📜 Recent Searches</h3>
        <button
          className="clear-history-btn"
          onClick={handleClearHistory}
          disabled={isClearing}
        >
          {isClearing ? 'Clearing...' : '🗑️ Clear All'}
        </button>
      </div>

      <div className="history-grid">
        {history.map((item) => (
          <div
            key={item.id}
            className="history-card"
            onClick={() => onHistoryClick(item.city_name)}
          >
            <div className="history-main">
              <div className="history-location">
                <h4 className="history-city">
                  {item.city_name}, {item.country}
                </h4>
                <p className="history-time">{formatDate(item.timestamp)}</p>
              </div>
              <div className="history-temp">
                {Math.round(item.temperature)}°C
              </div>
            </div>
            <div className="history-details">
              <span className="history-detail">
                💧 {item.humidity}%
              </span>
              <span className="history-detail">
                💨 {item.wind_speed} m/s
              </span>
              <span className="history-weather">
                {item.weather_description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentSearches;

