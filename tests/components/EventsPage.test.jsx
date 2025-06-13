import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Events from '../../src/Pages/EventsPage.jsx';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('Events Component', () => {
  const mockEventsData = [
    {
      _id: '1',
      title: 'Science Fair',
      date: '2024-06-15T10:00:00.000Z',
      img: 'https://example.com/science-fair.jpg',
      desc: 'Join us for an exciting science fair where students will showcase their innovative projects and experiments. This event promises to be educational and entertaining for all ages.'
    },
    {
      _id: '2',
      title: 'Sports Day',
      date: '2024-06-20T08:30:00.000Z',
      img: 'https://example.com/sports-day.jpg',
      desc: 'Annual sports day with various athletic competitions and fun activities.'
    },
    {
      _id: '3',
      title: 'Art Exhibition',
      date: '2024-06-10T14:00:00.000Z',
      img: 'https://example.com/art-exhibition.jpg',
      desc: 'Discover amazing artwork created by our talented students in this special exhibition.'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Initial Rendering', () => {
    it('should render the component with header', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [] });
      
      render(<Events />);
      
      expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
    });

    it('should render loading state initially', () => {
      mockedAxios.get.mockImplementationOnce(() => new Promise(() => {}));
      
      render(<Events />);
      
      expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
      expect(screen.queryByText('Science Fair')).not.toBeInTheDocument();
    });
  });

  describe('API Integration', () => {
    it('should fetch events data on component mount', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockEventsData });
      
      render(<Events />);
      
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/events');
      });
    });

    it('should handle API error gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
      
      render(<Events />);
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error fetching events data:', expect.any(Error));
      });
      
      consoleSpy.mockRestore();
    });
  });

  describe('Events Display', () => {
    it('should display events after successful API call', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockEventsData });
      
      render(<Events />);
      
      await waitFor(() => {
        expect(screen.getByText('Science Fair')).toBeInTheDocument();
        expect(screen.getByText('Sports Day')).toBeInTheDocument();
        expect(screen.getByText('Art Exhibition')).toBeInTheDocument();
      });
    });

    it('should display event images with correct attributes', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockEventsData[0]] });
      
      render(<Events />);
      
      await waitFor(() => {
        const image = screen.getByAltText('Science Fair');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://example.com/science-fair.jpg');
      });
    });

    it('should display event descriptions truncated to 20 words', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockEventsData[0]] });
      
      render(<Events />);
      
      await waitFor(() => {
        const description = screen.getByText(/Join us for an exciting science fair where students will showcase their innovative projects and experiments. This event promises to be educational and/);
        expect(description).toBeInTheDocument();
        expect(description.textContent).toContain('...');
      });
    });

    it('should not truncate short descriptions', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockEventsData[1]] });
      
      render(<Events />);
      
      await waitFor(() => {
        const description = screen.getByText('Annual sports day with various athletic competitions and fun activities.');
        expect(description).toBeInTheDocument();
        expect(description.textContent).not.toContain('...');
      });
    });
  });

  describe('Date and Time Formatting', () => {
    it('should display formatted date correctly', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockEventsData[0]] });
      
      render(<Events />);
      
      await waitFor(() => {
        expect(screen.getByText('SATURDAY, JUN 15, 2024')).toBeInTheDocument();
      });
    });

    it('should display formatted time correctly', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockEventsData[0]] });
      
      render(<Events />);
      
      await waitFor(() => {
        expect(screen.getByText('10:00 AM')).toBeInTheDocument();
      });
    });

    it('should format different times correctly', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockEventsData[1]] });
      
      render(<Events />);
      
      await waitFor(() => {
        expect(screen.getByText('8:30 AM')).toBeInTheDocument();
      });
    });
  });

  describe('Events Sorting', () => {
    it('should sort events by date in ascending order', async () => {
      const unsortedEvents = [mockEventsData[1], mockEventsData[2], mockEventsData[0]]; // Sports Day, Art Exhibition, Science Fair
      mockedAxios.get.mockResolvedValueOnce({ data: unsortedEvents });
      
      render(<Events />);
      
      await waitFor(() => {
        const eventTitles = screen.getAllByRole('heading', { level: 3 });
        expect(eventTitles[0]).toHaveTextContent('ART EXHIBITION'); // June 10
        expect(eventTitles[1]).toHaveTextContent('SCIENCE FAIR'); // June 15  
        expect(eventTitles[2]).toHaveTextContent('SPORTS DAY'); // June 20
      });
    });
  });

  describe('Event Card Structure', () => {
    it('should render event cards with correct structure', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockEventsData[0]] });
      
      render(<Events />);
      
      await waitFor(() => {
        const eventCard = screen.getByText('Science Fair').closest('div');
        expect(eventCard).toHaveClass('hover:bg-secondary', 'p-5', 'rounded-lg');
      });
    });

    it('should display event titles in uppercase', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockEventsData[0]] });
      
      render(<Events />);
      
      await waitFor(() => {
        const title = screen.getByText('SCIENCE FAIR');
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass('uppercase');
      });
    });
  });

  describe('Grid Layout', () => {
    it('should render events in grid layout', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockEventsData });
      
      render(<Events />);
      
      await waitFor(() => {
        const gridContainer = screen.getByText('Science Fair').closest('div').parentElement;
        expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty events data', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [] });
      
      render(<Events />);
      
      await waitFor(() => {
        expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
        expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
      });
    });

    it('should handle events with missing fields', async () => {
      const incompleteEvent = [
        {
          _id: '1',
          title: '',
          date: '2024-06-15T10:00:00.000Z',
          img: '',
          desc: ''
        }
      ];
      mockedAxios.get.mockResolvedValueOnce({ data: incompleteEvent });
      
      render(<Events />);
      
      await waitFor(() => {
        expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
      });
    });

    it('should handle invalid date formats gracefully', async () => {
      const eventWithInvalidDate = [
        {
          _id: '1',
          title: 'Test Event',
          date: 'invalid-date',
          img: 'test.jpg',
          desc: 'Test description'
        }
      ];
      mockedAxios.get.mockResolvedValueOnce({ data: eventWithInvalidDate });
      
      render(<Events />);
      
      await waitFor(() => {
        expect(screen.getByText('TEST EVENT')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper image alt text', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockEventsData[0]] });
      
      render(<Events />);
      
      await waitFor(() => {
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('alt', 'Science Fair');
      });
    });

    it('should have proper heading hierarchy', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockEventsData[0]] });
      
      render(<Events />);
      
      await waitFor(() => {
        const mainHeading = screen.getByRole('heading', { level: 1 });
        const eventHeading = screen.getByRole('heading', { level: 3 });
        expect(mainHeading).toHaveTextContent('Upcoming Events');
        expect(eventHeading).toHaveTextContent('SCIENCE FAIR');
      });
    });
  });
});