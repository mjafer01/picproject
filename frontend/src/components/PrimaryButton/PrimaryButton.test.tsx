import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import PrimaryButton from './PrimaryButton';
import { Button } from '../../styles/Button';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
describe('PrimaryButton', () => {
  it('should render with the correct width and height', () => {
    render(
      <PrimaryButton width={100} height={50}>
        Click Me
      </PrimaryButton>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('width', '100');
    expect(button).toHaveAttribute('height', '50');
  });

  it('should render with default width and height when not provided', async () => {
    render(
      <MemoryRouter>
        <PrimaryButton>Click Me</PrimaryButton>
      </MemoryRouter>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveAttribute('width');
    expect(button).not.toHaveAccessibleName('height');
  });
});
