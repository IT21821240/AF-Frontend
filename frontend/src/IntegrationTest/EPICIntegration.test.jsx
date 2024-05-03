import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Epic from '../components/EPIC';

test('renders NASA EPIC Images heading', () => {
  const { getByText } = render(<Epic />);
  const headingElement = getByText(/NASA EPIC Images/i);
  expect(headingElement).toBeInTheDocument();
});
