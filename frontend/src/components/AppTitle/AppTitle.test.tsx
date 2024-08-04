import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import AppTitle from './AppTitle';
import '@testing-library/jest-dom/extend-expect';

describe('AppTitle', () => {
  it('should render the title text', () => {
    render(<AppTitle title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
