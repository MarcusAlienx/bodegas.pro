import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders the copyright notice and the links', () => {
    render(<Footer />);

    const copyrightNotice = screen.getByText('© 2024 BuscaBodegas.com. Todos los derechos reservados.');
    expect(copyrightNotice).toBeInTheDocument();

    const termsLink = screen.getByLabelText('Terms and conditions');
    expect(termsLink).toBeInTheDocument();

    const privacyLink = screen.getByLabelText('Privacy policy');
    expect(privacyLink).toBeInTheDocument();
  });
});
