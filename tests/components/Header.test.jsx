import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../../src/components/NavBar/Header';
import { TEXTS } from '../../src/components/Constants/text';

// Fix the mock path to match your import
vi.mock('../../src/assets/common/school_logo.png', () => ({
  default: 'mocked-logo-path.png',
}));

describe('Header component', () => {
  it('renders school logo and name with link to home', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check image
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'mocked-logo-path.png'); // Fix this line

    // Check school name text
    const schoolName = screen.getByText(TEXTS.SCHOOL_NAME);
    expect(schoolName).toBeInTheDocument();

    // Check link href
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});