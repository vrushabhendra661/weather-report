# 🧪 API Testing Guide

This guide provides examples for testing the Weather Dashboard API endpoints.

## Prerequisites

- Backend server running on `http://localhost:5000`
- Valid OpenWeatherMap API key configured
- Tools: curl, Postman, or any HTTP client

## Testing Tools

### Using curl (Command Line)

All examples below use curl. It's available by default on macOS/Linux and Windows 10+.

### Using Postman

1. Import the endpoints as a collection
2. Set base URL as `http://localhost:5000`
3. Test each endpoint individually

## Endpoint Tests

### 1. API Information Endpoint

**Test:** Verify API is running and get endpoint information

```bash
curl http://localhost:5000/
```

**Expected Response:**
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

**Status Code:** 200 OK

---

### 2. Get Weather Data

#### Test 2.1: Valid City

**Test:** Fetch weather for a valid city

```bash
curl "http://localhost:5000/api/weather?city=London"
```

**Expected Response:**
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

**Status Code:** 200 OK

#### Test 2.2: City with Spaces

**Test:** Fetch weather for a city name with spaces

```bash
curl "http://localhost:5000/api/weather?city=New%20York"
# Or with proper URL encoding:
curl "http://localhost:5000/api/weather?city=New+York"
```

**Expected Response:** Valid weather data for New York

**Status Code:** 200 OK

#### Test 2.3: Invalid City

**Test:** Try to fetch weather for a non-existent city

```bash
curl "http://localhost:5000/api/weather?city=InvalidCityName123"
```

**Expected Response:**
```json
{
  "error": "City not found"
}
```

**Status Code:** 404 Not Found

#### Test 2.4: Missing City Parameter

**Test:** Make request without city parameter

```bash
curl "http://localhost:5000/api/weather"
```

**Expected Response:**
```json
{
  "error": "City parameter is required"
}
```

**Status Code:** 400 Bad Request

#### Test 2.5: Multiple Cities

**Test:** Fetch weather for multiple cities sequentially

```bash
# Test major world cities
curl "http://localhost:5000/api/weather?city=London"
curl "http://localhost:5000/api/weather?city=Paris"
curl "http://localhost:5000/api/weather?city=Tokyo"
curl "http://localhost:5000/api/weather?city=New%20York"
curl "http://localhost:5000/api/weather?city=Sydney"
```

**Expected:** Each request should return valid weather data

---

### 3. Get Search History

#### Test 3.1: Get All History

**Test:** Fetch all search history (default limit: 10)

```bash
curl "http://localhost:5000/api/history"
```

**Expected Response:**
```json
{
  "count": 5,
  "history": [
    {
      "id": 5,
      "city_name": "Sydney",
      "country": "AU",
      "temperature": 22.0,
      "weather_description": "clear sky",
      "humidity": 60,
      "wind_speed": 4.5,
      "timestamp": "2024-01-15T15:00:00"
    },
    {
      "id": 4,
      "city_name": "New York",
      "country": "US",
      "temperature": 10.0,
      "weather_description": "light rain",
      "humidity": 80,
      "wind_speed": 5.0,
      "timestamp": "2024-01-15T14:55:00"
    }
    // ... more entries
  ]
}
```

**Status Code:** 200 OK

#### Test 3.2: Get History with Limit

**Test:** Fetch limited number of history entries

```bash
curl "http://localhost:5000/api/history?limit=3"
```

**Expected Response:**
```json
{
  "count": 3,
  "history": [
    // 3 most recent entries
  ]
}
```

**Status Code:** 200 OK

#### Test 3.3: Empty History

**Test:** Fetch history when database is empty

```bash
# First clear history
curl -X DELETE "http://localhost:5000/api/history"

# Then get history
curl "http://localhost:5000/api/history"
```

**Expected Response:**
```json
{
  "count": 0,
  "history": []
}
```

**Status Code:** 200 OK

---

### 4. Clear Search History

#### Test 4.1: Clear History

**Test:** Delete all search history

```bash
curl -X DELETE "http://localhost:5000/api/history"
```

**Expected Response:**
```json
{
  "message": "Search history cleared successfully",
  "deleted_count": 5
}
```

**Status Code:** 200 OK

#### Test 4.2: Clear Already Empty History

**Test:** Try to clear when history is already empty

```bash
# Clear twice
curl -X DELETE "http://localhost:5000/api/history"
curl -X DELETE "http://localhost:5000/api/history"
```

**Expected Response:**
```json
{
  "message": "Search history cleared successfully",
  "deleted_count": 0
}
```

**Status Code:** 200 OK

---

## Automated Test Script

### Bash Script (test_api.sh)

