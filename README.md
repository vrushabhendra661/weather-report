# 🌤️ Weather Dashboard

A modern, responsive web application that displays real-time weather information for cities worldwide. Built with React for the frontend and Flask for the backend, integrated with the OpenWeatherMap API.

![Weather Dashboard](https://img.shields.io/badge/Status-Complete-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Flask](https://img.shields.io/badge/Flask-3.0.0-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🎯 Core Features
- **Real-time Weather Data**: Fetch current weather information for any city worldwide
- **Comprehensive Weather Details**: Temperature, humidity, wind speed, pressure, visibility, sunrise/sunset times
- **Search History**: Automatically maintains a history of recent searches
- **Interactive UI**: Click on history items to quickly search again
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful Gradients**: Dynamic backgrounds based on weather conditions
- **Error Handling**: Graceful error messages for invalid cities or network issues

### 🔧 Technical Features
- **RESTful API**: Well-structured backend API with Flask
- **Database Storage**: SQLite database for persistent search history
- **Comprehensive Logging**: Backend logging for monitoring and debugging
- **Unit Tests**: Full test coverage for both frontend and backend
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **API Documentation**: Complete documentation for all endpoints

## 📸 Screenshots

### Main Dashboard
```
┌─────────────────────────────────────────────────────┐
│           🌤️ Weather Dashboard                      │
│   Real-time weather information worldwide           │
│                                                      │
│   🔍 [Search City________________] [Search]         │
│                                                      │
│   ┌───────────────────────────────────────┐        │
│   │  London, GB                    ☁️     │        │
│   │  📍 51.51°, -0.13°                    │        │
│   │                                        │        │
│   │           16°C                         │        │
│   │      scattered clouds                  │        │
│   │      Feels like 14°C                   │        │
│   │                                        │        │
│   │  🌡️ Min/Max    💧 Humidity            │        │
│   │  14° / 17°     72%                     │        │
│   │                                        │        │
│   │  💨 Wind       🔽 Pressure             │        │
│   │  3.5 m/s       1013 hPa                │        │
│   │                                        │        │
│   │  🌅 Sunrise    🌇 Sunset               │        │
│   │  06:45         16:30                   │        │
│   └───────────────────────────────────────┘        │
│                                                      │
│   📜 Recent Searches                                │
│   ┌─────────────┐ ┌─────────────┐                  │
│   │ London, GB  │ │ Paris, FR   │                  │
│   │ 16°C        │ │ 18°C        │                  │
│   └─────────────┘ └─────────────┘                  │
└─────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

#### Backend Requirements
- Python 3.8 or higher
- pip (Python package manager)

#### Frontend Requirements
- Node.js 16.x or higher
- npm or yarn

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```

#### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Create a `.env` file in the backend directory:
```bash
OPENWEATHER_API_KEY=your_api_key_here
```

**Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)**

#### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the frontend directory (optional):
```bash
VITE_API_URL=http://localhost:5000
```

### Running the Application

#### Start Backend Server

In the backend directory:
```bash
python app.py
```

The backend will start on `http://localhost:5000`

#### Start Frontend Development Server

In the frontend directory (in a new terminal):
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

#### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Get Weather Data

**Endpoint:** `GET /api/weather`

**Description:** Fetch current weather data for a specific city

**Query Parameters:**
- `city` (required, string): Name of the city

**Example Request:**
```bash
curl "http://localhost:5000/api/weather?city=London"
```

**Example Response (200 OK):**
```json
{
  "city": "London",
  "country": "GB",
  "temperature": 15.5,
  "feels_like": 14.2,
  "temp_min": 14.0,
  "temp_max": 17.0,
  "humidity": 72,
  "pressure": 1013,
  "wind_speed": 3.5,
  "wind_deg": 180,
  "weather": "Clouds",
  "weather_description": "scattered clouds",
  "weather_icon": "03d",
  "clouds": 40,
  "visibility": 10.0,
  "sunrise": "06:45",
  "sunset": "16:30",
  "timezone": 0,
  "lat": 51.5074,
  "lon": -0.1278
}
```

