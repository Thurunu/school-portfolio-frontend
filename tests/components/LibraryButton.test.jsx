import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LibraryButton from '../../src/components/NavBar/LibraryButton';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock react-icons
vi.mock('react-icons/io5', () => ({
  IoLibraryOutline: ({ className }) => (
    <span data-testid="library-icon" className={className}>
      📚
    </span>
  ),
}));

// Mock console.log for testing
const originalConsoleLog = console.log;
const mockConsoleLog = vi.fn();

describe('LibraryButton', () => {
  // Wrapper component to provide router context
  const TestWrapper = ({ children }) => (
    <BrowserRouter>{children}</BrowserRouter>
  );

  beforeEach(() => {
    mockNavigate.mockClear();
    mockConsoleLog.mockClear();
    console.log = mockConsoleLog;
  });

  afterEach(() => {
    vi.clearAllMocks();
    console.log = originalConsoleLog;
  });

  describe('Basic Rendering', () => {
    it('renders the library button with correct text and icon', () => {
      render(
        <TestWrapper>
          <LibraryButton />
        </TestWrapper>
      );

      const button = screen.getByRole('button', { name: /library/i });
      const icon = screen.getByTestId('library-icon');
      const text = screen.getByText('Library');

      expect(button).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(text).toBeInTheDocument();
    });

    it('renders as a button element', () => {
      render(
        <TestWrapper>
          <LibraryButton />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Styling and CSS Classes', () => {
    it('applies default desktop styling when isMobile is false', () => {
      render(
        <TestWrapper>
          <LibraryButton isMobile={false} />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      
      // Check for base classes
      expect(button).toHaveClass('bg-transparent');
      expect(button).toHaveClass('hover:bg-secondary');
      expect(button).toHaveClass('text-white');
      expect(button).toHaveClass('font-semibold');
      expect(button).toHaveClass('hover:text-primary');
      expect(button).toHaveClass('py-2');
      expect(button).toHaveClass('px-4');
      expect(button).toHaveClass('border');
      expect(button).toHaveClass('border-secondary');
      expect(button).toHaveClass('hover:border-transparent');
      expect(button).toHaveClass('rounded');
      expect(button).toHaveClass('flex');
      expect(button).toHaveClass('items-center');
      expect(button).toHaveClass('gap-2');
      
      // Should not have mobile-specific classes
      expect(button).not.toHaveClass('w-full');
      expect(button).not.toHaveClass('justify-center');
      expect(button).not.toHaveClass('mt-4');
    });

    it('applies mobile styling when isMobile is true', () => {
      render(
        <TestWrapper>
          <LibraryButton isMobile={true} />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      
      // Should have mobile-specific classes
      expect(button).toHaveClass('w-full');
      expect(button).toHaveClass('justify-center');
      expect(button).toHaveClass('mt-4');
      
      // Should still have base classes
      expect(button).toHaveClass('bg-transparent');
      expect(button).toHaveClass('flex');
      expect(button).toHaveClass('items-center');
    });

    it('applies default styling when isMobile prop is not provided', () => {
      render(
        <TestWrapper>
          <LibraryButton />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      
      // Should not have mobile-specific classes (default is false)
      expect(button).not.toHaveClass('w-full');
      expect(button).not.toHaveClass('justify-center');
      expect(button).not.toHaveClass('mt-4');
    });

    it('applies correct icon styling', () => {
      render(
        <TestWrapper>
          <LibraryButton />
        </TestWrapper>
      );

      const icon = screen.getByTestId('library-icon');
      expect(icon).toHaveClass('text-xl');
    });
  });

  describe('Click Functionality', () => {
    it('navigates to /library when clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <LibraryButton />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockNavigate).toHaveBeenCalledWith('/library');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('logs message when clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <LibraryButton />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockConsoleLog).toHaveBeenCalledWith('Library button clicked');
      expect(mockConsoleLog).toHaveBeenCalledTimes(1);
    });

    it('handles click event with fireEvent', () => {
      render(
        <TestWrapper>
          <LibraryButton />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockNavigate).toHaveBeenCalledWith('/library');
      expect(mockConsoleLog).toHaveBeenCalledWith('Library button clicked');
    });

    it('works correctly for mobile version click', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <LibraryButton isMobile={true} />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockNavigate).toHaveBeenCalledWith('/library');
      expect(mockConsoleLog).toHaveBeenCalledWith('Library button clicked');
    });
  });

  describe('Accessibility', () => {
    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <LibraryButton />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      
      // Focus the button
      await user.tab();
      expect(button).toHaveFocus();
      
      // Press Enter to activate
      await user.keyboard('{Enter}');
      expect(mockNavigate).toHaveBeenCalledWith('/library');
    });

    it('responds to space key press', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <LibraryButton />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      button.focus();
      
      await user.keyboard(' ');
      expect(mockNavigate).toHaveBeenCalledWith('/library');
    });

    it('has proper button role', () => {
      render(
        <TestWrapper>
          <LibraryButton />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Icon and Text Layout', () => {
    it('renders icon and text in correct order', () => {
      render(
        <TestWrapper>
          <LibraryButton />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      const icon = screen.getByTestId('library-icon');
      const text = screen.getByText('Library');

      // Check that both elements are children of the button
      expect(button).toContainElement(icon);
      expect(button).toContainElement(text);
      
      // The icon should come before the text in the DOM
      const buttonChildren = Array.from(button.children);
      const iconIndex = buttonChildren.findIndex(child => child.contains(icon));
      const textIndex = buttonChildren.findIndex(child => child.contains(text));
      
      expect(iconIndex).toBeLessThan(textIndex);
    });

    it('maintains flex layout with gap', () => {
      render(
        <TestWrapper>
          <LibraryButton />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('flex');
      expect(button).toHaveClass('items-center');
      expect(button).toHaveClass('gap-2');
    });
  });

  describe('Component Props', () => {
    it('handles undefined isMobile prop gracefully', () => {
      render(
        <TestWrapper>
          <LibraryButton isMobile={undefined} />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      
      // Should default to desktop styling
      expect(button).not.toHaveClass('w-full');
      expect(button).not.toHaveClass('justify-center');
      expect(button).not.toHaveClass('mt-4');
    });

    it('handles explicit false isMobile prop', () => {
      render(
        <TestWrapper>
          <LibraryButton isMobile={false} />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      
      expect(button).not.toHaveClass('w-full');
      expect(button).not.toHaveClass('justify-center');
      expect(button).not.toHaveClass('mt-4');
    });
  });

  describe('Multiple Clicks', () => {
    it('handles multiple rapid clicks', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <LibraryButton />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      
      // Click multiple times rapidly
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockNavigate).toHaveBeenCalledTimes(3);
      expect(mockNavigate).toHaveBeenCalledWith('/library');
      expect(mockConsoleLog).toHaveBeenCalledTimes(3);
    });
  });

  describe('Integration with Router', () => {
    it('works without router context (should throw error)', () => {
      // This test verifies that the component requires router context
      expect(() => {
        render(<LibraryButton />);
      }).toThrow();
    });

    it('integrates properly with BrowserRouter', () => {
      // This should not throw
      expect(() => {
        render(
          <BrowserRouter>
            <LibraryButton />
          </BrowserRouter>
        );
      }).not.toThrow();
    });
  });
});