```bash
#!/bin/bash

echo "========================================"
echo "Weather Dashboard API Test Suite"
echo "========================================"
echo ""

BASE_URL="http://localhost:5000"

echo "Test 1: API Information"
curl -s "$BASE_URL/" | python -m json.tool
echo ""

echo "Test 2: Get Weather - London"
curl -s "$BASE_URL/api/weather?city=London" | python -m json.tool
echo ""

echo "Test 3: Get Weather - Invalid City"
curl -s "$BASE_URL/api/weather?city=InvalidCity123"
echo ""

echo "Test 4: Get Search History"
curl -s "$BASE_URL/api/history" | python -m json.tool
echo ""

echo "Test 5: Clear History"
curl -s -X DELETE "$BASE_URL/api/history" | python -m json.tool
echo ""

echo "========================================"
echo "All tests completed!"
echo "========================================"
```

### Windows Batch Script (test_api.bat)

```batch
@echo off
echo ========================================
echo Weather Dashboard API Test Suite
echo ========================================
echo.

set BASE_URL=http://localhost:5000

echo Test 1: API Information
curl -s "%BASE_URL%/"
echo.

echo Test 2: Get Weather - London
curl -s "%BASE_URL%/api/weather?city=London"
echo.

echo Test 3: Get Weather - Invalid City
curl -s "%BASE_URL%/api/weather?city=InvalidCity123"
echo.

echo Test 4: Get Search History
curl -s "%BASE_URL%/api/history"
echo.

echo Test 5: Clear History
curl -s -X DELETE "%BASE_URL%/api/history"
echo.

echo ========================================
echo All tests completed!
echo ========================================
pause
```

## Performance Testing

### Response Time Test

```bash
# Measure response time
time curl "http://localhost:5000/api/weather?city=London"
```

### Load Test (Simple)

```bash
# Test with multiple concurrent requests
for i in {1..10}; do
  curl "http://localhost:5000/api/weather?city=London" &
done
wait
```

## Integration Testing

### Full Workflow Test

```bash
#!/bin/bash

echo "Starting Full Workflow Test..."

# 1. Clear history
echo "1. Clearing history..."
curl -X DELETE "http://localhost:5000/api/history"

# 2. Search for cities
echo "2. Searching cities..."
curl "http://localhost:5000/api/weather?city=London"
curl "http://localhost:5000/api/weather?city=Paris"
curl "http://localhost:5000/api/weather?city=Tokyo"

# 3. Verify history
echo "3. Verifying history..."
HISTORY=$(curl -s "http://localhost:5000/api/history")
echo $HISTORY | python -m json.tool

# 4. Check count
COUNT=$(echo $HISTORY | python -c "import sys, json; print(json.load(sys.stdin)['count'])")
echo "History count: $COUNT"

if [ $COUNT -eq 3 ]; then
  echo "✓ Test PASSED"
else
  echo "✗ Test FAILED"
fi
```

## Error Testing

### Test Error Scenarios

```bash
# Test 1: Empty city parameter
curl "http://localhost:5000/api/weather?city="

# Test 2: Very long city name
curl "http://localhost:5000/api/weather?city=$(python -c 'print("A"*1000)')"

# Test 3: Special characters
curl "http://localhost:5000/api/weather?city=<script>alert('xss')</script>"

# Test 4: SQL injection attempt
curl "http://localhost:5000/api/weather?city=London';DROP TABLE users;--"

# Test 5: Invalid method
curl -X POST "http://localhost:5000/api/weather?city=London"
```

## Postman Collection

### Import this JSON into Postman

```json
{
  "info": {
    "name": "Weather Dashboard API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get API Info",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/"
      }
    },
    {
      "name": "Get Weather",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:5000/api/weather?city=London",
          "query": [
            {
              "key": "city",
              "value": "London"
            }
          ]
        }
      }
    },
    {
      "name": "Get History",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/history"
      }
    },
    {
      "name": "Clear History",
      "request": {
        "method": "DELETE",
        "url": "http://localhost:5000/api/history"
      }
    }
  ]
}
```

## Expected Results Summary

| Test | Endpoint | Method | Expected Status | Expected Result |
|------|----------|--------|----------------|-----------------|
| API Info | `/` | GET | 200 | API information |
| Valid City | `/api/weather?city=London` | GET | 200 | Weather data |
| Invalid City | `/api/weather?city=Invalid` | GET | 404 | Error message |
| No City | `/api/weather` | GET | 400 | Error message |
| Get History | `/api/history` | GET | 200 | History list |
| Get History (empty) | `/api/history` | GET | 200 | Empty list |
| Clear History | `/api/history` | DELETE | 200 | Success message |

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure backend is running: `python app.py`
   - Check if port 5000 is available

2. **404 Errors**
   - Verify the endpoint URL is correct
   - Check for typos in the path

3. **500 Internal Server Error**
   - Check backend logs in `weather_app.log`
   - Verify API key is valid
   - Check database is accessible

4. **Timeout Errors**
   - OpenWeatherMap API might be slow
   - Check your internet connection
   - Increase timeout in API settings

---

**Happy Testing! 🧪**

