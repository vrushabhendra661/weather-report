import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RecentSearches from '../RecentSearches';

describe('RecentSearches Component', () => {
  const mockHistory = [
    {
      id: 1,
      city_name: 'London',
      country: 'GB',
      temperature: 15.5,
      weather_description: 'cloudy',
      humidity: 72,
      wind_speed: 3.5,
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      city_name: 'Paris',
      country: 'FR',
      temperature: 18.0,
      weather_description: 'sunny',
      humidity: 65,
      wind_speed: 2.0,
      timestamp: new Date().toISOString(),
    },
  ];

  it('renders "no history" message when history is empty', () => {
    render(
      <RecentSearches
        history={[]}
        onHistoryClick={() => {}}
        onClearHistory={() => {}}
      />
    );
    
    expect(screen.getByText(/no search history yet/i)).toBeInTheDocument();
  });

  it('renders recent searches header', () => {
    render(
      <RecentSearches
        history={mockHistory}
        onHistoryClick={() => {}}
        onClearHistory={() => {}}
      />
    );
    
    expect(screen.getByText(/📜 Recent Searches/i)).toBeInTheDocument();
  });

  it('renders all history items', () => {
    render(
      <RecentSearches
        history={mockHistory}
        onHistoryClick={() => {}}
        onClearHistory={() => {}}
      />
    );
    
    expect(screen.getByText(/London, GB/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris, FR/i)).toBeInTheDocument();
  });

  it('displays temperature for each history item', () => {
    render(
      <RecentSearches
        history={mockHistory}
        onHistoryClick={() => {}}
        onClearHistory={() => {}}
      />
    );
    
    expect(screen.getByText('16°C')).toBeInTheDocument(); // 15.5 rounded to 16
    expect(screen.getByText('18°C')).toBeInTheDocument();
  });

  it('calls onHistoryClick when a history card is clicked', () => {
    const mockOnHistoryClick = vi.fn();
    render(
      <RecentSearches
        history={mockHistory}
        onHistoryClick={mockOnHistoryClick}
        onClearHistory={() => {}}
      />
    );
    
    const londonCard = screen.getByText(/London, GB/i).closest('.history-card');
    fireEvent.click(londonCard);
    
    expect(mockOnHistoryClick).toHaveBeenCalledWith('London');
  });

  it('renders clear all button when history exists', () => {
    render(
      <RecentSearches
        history={mockHistory}
        onHistoryClick={() => {}}
        onClearHistory={() => {}}
      />
    );
    
    const clearButton = screen.getByRole('button', { name: /clear all/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('displays weather description for each item', () => {
    render(
      <RecentSearches
        history={mockHistory}
        onHistoryClick={() => {}}
        onClearHistory={() => {}}
      />
    );
    
    expect(screen.getByText('cloudy')).toBeInTheDocument();
    expect(screen.getByText('sunny')).toBeInTheDocument();
  });

  it('displays humidity and wind speed for each item', () => {
    render(
      <RecentSearches
        history={mockHistory}
        onHistoryClick={() => {}}
        onClearHistory={() => {}}
      />
    );
    
    // Check for humidity values
    expect(screen.getByText('72%')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    
    // Check for wind speed values
    expect(screen.getByText('3.5 m/s')).toBeInTheDocument();
    expect(screen.getByText('2 m/s')).toBeInTheDocument();
  });
});
