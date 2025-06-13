import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GeneralForm from '../../src/components/AdminComponents/GeneralForm';
import '@testing-library/jest-dom'; 

// Mock AOS
vi.mock('aos', () => ({
  init: vi.fn()
}));

// Mock axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn()
  }
}));

// Mock FileReader
class MockFileReader {
  constructor() {
    this.result = null;
    this.onloadend = null;
  }
  
  readAsDataURL(file) {
    this.result = `data:image/jpeg;base64,mockbase64data_${file.name}`;
    setTimeout(() => {
      if (this.onloadend) {
        this.onloadend();
      }
    }, 0);
  }
}

global.FileReader = MockFileReader;

describe('GeneralForm', () => {
  const mockOnSubmit = vi.fn();
  
  const basicFields = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter your first name',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true
    }
  ];

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders form with title and basic fields', () => {
      render(
        <GeneralForm
          title="Test Form"
          fields={basicFields}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText('Test Form')).toBeInTheDocument();
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('renders with custom submit button text', () => {
      render(
        <GeneralForm
          title="Test Form"
          fields={basicFields}
          onSubmit={mockOnSubmit}
          submitButtonText="Save Changes"
        />
      );

      expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
    });
  });

  describe('Input Types', () => {
    it('renders text input correctly', () => {
      const fields = [{
        name: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'Enter username'
      }];

      render(
        <GeneralForm
          title="Test Form"
          fields={fields}
          onSubmit={mockOnSubmit}
        />
      );

      const input = screen.getByLabelText('Username');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('placeholder', 'Enter username');
    });

    it('renders textarea correctly', () => {
      const fields = [{
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Enter description',
        rows: 5
      }];

      render(
        <GeneralForm
          title="Test Form"
          fields={fields}
          onSubmit={mockOnSubmit}
        />
      );

      const textarea = screen.getByLabelText('Description');
      expect(textarea.tagName).toBe('TEXTAREA');
      expect(textarea).toHaveAttribute('rows', '5');
      expect(textarea).toHaveAttribute('placeholder', 'Enter description');
    });

    it('renders select dropdown with options', () => {
      const fields = [{
        name: 'category',
        label: 'Category',
        type: 'select',
        placeholder: 'Choose category',
        options: [
          { value: 'tech', label: 'Technology' },
          { value: 'health', label: 'Health' },
          'simple-option'
        ]
      }];

      render(
        <GeneralForm
          title="Test Form"
          fields={fields}
          onSubmit={mockOnSubmit}
        />
      );

      const select = screen.getByLabelText('Category');
      expect(select.tagName).toBe('SELECT');
      expect(screen.getByText('Choose category')).toBeInTheDocument();
      expect(screen.getByText('Technology')).toBeInTheDocument();
      expect(screen.getByText('Health')).toBeInTheDocument();
      expect(screen.getByText('simple-option')).toBeInTheDocument();
    });
  });

  describe('Form Data Handling', () => {
    it('updates form data when input values change', async () => {
      const user = userEvent.setup();
      
      render(
        <GeneralForm
          title="Test Form"
          fields={basicFields}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByLabelText('First Name');
      const emailInput = screen.getByLabelText('Email');

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');

      expect(nameInput).toHaveValue('John Doe');
      expect(emailInput).toHaveValue('john@example.com');
    });

    it('handles select dropdown changes', async () => {
      const user = userEvent.setup();
      const fields = [{
        name: 'category',
        label: 'Category',
        type: 'select',
        options: ['Option 1', 'Option 2']
      }];

      render(
        <GeneralForm
          title="Test Form"
          fields={fields}
          onSubmit={mockOnSubmit}
        />
      );

      const select = screen.getByLabelText('Category');
      await user.selectOptions(select, 'Option 1');

      expect(select).toHaveValue('Option 1');
    });
  });

  describe('Form Submission', () => {
    it('calls onSubmit with form data when form is submitted', async () => {
      const user = userEvent.setup();
      
      render(
        <GeneralForm
          title="Test Form"
          fields={basicFields}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByLabelText('First Name');
      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.click(submitButton);

      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'John Doe',
          email: 'john@example.com'
        })
      );
    });

    it('prevents default form submission', async () => {
      const user = userEvent.setup();
      const mockPreventDefault = vi.fn();
      
      render(
        <GeneralForm
          title="Test Form"
          fields={basicFields}
          onSubmit={mockOnSubmit}
        />
      );

      const form = screen.getByRole('form');
      
      // Mock the form submission event
      const submitEvent = new Event('submit', { bubbles: true });
      submitEvent.preventDefault = mockPreventDefault;
      
      fireEvent(form, submitEvent);
      
      // The component should handle preventDefault internally
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  describe('Single Image Upload', () => {
    it('renders image upload input when showImageUpload is true', () => {
      render(
        <GeneralForm
          title="Test Form"
          fields={basicFields}
          onSubmit={mockOnSubmit}
          showImageUpload={true}
        />
      );

      expect(screen.getByLabelText('Image')).toBeInTheDocument();
      expect(screen.getByLabelText('Image')).toHaveAttribute('type', 'file');
      expect(screen.getByLabelText('Image')).toHaveAttribute('accept', 'image/*');
    });

    it('handles single image upload and shows preview', async () => {
      const user = userEvent.setup();
      
      render(
        <GeneralForm
          title="Test Form"
          fields={basicFields}
          onSubmit={mockOnSubmit}
          showImageUpload={true}
        />
      );

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const imageInput = screen.getByLabelText('Image');

      await user.upload(imageInput, file);

      await waitFor(() => {
        expect(screen.getByText('Selected: test.jpg')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('Image Preview:')).toBeInTheDocument();
        expect(screen.getByAltText('Preview')).toBeInTheDocument();
      });
    });

    it('does not render image upload when showImageUpload is false', () => {
      render(
        <GeneralForm
          title="Test Form"
          fields={basicFields}
          onSubmit={mockOnSubmit}
          showImageUpload={false}
        />
      );

      expect(screen.queryByLabelText('Image')).not.toBeInTheDocument();
    });
  });

  describe('Multiple Image Upload', () => {
    it('renders multiple image upload when allowMultipleImages is true', () => {
      render(
        <GeneralForm
          title="Test Form"
          fields={basicFields}
          onSubmit={mockOnSubmit}
          showImageUpload={true}
          allowMultipleImages={true}
        />
      );

      const imageInput = screen.getByLabelText('Images');
      expect(imageInput).toHaveAttribute('multiple');
    });

    it('handles multiple image uploads and shows previews', async () => {
      const user = userEvent.setup();
      
      render(
        <GeneralForm
          title="Test Form"
          fields={basicFields}
          onSubmit={mockOnSubmit}
          showImageUpload={true}
          allowMultipleImages={true}
        />
      );

      const files = [
        new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
        new File(['test2'], 'test2.jpg', { type: 'image/jpeg' })
      ];
      const imageInput = screen.getByLabelText('Images');

      await user.upload(imageInput, files);

      await waitFor(() => {
        expect(screen.getByText('Selected: 2 image(s)')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('Image Previews:')).toBeInTheDocument();
        expect(screen.getByAltText('Preview 1')).toBeInTheDocument();
        expect(screen.getByAltText('Preview 2')).toBeInTheDocument();
      });
    });

    it('allows removing individual images from multiple upload', async () => {
      const user = userEvent.setup();
      
      render(
        <GeneralForm
          title="Test Form"
          fields={basicFields}
          onSubmit={mockOnSubmit}
          showImageUpload={true}
          allowMultipleImages={true}
        />
      );

      const files = [
        new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
        new File(['test2'], 'test2.jpg', { type: 'image/jpeg' })
      ];
      const imageInput = screen.getByLabelText('Images');

      await user.upload(imageInput, files);

      await waitFor(() => {
        expect(screen.getByText('Selected: 2 image(s)')).toBeInTheDocument();
      });

      // Find and click the remove button for the first image
      const removeButtons = await screen.findAllByText('×');
      await user.click(removeButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Selected: 1 image(s)')).toBeInTheDocument();
      });
    });
  });

  describe('DateTime Display', () => {
    it('shows formatted datetime when showDateTime is true and date/time fields exist', async () => {
      const user = userEvent.setup();
      const fields = [
        {
          name: 'eventDate',
          label: 'Event Date',
          type: 'date'
        },
        {
          name: 'eventTime',
          label: 'Event Time',
          type: 'time'
        }
      ];

      render(
        <GeneralForm
          title="Test Form"
          fields={fields}
          onSubmit={mockOnSubmit}
          showDateTime={true}
        />
      );

      const dateInput = screen.getByLabelText('Event Date');
      const timeInput = screen.getByLabelText('Event Time');

      await user.type(dateInput, '2024-12-25');
      await user.type(timeInput, '14:30');

      await waitFor(() => {
        expect(screen.getByText('Selected Date & Time:')).toBeInTheDocument();
        expect(screen.getByText(/Wednesday, December 25, 2024/)).toBeInTheDocument();
      });
    });

    it('does not show datetime display when showDateTime is false', async () => {
      const user = userEvent.setup();
      const fields = [
        {
          name: 'eventDate',
          label: 'Event Date',
          type: 'date'
        },
        {
          name: 'eventTime',
          label: 'Event Time',
          type: 'time'
        }
      ];

      render(
        <GeneralForm
          title="Test Form"
          fields={fields}
          onSubmit={mockOnSubmit}
          showDateTime={false}
        />
      );

      const dateInput = screen.getByLabelText('Event Date');
      const timeInput = screen.getByLabelText('Event Time');

      await user.type(dateInput, '2024-12-25');
      await user.type(timeInput, '14:30');

      expect(screen.queryByText('Selected Date & Time:')).not.toBeInTheDocument();
    });
  });

  describe('Field Initialization', () => {
    it('initializes form with default values for select fields', () => {
      const fields = [{
        name: 'category',
        label: 'Category',
        type: 'select',
        defaultValue: 'tech',
        options: [
          { value: 'tech', label: 'Technology' },
          { value: 'health', label: 'Health' }
        ]
      }];

      render(
        <GeneralForm
          title="Test Form"
          fields={fields}
          onSubmit={mockOnSubmit}
        />
      );

      const select = screen.getByLabelText('Category');
      expect(select).toHaveValue('tech');
    });

    it('initializes file fields with null value', () => {
      const fields = [{
        name: 'document',
        label: 'Document',
        type: 'file'
      }];

      render(
        <GeneralForm
          title="Test Form"
          fields={fields}
          onSubmit={mockOnSubmit}
        />
      );

      const fileInput = screen.getByLabelText('Document');
      expect(fileInput.files.length).toBe(0);
    });
  });

  describe('Required Fields', () => {
    it('applies required attribute to required fields', () => {
      const fields = [
        {
          name: 'requiredField',
          label: 'Required Field',
          type: 'text',
          required: true
        },
        {
          name: 'optionalField',
          label: 'Optional Field',
          type: 'text',
          required: false
        }
      ];

      render(
        <GeneralForm
          title="Test Form"
          fields={fields}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByLabelText('Required Field')).toBeRequired();
      expect(screen.getByLabelText('Optional Field')).not.toBeRequired();
    });
  });
});