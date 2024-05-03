import React from 'react';
import { render } from '@testing-library/react';
import Mars from '../components/Mars';

test('renders APODViewer component without errors', () => {
  render(<Mars />);
});