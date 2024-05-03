import React from 'react';
import { render } from '@testing-library/react';
import APODViewer from '../components/APOD';

test('renders Mars Rover Photos Gallery heading', async () => {
    render(<APODViewer />);

  });
