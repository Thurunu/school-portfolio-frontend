import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Gallery from '../../src/Pages/GalleryPage';
import '@testing-library/jest-dom';


// Mock Axios
vi.mock('axios');

const mockImages = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  title: `Image ${i + 1}`,
  desc: `This is a sample description for image ${i + 1}`,
}));

describe('Gallery Component', () => {
  let handleGalleryPopup;

  beforeEach(() => {
    handleGalleryPopup = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty state when no data is fetched', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<Gallery handleGalleryPopup={handleGalleryPopup} />);

    await waitFor(() => {
      expect(screen.queryByText(/Image/i)).not.toBeInTheDocument();
    });
  });

  it('renders up to 5 images initially', async () => {
    axios.get.mockResolvedValueOnce({ data: mockImages });

    render(<Gallery handleGalleryPopup={handleGalleryPopup} />);

    await waitFor(() => {
      expect(screen.getAllByText(/Image/i)).toHaveLength(5);
    });
  });

  it('renders "Show More" button when more than 5 images', async () => {
    axios.get.mockResolvedValueOnce({ data: mockImages });

    render(<Gallery handleGalleryPopup={handleGalleryPopup} />);

    await waitFor(() => {
      expect(screen.getByText('Show More')).toBeInTheDocument();
    });
  });

  it('toggles to show all images when "Show More" is clicked', async () => {
    axios.get.mockResolvedValueOnce({ data: mockImages });

    render(<Gallery handleGalleryPopup={handleGalleryPopup} />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Show More'));
    });

    await waitFor(() => {
      expect(screen.getAllByText(/Image/i)).toHaveLength(mockImages.length);
    });
  });

  it('toggles back to show 5 images when "Show Less" is clicked', async () => {
    axios.get.mockResolvedValueOnce({ data: mockImages });

    render(<Gallery handleGalleryPopup={handleGalleryPopup} />);

    await waitFor(() => fireEvent.click(screen.getByText('Show More')));
    await waitFor(() => fireEvent.click(screen.getByText('Show Less')));

    expect(screen.getAllByText(/Image/i)).toHaveLength(5);
  });

  it('calls handleGalleryPopup when an image card is clicked', async () => {
    axios.get.mockResolvedValueOnce({ data: mockImages });

    render(<Gallery handleGalleryPopup={handleGalleryPopup} />);

    await waitFor(() => {
      const imageCard = screen.getByText(/Image 1/i).closest('div');
      fireEvent.click(imageCard);
    });

    expect(handleGalleryPopup).toHaveBeenCalledWith(1);
  });

  it('handles API error gracefully', async () => {
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
    axios.get.mockRejectedValueOnce(new Error('Network error'));

    render(<Gallery handleGalleryPopup={handleGalleryPopup} />);

    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Error fetching gallery images:',
        expect.any(Error)
      );
    });

    consoleErrorMock.mockRestore();
  });
});
