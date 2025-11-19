import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  it('renders search input and button', () => {
    render(<SearchBar onSearch={() => {}} loading={false} />);
    
    const input = screen.getByPlaceholderText(/enter city name/i);
    const button = screen.getByRole('button', { name: /search/i });
    
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SearchBar onSearch={() => {}} loading={false} />);
    
    const input = screen.getByPlaceholderText(/enter city name/i);
    fireEvent.change(input, { target: { value: 'London' } });
    
    expect(input.value).toBe('London');
  });

  it('calls onSearch with city name when form is submitted', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} loading={false} />);
    
    const input = screen.getByPlaceholderText(/enter city name/i);
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: 'Paris' } });
    fireEvent.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledWith('Paris');
  });

  it('does not call onSearch with empty input', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} loading={false} />);
    
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('disables input and button when loading', () => {
    render(<SearchBar onSearch={() => {}} loading={true} />);
    
    const input = screen.getByPlaceholderText(/enter city name/i);
    const button = screen.getByRole('button', { name: /searching/i });
    
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('shows clear button when input has value', () => {
    render(<SearchBar onSearch={() => {}} loading={false} />);
    
    const input = screen.getByPlaceholderText(/enter city name/i);
    fireEvent.change(input, { target: { value: 'Tokyo' } });
    
    const clearButton = screen.getByLabelText(/clear search/i);
    expect(clearButton).toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    render(<SearchBar onSearch={() => {}} loading={false} />);
    
    const input = screen.getByPlaceholderText(/enter city name/i);
    fireEvent.change(input, { target: { value: 'Tokyo' } });
    
    const clearButton = screen.getByLabelText(/clear search/i);
    fireEvent.click(clearButton);
    
    expect(input.value).toBe('');
  });

  it('trims whitespace from input before calling onSearch', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} loading={false} />);
    
    const input = screen.getByPlaceholderText(/enter city name/i);
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: '  New York  ' } });
    fireEvent.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledWith('New York');
  });
});