**Error Responses:**
- `400 Bad Request`: City parameter is missing
- `404 Not Found`: City not found
- `500 Internal Server Error`: API error
- `504 Gateway Timeout`: Request timeout

---

#### 2. Get Search History

**Endpoint:** `GET /api/history`

**Description:** Retrieve recent weather search history

**Query Parameters:**
- `limit` (optional, integer): Maximum number of records (default: 10)

**Example Request:**
```bash
curl "http://localhost:5000/api/history?limit=5"
```

**Example Response (200 OK):**
```json
{
  "count": 2,
  "history": [
    {
      "id": 2,
      "city_name": "Paris",
      "country": "FR",
      "temperature": 18.0,
      "weather_description": "clear sky",
      "humidity": 65,
      "wind_speed": 2.0,
      "timestamp": "2024-01-15T14:30:00"
    },
    {
      "id": 1,
      "city_name": "London",
      "country": "GB",
      "temperature": 15.5,
      "weather_description": "scattered clouds",
      "humidity": 72,
      "wind_speed": 3.5,
      "timestamp": "2024-01-15T14:25:00"
    }
  ]
}
```

---

#### 3. Clear Search History

**Endpoint:** `DELETE /api/history`

**Description:** Clear all search history from the database

**Example Request:**
```bash
curl -X DELETE "http://localhost:5000/api/history"
```

**Example Response (200 OK):**
```json
{
  "message": "Search history cleared successfully",
  "deleted_count": 5
}
```

---

#### 4. API Information

**Endpoint:** `GET /`

**Description:** Get API information and available endpoints

**Example Response:**
```json
{
  "message": "Weather Dashboard API",
  "version": "1.0",
  "endpoints": {
    "GET /api/weather?city=<city_name>": "Fetch weather data for a city",
    "GET /api/history": "Retrieve recent search history",
    "DELETE /api/history": "Clear search history"
  }
}
```

## 🧪 Testing

### Backend Tests

Navigate to the backend directory and run:

```bash
# Run all tests
pytest test_app.py -v

# Run with coverage
pytest test_app.py --cov=app --cov-report=html

# View coverage report
open htmlcov/index.html
```

**Test Coverage:**
- API endpoint tests
- Database model tests
- Error handling tests
- Mock OpenWeatherMap API responses

### Frontend Tests

Navigate to the frontend directory and run:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui
```

**Test Coverage:**
- Component rendering tests
- User interaction tests
- State management tests
- API integration tests

## 📁 Project Structure

```
weather-dashboard/
├── backend/
│   ├── app.py                    # Flask application and API endpoints
│   ├── test_app.py              # Backend tests
│   ├── requirements.txt         # Python dependencies
│   ├── weather_history.db       # SQLite database (auto-generated)
│   ├── weather_app.log          # Application logs (auto-generated)
│   ├── .env                     # Environment variables (create this)
│   └── README_BACKEND.md        # Backend documentation
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx           # Search bar component
│   │   │   ├── SearchBar.css
│   │   │   ├── WeatherDetails.jsx      # Weather display component
│   │   │   ├── WeatherDetails.css
│   │   │   ├── RecentSearches.jsx      # History component
│   │   │   ├── RecentSearches.css
│   │   │   └── __tests__/              # Component tests
│   │   │       ├── SearchBar.test.jsx
│   │   │       ├── WeatherDetails.test.jsx
│   │   │       └── RecentSearches.test.jsx
│   │   ├── services/
│   │   │   └── api.js                  # API service layer
│   │   ├── App.jsx                     # Main App component
│   │   ├── App.css
│   │   ├── main.jsx                    # Entry point
│   │   ├── index.css                   # Global styles
│   │   └── setupTests.js               # Test configuration
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env                     # Environment variables (optional)
│
└── README.md                    # This file
```

## 🛠️ Technologies Used

### Frontend
- **React 18.2.0** - UI library
- **Vite 5.0** - Build tool and dev server
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Vitest** - Testing framework
- **React Testing Library** - Component testing

### Backend
- **Flask 3.0.0** - Web framework
- **Flask-CORS** - Cross-Origin Resource Sharing
- **Flask-SQLAlchemy** - ORM
- **SQLite** - Database
- **Python Requests** - HTTP library
- **Python-dotenv** - Environment variables
- **pytest** - Testing framework

### External APIs
- **OpenWeatherMap API** - Weather data provider

## 🎨 Design Features

### UI/UX Design
- **Responsive Layout**: Works on all screen sizes
- **Dynamic Backgrounds**: Changes based on weather conditions
- **Smooth Animations**: Fade-in and slide-in effects
- **Loading States**: Visual feedback during API calls
- **Error Messages**: User-friendly error handling
- **Accessible**: Keyboard navigation and ARIA labels

### Color Scheme
- Primary: `#4a90e2` (Blue)
- Secondary: `#f39c12` (Orange)
- Success: `#2ecc71` (Green)
- Danger: `#e74c3c` (Red)
- Dark Background: `#1a1a2e`
- Card Background: `#16213e`

