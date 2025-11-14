import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero', () => {
  it('renders the main heading and the search input', () => {
    render(<Hero />);

    const heading = screen.getByText('Hola, Usuario!');
    expect(heading).toBeInTheDocument();

    const searchInput = screen.getByLabelText('Search for a warehouse');
    expect(searchInput).toBeInTheDocument();
  });
});
