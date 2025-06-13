import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MobileMenu from '../../src/components/NavBar/MobileMenu';
import '@testing-library/jest-dom';
import React from 'react';
import { useLocation } from 'react-router'


// Mock child components
vi.mock('./Links', () => ({
  default: ({ isMobile, onItemClick }) => (
    <div data-testid="Links" data-mobile={isMobile} onClick={onItemClick}>
      Links Component
    </div>
  ),
}));

vi.mock('./LibraryButton', () => ({
  default: ({ isMobile }) => (
    <div data-testid="LibraryButton" data-mobile={isMobile}>
      Library Button
    </div>
  ),
}));

describe('MobileMenu', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(<MobileMenu isOpen={false} onClose={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders when isOpen is true', () => {
    render(<MobileMenu isOpen={true} onClose={() => {}} />);
    expect(screen.getByTestId('Links')).toBeInTheDocument();
    expect(screen.getByTestId('LibraryButton')).toBeInTheDocument();
  });

  it('passes correct props to Links and LibraryButton', () => {
    const onClose = vi.fn();
    render(<MobileMenu isOpen={true} onClose={onClose} />);

    const links = screen.getByTestId('Links');
    const library = screen.getByTestId('LibraryButton');

    expect(links.dataset.mobile).toBe('true');
    expect(library.dataset.mobile).toBe('true');
  });

  it('calls onClose when Links is clicked', () => {
    const onClose = vi.fn();
    render(<MobileMenu isOpen={true} onClose={onClose} />);

    screen.getByTestId('Links').click();
    expect(onClose).toHaveBeenCalled();
  });
});
