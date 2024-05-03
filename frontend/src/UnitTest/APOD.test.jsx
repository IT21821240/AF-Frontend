import React from 'react';
import { render } from '@testing-library/react';
import APODViewer from '../components/APOD';

test('renders APODViewer component without errors', () => {
  render(<APODViewer />);
});
