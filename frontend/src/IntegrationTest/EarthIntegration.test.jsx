import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Earth from '../components/Earth';

test('renders Mars Rover Photos Gallery heading', async () => {
    render(<Earth />);

  });