import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import LibraryForm from '../../src/components/AdminComponents/LibraryForm';
import '@testing-library/jest-dom';


// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

// Mock GeneralForm to test the LibraryForm logic
vi.mock('./GeneralForm', () => ({
  default: ({ title, fields, onSubmit, submitButtonText, showDateTime, showImageUpload }) => (
    <div data-testid="general-form">
      <h2>{title}</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        // Simulate form data that would be passed from GeneralForm
        const formData = {
          'Category': 'Test Category',
          'Category ID': 'test-123'
        };
        onSubmit(formData);
      }}>
        {fields.map(field => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              data-testid={`input-${field.name}`}
            />
          </div>
        ))}
        <button type="submit" data-testid="submit-button">
          {submitButtonText}
        </button>
        <div data-testid="show-datetime">{showDateTime.toString()}</div>
        <div data-testid="show-image-upload">{showImageUpload.toString()}</div>
      </form>
    </div>
  )
}));

// Mock console methods
const mockConsoleLog = vi.fn();
const mockConsoleError = vi.fn();
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

describe('LibraryForm - Functional Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedAxios.post.mockClear();
    console.log = mockConsoleLog;
    console.error = mockConsoleError;
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  describe('Form Configuration', () => {
    it('passes correct props to GeneralForm', () => {
      render(<LibraryForm />);

      expect(screen.getByText('Create Category')).toBeInTheDocument();
      expect(screen.getByText('Create Category', { selector: 'button' })).toBeInTheDocument();
      expect(screen.getByTestId('show-datetime')).toHaveTextContent('false');
      expect(screen.getByTestId('show-image-upload')).toHaveTextContent('false');
    });

    it('configures form fields correctly', () => {
      render(<LibraryForm />);

      // Check Category field
      expect(screen.getByLabelText('Category')).toBeInTheDocument();
      expect(screen.getByTestId('input-Category')).toHaveAttribute('type', 'text');
      expect(screen.getByTestId('input-Category')).toHaveAttribute('placeholder', 'Enter a category');
      expect(screen.getByTestId('input-Category')).toBeRequired();

      // Check Category ID field
      expect(screen.getByLabelText('Category ID')).toBeInTheDocument();
      expect(screen.getByTestId('input-Category ID')).toHaveAttribute('type', 'text');
      expect(screen.getByTestId('input-Category ID')).toHaveAttribute('placeholder', 'Enter category ID');
      expect(screen.getByTestId('input-Category ID')).toBeRequired();
    });
  });

  describe('Form Submission and Data Mapping', () => {
    it('successfully submits form with correct data mapping', async () => {
      const user = userEvent.setup();
      mockedAxios.post.mockResolvedValue({
        data: { success: true, id: 1 }
      });

      render(<LibraryForm />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      // Verify console logging
      await waitFor(() => {
        expect(mockConsoleLog).toHaveBeenCalledWith('Library Form Data:', {
          'Category': 'Test Category',
          'Category ID': 'test-123'
        });
      });

      // Verify data mapping logs
      expect(mockConsoleLog).toHaveBeenCalledWith('Mapping correct or not: ', true);

      // Verify API call
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/api/library/new-category',
        {
          category: 'Test Category',
          category_id: 'test-123'
        }
      );

      // Verify success logging
      await waitFor(() => {
        expect(mockConsoleLog).toHaveBeenCalledWith('Success:', { success: true, id: 1 });
      });
    });

    it('handles API success response correctly', async () => {
      const user = userEvent.setup();
      const mockResponse = {
        data: {
          success: true,
          message: 'Category created successfully',
          categoryId: 123
        }
      };
      mockedAxios.post.mockResolvedValue(mockResponse);

      render(<LibraryForm />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockConsoleLog).toHaveBeenCalledWith('Success:', mockResponse.data);
      });

      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });

    it('handles API error response correctly', async () => {
      const user = userEvent.setup();
      const mockError = new Error('Network Error');
      mockError.response = {
        status: 500,
        data: { message: 'Internal Server Error' }
      };
      mockedAxios.post.mockRejectedValue(mockError);

      render(<LibraryForm />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockConsoleError).toHaveBeenCalledWith('Error submitting form:', mockError);
      });

      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('Data Mapping Logic', () => {
    it('maps frontend keys to backend keys correctly', async () => {
      const user = userEvent.setup();
      mockedAxios.post.mockResolvedValue({ data: { success: true } });

      render(<LibraryForm />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3000/api/library/new-category',
          expect.objectContaining({
            category: 'Test Category',        // Frontend 'Category' -> Backend 'category'
            category_id: 'test-123'          // Frontend 'Category ID' -> Backend 'category_id'
          })
        );
      });
    });

    it('only includes fields that exist in form data', async () => {
      const user = userEvent.setup();
      mockedAxios.post.mockResolvedValue({ data: { success: true } });

      // Mock GeneralForm to return partial data
      vi.doMock('./GeneralForm', () => ({
        default: ({ onSubmit }) => (
          <form onSubmit={(e) => {
            e.preventDefault();
            // Only include Category, not Category ID
            onSubmit({ 'Category': 'Test Category' });
          }}>
            <button type="submit" data-testid="submit-button">Submit</button>
          </form>
        )
      }));

      const { rerender } = render(<LibraryForm />);
      rerender(<LibraryForm />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3000/api/library/new-category',
          { category: 'Test Category' } // Should not include category_id
        );
      });
    });

    it('logs mapping verification for each field', async () => {
      const user = userEvent.setup();
      mockedAxios.post.mockResolvedValue({ data: { success: true } });

      render(<LibraryForm />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        // Should log mapping verification for both fields
        expect(mockConsoleLog).toHaveBeenCalledWith('Mapping correct or not: ', true);
        expect(mockConsoleLog).toHaveBeenCalledTimes(4); // Form data + 2 mapping logs + success log
      });
    });
  });

  describe('API Integration', () => {
    it('uses correct API endpoint', async () => {
      const user = userEvent.setup();
      mockedAxios.post.mockResolvedValue({ data: { success: true } });

      render(<LibraryForm />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3000/api/library/new-category',
          expect.any(Object)
        );
      });
    });

    it('handles network timeout error', async () => {
      const user = userEvent.setup();
      const timeoutError = new Error('timeout of 5000ms exceeded');
      timeoutError.code = 'ECONNABORTED';
      mockedAxios.post.mockRejectedValue(timeoutError);

      render(<LibraryForm />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockConsoleError).toHaveBeenCalledWith('Error submitting form:', timeoutError);
      });
    });

    it('handles 400 bad request error', async () => {
      const user = userEvent.setup();
      const badRequestError = new Error('Request failed with status code 400');
      badRequestError.response = {
        status: 400,
        data: { error: 'Invalid category data' }
      };
      mockedAxios.post.mockRejectedValue(badRequestError);

      render(<LibraryForm />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockConsoleError).toHaveBeenCalledWith('Error submitting form:', badRequestError);
      });
    });
  });

  describe('Form Data Processing', () => {
    it('processes empty payload when no matching fields', async () => {
      const user = userEvent.setup();
      mockedAxios.post.mockResolvedValue({ data: { success: true } });

      // Mock GeneralForm to return data with no matching keys
      vi.doMock('./GeneralForm', () => ({
        default: ({ onSubmit }) => (
          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ 'UnknownField': 'value' });
          }}>
            <button type="submit" data-testid="submit-button">Submit</button>
          </form>
        )
      }));

      const { rerender } = render(<LibraryForm />);
      rerender(<LibraryForm />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3000/api/library/new-category',
          {} // Empty payload
        );
      });
    });

    it('handles form data with extra fields', async () => {
      const user = userEvent.setup();
      mockedAxios.post.mockResolvedValue({ data: { success: true } });

      // Mock GeneralForm to return data with extra fields
      vi.doMock('./GeneralForm', () => ({
        default: ({ onSubmit }) => (
          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              'Category': 'Test Category',
              'Category ID': 'test-123',
              'ExtraField': 'should not be included'
            });
          }}>
            <button type="submit" data-testid="submit-button">Submit</button>
          </form>
        )
      }));

      const { rerender } = render(<LibraryForm />);
      rerender(<LibraryForm />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3000/api/library/new-category',
          {
            category: 'Test Category',
            category_id: 'test-123'
            // ExtraField should not be included
          }
        );
      });
    });
  });

  describe('Async Behavior', () => {
    it('handles concurrent form submissions', async () => {
      const user = userEvent.setup();
      mockedAxios.post.mockResolvedValue({ data: { success: true } });

      render(<LibraryForm />);

      const submitButton = screen.getByTestId('submit-button');
      
      // Trigger multiple submissions
      const promises = [
        user.click(submitButton),
        user.click(submitButton),
        user.click(submitButton)
      ];

      await Promise.all(promises);

      // Should handle all submissions
      expect(mockedAxios.post).toHaveBeenCalledTimes(3);
    });

    it('continues processing after API error', async () => {
      const user = userEvent.setup();
      mockedAxios.post
        .mockRejectedValueOnce(new Error('First error'))
        .mockResolvedValueOnce({ data: { success: true } });

      render(<LibraryForm />);

      const submitButton = screen.getByTestId('submit-button');
      
      // First submission - should fail
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(mockConsoleError).toHaveBeenCalledWith('Error submitting form:', expect.any(Error));
      });

      // Second submission - should succeed
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(mockConsoleLog).toHaveBeenCalledWith('Success:', { success: true });
      });

      expect(mockedAxios.post).toHaveBeenCalledTimes(2);
    });
  });
});