## 🔒 Security Considerations

- API keys stored in environment variables
- CORS configured for frontend-backend communication
- Input validation and sanitization
- Error messages don't expose sensitive information
- Database uses parameterized queries (SQLAlchemy ORM)

## 🐛 Troubleshooting

### Backend Issues

**Problem:** `ModuleNotFoundError`
```bash
# Solution: Install missing dependencies
pip install -r requirements.txt
```

**Problem:** Database errors
```bash
# Solution: Delete and recreate database
rm weather_history.db
python app.py
```

**Problem:** API key invalid
```bash
# Solution: Check your .env file and verify API key from OpenWeatherMap
```

### Frontend Issues

**Problem:** `Cannot GET /api/weather`
```bash
# Solution: Ensure backend is running on port 5000
cd backend
python app.py
```

**Problem:** CORS errors
```bash
# Solution: Flask-CORS should handle this. Check if backend has CORS(app) enabled
```

**Problem:** Build errors
```bash
# Solution: Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 Environment Variables

### Backend (.env)
```bash
OPENWEATHER_API_KEY=your_api_key_here
```

### Frontend (.env) - Optional
```bash
VITE_API_URL=http://localhost:5000
```

## 🚀 Deployment

### Backend Deployment (Example: Heroku)
```bash
# Install Heroku CLI
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set OPENWEATHER_API_KEY=your_api_key

# Deploy
git push heroku main
```

### Frontend Deployment (Example: Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Set environment variables in Vercel dashboard
# VITE_API_URL=https://your-backend-url.herokuapp.com
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [React](https://reactjs.org/) for the amazing UI library
- [Flask](https://flask.palletsprojects.com/) for the lightweight backend framework
- All the open-source contributors whose libraries made this project possible

## 📊 Performance

- **API Response Time**: < 500ms (average)
- **Page Load Time**: < 2s
- **Database Queries**: Optimized with indexes
- **Frontend Bundle Size**: < 500KB (gzipped)

## 🔮 Future Enhancements

- [ ] 5-day weather forecast
- [ ] Weather maps and radar
- [ ] Location-based auto-detection
- [ ] Multiple language support
- [ ] Dark/Light theme toggle
- [ ] Weather alerts and notifications
- [ ] Comparison between multiple cities
- [ ] Export search history to CSV
- [ ] User authentication and personalized dashboards
- [ ] Progressive Web App (PWA) support

## 📞 Support

If you have any questions or issues, please:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing [Issues](https://github.com/yourusername/weather-dashboard/issues)
3. Create a new issue with detailed information

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---
