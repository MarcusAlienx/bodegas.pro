import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders the logo and the user account button', () => {
    render(<Header />);

    const logo = screen.getByAltText('BuscaBodegas.com Logo - Tu portal de bodegas');
    expect(logo).toBeInTheDocument();

    const userAccountButton = screen.getByLabelText('User account');
    expect(userAccountButton).toBeInTheDocument();
  });
});
