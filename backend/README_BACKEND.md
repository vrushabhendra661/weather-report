# Weather Dashboard Backend API

Flask-based backend API for the Weather Dashboard application.

## Features

- RESTful API endpoints for weather data retrieval
- SQLite database for search history
- OpenWeatherMap API integration
- Comprehensive logging
- Error handling
- Unit tests with pytest

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create a `.env` file in the backend directory:
```bash
OPENWEATHER_API_KEY=your_api_key_here
```

Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

### Running the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

### Running Tests

```bash
pytest test_app.py -v
```

For coverage report:
```bash
pytest test_app.py --cov=app --cov-report=html
```

## API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Get Weather Data

**Endpoint:** `GET /api/weather`

**Description:** Fetch current weather data for a specific city

**Query Parameters:**
- `city` (required): Name of the city

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
- `500 Internal Server Error`: API error or server error

---

#### 2. Get Search History

**Endpoint:** `GET /api/history`

**Description:** Retrieve recent weather search history

**Query Parameters:**
- `limit` (optional): Maximum number of records (default: 10)

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

#### 4. Home Endpoint

**Endpoint:** `GET /`

**Description:** Get API information and available endpoints

**Example Response (200 OK):**
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

## Database Schema

### SearchHistory Table

| Column | Type | Description |
|--------|------|-------------|
| id | Integer | Primary key (auto-increment) |
| city_name | String(100) | Name of the city |
| country | String(10) | Country code |
| temperature | Float | Temperature in Celsius |
| weather_description | String(200) | Weather description |
| humidity | Integer | Humidity percentage |
| wind_speed | Float | Wind speed in m/s |
| timestamp | DateTime | Search timestamp (UTC) |

## Logging

The application logs all activities to:
- Console output
- `weather_app.log` file

Log levels:
- INFO: Normal operations
- WARNING: Invalid requests or city not found
- ERROR: API errors, database errors, unexpected errors

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| OPENWEATHER_API_KEY | Your OpenWeatherMap API key | Yes |

## Error Handling

All endpoints return appropriate HTTP status codes and error messages:

- `400`: Bad Request (missing parameters)
- `404`: Not Found (city not found)
- `500`: Internal Server Error
- `504`: Gateway Timeout (API timeout)

## CORS Configuration

CORS is enabled for all origins to allow the React frontend to communicate with the backend.

## Technologies Used

- Flask 3.0.0
- Flask-CORS 4.0.0
- Flask-SQLAlchemy 3.1.1
- SQLite
- Python Requests
- Python-dotenv

