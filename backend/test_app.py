import pytest
import json
from app import app, db, SearchHistory
from unittest.mock import patch, Mock

@pytest.fixture
def client():
    """Create a test client for the Flask app"""
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

@pytest.fixture
def mock_weather_response():
    """Mock response from OpenWeatherMap API"""
    return {
        'name': 'London',
        'sys': {'country': 'GB', 'sunrise': 1639036800, 'sunset': 1639065600},
        'main': {
            'temp': 15.5,
            'feels_like': 14.2,
            'temp_min': 14.0,
            'temp_max': 17.0,
            'humidity': 72,
            'pressure': 1013
        },
        'wind': {'speed': 3.5, 'deg': 180},
        'weather': [
            {
                'main': 'Clouds',
                'description': 'scattered clouds',
                'icon': '03d'
            }
        ],
        'clouds': {'all': 40},
        'visibility': 10000,
        'timezone': 0,
        'coord': {'lat': 51.5074, 'lon': -0.1278}
    }

class TestHomeEndpoint:
    """Tests for the home endpoint"""
    
    def test_home_endpoint(self, client):
        """Test that home endpoint returns API information"""
        response = client.get('/')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'message' in data
        assert 'endpoints' in data

class TestWeatherEndpoint:
    """Tests for the weather endpoint"""
    
    def test_weather_without_city(self, client):
        """Test weather endpoint without city parameter"""
        response = client.get('/api/weather')
        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'error' in data
    
    @patch('app.requests.get')
    def test_weather_success(self, mock_get, client, mock_weather_response):
        """Test successful weather data retrieval"""
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = mock_weather_response
        mock_get.return_value = mock_response
        
        response = client.get('/api/weather?city=London')
        assert response.status_code == 200
        data = json.loads(response.data)
        
        assert data['city'] == 'London'
        assert data['country'] == 'GB'
        assert data['temperature'] == 15.5
        assert data['humidity'] == 72
        assert 'wind_speed' in data
        assert 'weather_description' in data
    
    @patch('app.requests.get')
    def test_weather_city_not_found(self, mock_get, client):
        """Test weather endpoint with non-existent city"""
        mock_response = Mock()
        mock_response.status_code = 404
        mock_get.return_value = mock_response
        
        response = client.get('/api/weather?city=InvalidCity123')
        assert response.status_code == 404
        data = json.loads(response.data)
        assert 'error' in data
    
    @patch('app.requests.get')
    def test_weather_api_error(self, mock_get, client):
        """Test weather endpoint when API returns error"""
        mock_response = Mock()
        mock_response.status_code = 500
        mock_get.return_value = mock_response
        
        response = client.get('/api/weather?city=London')
        assert response.status_code == 500
        data = json.loads(response.data)
        assert 'error' in data
    
    @patch('app.requests.get')
    def test_weather_timeout(self, mock_get, client):
        """Test weather endpoint with timeout"""
        mock_get.side_effect = Exception("Timeout")
        
        response = client.get('/api/weather?city=London')
        assert response.status_code == 500
        data = json.loads(response.data)
        assert 'error' in data

class TestHistoryEndpoint:
    """Tests for the history endpoint"""
    
    def test_get_empty_history(self, client):
        """Test getting history when database is empty"""
        response = client.get('/api/history')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['count'] == 0
        assert data['history'] == []
    
    def test_get_history_with_data(self, client):
        """Test getting history with existing data"""
        with app.app_context():
            # Add test data
            search1 = SearchHistory(
                city_name='London',
                country='GB',
                temperature=15.5,
                weather_description='cloudy',
                humidity=72,
                wind_speed=3.5
            )
            search2 = SearchHistory(
                city_name='Paris',
                country='FR',
                temperature=18.0,
                weather_description='sunny',
                humidity=65,
                wind_speed=2.0
            )
            db.session.add(search1)
            db.session.add(search2)
            db.session.commit()
        
        response = client.get('/api/history')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['count'] == 2
        assert len(data['history']) == 2
    
    def test_get_history_with_limit(self, client):
        """Test getting history with limit parameter"""
        with app.app_context():
            # Add multiple test entries
            for i in range(5):
                search = SearchHistory(
                    city_name=f'City{i}',
                    country='US',
                    temperature=20.0,
                    weather_description='clear',
                    humidity=60,
                    wind_speed=2.5
                )
                db.session.add(search)
            db.session.commit()
        
        response = client.get('/api/history?limit=3')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['count'] == 3
    
    def test_clear_history(self, client):
        """Test clearing search history"""
        with app.app_context():
            # Add test data
            search = SearchHistory(
                city_name='London',
                country='GB',
                temperature=15.5,
                weather_description='cloudy',
                humidity=72,
                wind_speed=3.5
            )
            db.session.add(search)
            db.session.commit()
        
        # Clear history
        response = client.delete('/api/history')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'message' in data
        assert data['deleted_count'] == 1
        
        # Verify history is empty
        response = client.get('/api/history')
        data = json.loads(response.data)
        assert data['count'] == 0

class TestDatabaseModel:
    """Tests for the SearchHistory model"""
    
    def test_search_history_to_dict(self, client):
        """Test converting SearchHistory model to dictionary"""
        with app.app_context():
            search = SearchHistory(
                city_name='London',
                country='GB',
                temperature=15.5,
                weather_description='cloudy',
                humidity=72,
                wind_speed=3.5
            )
            db.session.add(search)
            db.session.commit()
            
            result = search.to_dict()
            assert result['city_name'] == 'London'
            assert result['country'] == 'GB'
            assert result['temperature'] == 15.5
            assert 'timestamp' in result

