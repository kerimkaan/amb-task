/*
 *   Copyright (c) 2021 Kerim Kaan Dönmez
 *   All rights reserved.
 */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
