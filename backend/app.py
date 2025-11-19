import os
import logging
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('weather_app.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///weather_history.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# OpenWeatherMap API configuration
OPENWEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY', 'your_api_key_here')
OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

# Database Model
class SearchHistory(db.Model):
    """Model to store weather search history"""
    id = db.Column(db.Integer, primary_key=True)
    city_name = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(10))
    temperature = db.Column(db.Float)
    weather_description = db.Column(db.String(200))
    humidity = db.Column(db.Integer)
    wind_speed = db.Column(db.Float)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'city_name': self.city_name,
            'country': self.country,
            'temperature': self.temperature,
            'weather_description': self.weather_description,
            'humidity': self.humidity,
            'wind_speed': self.wind_speed,
            'timestamp': self.timestamp.isoformat()
        }

# Create database tables
with app.app_context():
    db.create_all()
    logger.info("Database tables created successfully")

@app.route('/')
def home():
    """Home endpoint"""
    return jsonify({
        'message': 'Weather Dashboard API',
        'version': '1.0',
        'endpoints': {
            'GET /api/weather?city=<city_name>': 'Fetch weather data for a city',
            'GET /api/history': 'Retrieve recent search history',
            'DELETE /api/history': 'Clear search history'
        }
    })

@app.route('/api/weather', methods=['GET'])
def get_weather():
    """
    Fetch weather data for a city from OpenWeatherMap API
    
    Query Parameters:
        city (str): Name of the city to fetch weather for
    
    Returns:
        JSON: Weather data including temperature, humidity, wind speed, etc.
    """
    try:
        city = request.args.get('city')
        
        if not city:
            logger.warning("Weather request without city parameter")
            return jsonify({'error': 'City parameter is required'}), 400
        
        logger.info(f"Fetching weather data for city: {city}")
        
        # Call OpenWeatherMap API
        params = {
            'q': city,
            'appid': OPENWEATHER_API_KEY,
            'units': 'metric'  # Use metric units (Celsius)
        }
        
        response = requests.get(OPENWEATHER_BASE_URL, params=params, timeout=10)
        
        if response.status_code == 404:
            logger.warning(f"City not found: {city}")
            return jsonify({'error': 'City not found'}), 404
        
        if response.status_code != 200:
            logger.error(f"OpenWeatherMap API error: {response.status_code}")
            return jsonify({'error': 'Failed to fetch weather data'}), response.status_code
        
        data = response.json()
        
        # Extract relevant weather information
        weather_data = {
            'city': data['name'],
            'country': data['sys']['country'],
            'temperature': round(data['main']['temp'], 1),
            'feels_like': round(data['main']['feels_like'], 1),
            'temp_min': round(data['main']['temp_min'], 1),
            'temp_max': round(data['main']['temp_max'], 1),
            'humidity': data['main']['humidity'],
            'pressure': data['main']['pressure'],
            'wind_speed': data['wind']['speed'],
            'wind_deg': data['wind'].get('deg', 0),
            'weather': data['weather'][0]['main'],
            'weather_description': data['weather'][0]['description'],
            'weather_icon': data['weather'][0]['icon'],
            'clouds': data['clouds']['all'],
            'visibility': data.get('visibility', 0) / 1000,  # Convert to km
            'sunrise': datetime.fromtimestamp(data['sys']['sunrise']).strftime('%H:%M'),
            'sunset': datetime.fromtimestamp(data['sys']['sunset']).strftime('%H:%M'),
            'timezone': data['timezone'],
            'lat': data['coord']['lat'],
            'lon': data['coord']['lon']
        }
        
        # Save to search history
        try:
            search_entry = SearchHistory(
                city_name=weather_data['city'],
                country=weather_data['country'],
                temperature=weather_data['temperature'],
                weather_description=weather_data['weather_description'],
                humidity=weather_data['humidity'],
                wind_speed=weather_data['wind_speed']
            )
            db.session.add(search_entry)
            db.session.commit()
            logger.info(f"Saved search history for {city}")
        except Exception as db_error:
            logger.error(f"Database error: {str(db_error)}")
            db.session.rollback()
        
        return jsonify(weather_data), 200
        
    except requests.exceptions.Timeout:
        logger.error("Request timeout while fetching weather data")
        return jsonify({'error': 'Request timeout. Please try again.'}), 504
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error: {str(e)}")
        return jsonify({'error': 'Failed to fetch weather data'}), 500
    except Exception as e:
        logger.error(f"Unexpected error in get_weather: {str(e)}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    """
    Retrieve recent search history
    
    Query Parameters:
        limit (int): Maximum number of records to return (default: 10)
    
    Returns:
        JSON: List of recent searches with weather data
    """
    try:
        limit = request.args.get('limit', 10, type=int)
        
        logger.info(f"Fetching search history (limit: {limit})")
        
        # Get recent searches, ordered by timestamp (most recent first)
        searches = SearchHistory.query.order_by(
            SearchHistory.timestamp.desc()
        ).limit(limit).all()
        
        history = [search.to_dict() for search in searches]
        
        return jsonify({
            'count': len(history),
            'history': history
        }), 200
        
    except Exception as e:
        logger.error(f"Error fetching history: {str(e)}")
        return jsonify({'error': 'Failed to fetch search history'}), 500

@app.route('/api/history', methods=['DELETE'])
def clear_history():
    """
    Clear all search history
    
    Returns:
        JSON: Success message
    """
    try:
        logger.info("Clearing search history")
        
        # Delete all records
        num_deleted = db.session.query(SearchHistory).delete()
        db.session.commit()
        
        logger.info(f"Deleted {num_deleted} records from history")
        
        return jsonify({
            'message': 'Search history cleared successfully',
            'deleted_count': num_deleted
        }), 200
        
    except Exception as e:
        logger.error(f"Error clearing history: {str(e)}")
        db.session.rollback()
        return jsonify({'error': 'Failed to clear search history'}), 500

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    logger.error(f"Internal server error: {str(error)}")
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

