import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WeatherDetails from '../WeatherDetails';

describe('WeatherDetails Component', () => {
  const mockWeatherData = {
    city: 'London',
    country: 'GB',
    temperature: 15.5,
    feels_like: 14.2,
    temp_min: 14.0,
    temp_max: 17.0,
    humidity: 72,
    pressure: 1013,
    wind_speed: 3.5,
    wind_deg: 180,
    weather: 'Clouds',
    weather_description: 'scattered clouds',
    weather_icon: '03d',
    clouds: 40,
    visibility: 10.0,
    sunrise: '06:45',
    sunset: '16:30',
    timezone: 0,
    lat: 51.5074,
    lon: -0.1278,
  };

  it('renders nothing when weather data is null', () => {
    const { container } = render(<WeatherDetails weather={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders city name and country', () => {
    render(<WeatherDetails weather={mockWeatherData} />);
    expect(screen.getByText(/London, GB/i)).toBeInTheDocument();
  });

  it('displays temperature correctly', () => {
    render(<WeatherDetails weather={mockWeatherData} />);
    // Temperature is rounded, so 15.5 becomes 16
    expect(screen.getByText('16')).toBeInTheDocument();
  });

  it('displays weather description', () => {
    render(<WeatherDetails weather={mockWeatherData} />);
    expect(screen.getByText(/scattered clouds/i)).toBeInTheDocument();
  });

  it('displays feels like temperature', () => {
    render(<WeatherDetails weather={mockWeatherData} />);
    expect(screen.getByText(/feels like 14°c/i)).toBeInTheDocument();
  });

  it('displays humidity', () => {
    render(<WeatherDetails weather={mockWeatherData} />);
    expect(screen.getByText('72%')).toBeInTheDocument();
  });

  it('displays wind speed', () => {
    render(<WeatherDetails weather={mockWeatherData} />);
    expect(screen.getByText('3.5 m/s')).toBeInTheDocument();
  });

  it('displays pressure', () => {
    render(<WeatherDetails weather={mockWeatherData} />);
    expect(screen.getByText('1013 hPa')).toBeInTheDocument();
  });

  it('displays sunrise and sunset times', () => {
    render(<WeatherDetails weather={mockWeatherData} />);
    expect(screen.getByText('06:45')).toBeInTheDocument();
    expect(screen.getByText('16:30')).toBeInTheDocument();
  });

  it('displays coordinates', () => {
    render(<WeatherDetails weather={mockWeatherData} />);
    expect(screen.getByText(/51.51°, -0.13°/i)).toBeInTheDocument();
  });

  it('displays min and max temperatures', () => {
    render(<WeatherDetails weather={mockWeatherData} />);
    expect(screen.getByText(/14° \/ 17°/i)).toBeInTheDocument();
  });

  it('displays cloudiness percentage', () => {
    render(<WeatherDetails weather={mockWeatherData} />);
    expect(screen.getByText('40%')).toBeInTheDocument();
  });

  it('displays visibility', () => {
    render(<WeatherDetails weather={mockWeatherData} />);
    expect(screen.getByText('10.0 km')).toBeInTheDocument();
  });
});

