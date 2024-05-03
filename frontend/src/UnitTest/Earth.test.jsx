import React from 'react';
import { render } from '@testing-library/react';
import Earth from '../components/Earth';

test('renders APODViewer component without errors', () => {
  render(<Earth />);
});