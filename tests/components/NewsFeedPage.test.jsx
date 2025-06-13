import { it, expect, describe, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import NewsFeed from '../../src/Pages/NewsFeedPage';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

// Mock the image import
vi.mock('../assets/common/no_image.png', () => ({
  default: 'mocked-image-path'
}));

// Mock the constants
vi.mock('../components/Constants/text', () => ({
  TEXTS: {
    SEEMORE_BTN: 'See More'
  }
}));

describe('NewsFeed Component', () => {
  const mockHandleNewsPopup = vi.fn();
  
  const mockNewsData = [
    {
      _id: '1',
      title: 'First News Item',
      date: '2024-01-01',
      img: 'https://example.com/image1.jpg',
      desc: 'This is the first news item description'
    },
    {
      _id: '2',
      title: 'Second News Item',
      date: '2024-01-02',
      img: 'https://example.com/image2.jpg',
      desc: 'This is the second news item description'
    },
    {
      _id: '3',
      title: 'Third News Item',
      date: '2024-01-03',
      img: 'https://example.com/image3.jpg',
      desc: 'This is the third news item description'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Initial Rendering', () => {
    it('should render the component with header section', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [] });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      expect(screen.getByText('Latest News')).toBeInTheDocument();
      expect(screen.getByText('Our Best Moments')).toBeInTheDocument();
    });

    it('should render loading state initially', () => {
      mockedAxios.get.mockImplementationOnce(() => new Promise(() => {})); // Never resolves
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      expect(screen.getByText('Latest News')).toBeInTheDocument();
      // Component should render without news items while loading
      expect(screen.queryByText('First News Item')).not.toBeInTheDocument();
    });
  });

  describe('API Integration', () => {
    it('should fetch news data on component mount', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockNewsData });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/news-feed');
      });
    });

    it('should handle API error gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error occured while fetching news data: ', expect.any(Error));
      });
      
      consoleSpy.mockRestore();
    });
  });

  describe('News Items Display', () => {
    it('should display first 2 news items by default', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockNewsData });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        expect(screen.getByText('First News Item')).toBeInTheDocument();
        expect(screen.getByText('Second News Item')).toBeInTheDocument();
        expect(screen.queryByText('Third News Item')).not.toBeInTheDocument();
      });
    });

    it('should display news item details correctly', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockNewsData[0]] });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        expect(screen.getByText('First News Item')).toBeInTheDocument();
        expect(screen.getByText('Date: 2024-01-01')).toBeInTheDocument();
        expect(screen.getByText('Read more...')).toBeInTheDocument();
      });
    });

    it('should display images with correct attributes', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockNewsData[0]] });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        const image = screen.getByAltText('First News Item');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');
      });
    });

    it('should use fallback image when img is not provided', async () => {
      const newsWithoutImg = [{ ...mockNewsData[0], img: null }];
      mockedAxios.get.mockResolvedValueOnce({ data: newsWithoutImg });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        const image = screen.getByAltText('First News Item');
        expect(image).toHaveAttribute('src', 'mocked-image-path');
      });
    });
  });

  describe('Show More/Less Functionality', () => {
    it('should show "See More" button when there are more than 2 news items', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockNewsData });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        expect(screen.getByText('See More')).toBeInTheDocument();
      });
    });

    it('should not show "See More" button when there are 2 or fewer news items', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockNewsData.slice(0, 2) });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        expect(screen.queryByText('See More')).not.toBeInTheDocument();
      });
    });

    it('should display all news items when "See More" is clicked', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockNewsData });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        expect(screen.getByText('See More')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText('See More'));
      
      expect(screen.getByText('First News Item')).toBeInTheDocument();
      expect(screen.getByText('Second News Item')).toBeInTheDocument();
      expect(screen.getByText('Third News Item')).toBeInTheDocument();
    });

    it('should show "Show Less" button after clicking "See More"', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockNewsData });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        fireEvent.click(screen.getByText('See More'));
      });
      
      expect(screen.getByText('Show Less')).toBeInTheDocument();
      expect(screen.queryByText('See More')).not.toBeInTheDocument();
    });

    it('should return to showing only 2 items when "Show Less" is clicked', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockNewsData });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        fireEvent.click(screen.getByText('See More'));
      });
      
      fireEvent.click(screen.getByText('Show Less'));
      
      expect(screen.getByText('First News Item')).toBeInTheDocument();
      expect(screen.getByText('Second News Item')).toBeInTheDocument();
      expect(screen.queryByText('Third News Item')).not.toBeInTheDocument();
      expect(screen.getByText('See More')).toBeInTheDocument();
    });
  });

  describe('News Popup Functionality', () => {
    it('should call handleNewsPopup with correct ID when "Read more" is clicked', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockNewsData[0]] });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        fireEvent.click(screen.getByText('Read more...'));
      });
      
      expect(mockHandleNewsPopup).toHaveBeenCalledWith('1');
      expect(mockHandleNewsPopup).toHaveBeenCalledTimes(1);
    });

    it('should call handleNewsPopup for multiple news items correctly', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockNewsData.slice(0, 2) });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        const readMoreButtons = screen.getAllByText('Read more...');
        fireEvent.click(readMoreButtons[0]);
        fireEvent.click(readMoreButtons[1]);
      });
      
      expect(mockHandleNewsPopup).toHaveBeenCalledWith('1');
      expect(mockHandleNewsPopup).toHaveBeenCalledWith('2');
      expect(mockHandleNewsPopup).toHaveBeenCalledTimes(2);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty news data array', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [] });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        expect(screen.getByText('Latest News')).toBeInTheDocument();
        expect(screen.queryByText('Read more...')).not.toBeInTheDocument();
        expect(screen.queryByText('See More')).not.toBeInTheDocument();
      });
    });

    it('should handle news items without required fields', async () => {
      const incompleteNewsData = [
        {
          _id: '1',
          title: '',
          date: '',
          img: '',
          desc: ''
        }
      ];
      mockedAxios.get.mockResolvedValueOnce({ data: incompleteNewsData });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        expect(screen.getByText('Date:')).toBeInTheDocument(); // Should still render date label
        expect(screen.getByText('Read more...')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper button types', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockNewsData });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        buttons.forEach(button => {
          expect(button).toHaveAttribute('type', 'button');
        });
      });
    });

    it('should have proper alt text for images', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockNewsData[0]] });
      
      render(<NewsFeed handleNewsPopup={mockHandleNewsPopup} />);
      
      await waitFor(() => {
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('alt', 'First News Item');
      });
    });
  });
});