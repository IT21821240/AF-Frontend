import React from 'react';
import { render } from '@testing-library/react';
import EPIC from '../components/EPIC';

test('renders APODViewer component without errors', () => {
  render(<EPIC />);
});