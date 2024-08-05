import React, { act } from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PrimaryButton from './PrimaryButton';

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

describe('PrimaryButton', () => {
  it('should render with the correct width and height', async () => {
    render(
      <PrimaryButton width={100} height={32}>
        Click Me
      </PrimaryButton>,
    );
    await sleep(500);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle('width: 100px');
    expect(button).toHaveStyle('height: 32px');
  });

  it('should render with default type when no type is provided', async () => {
    const { getByRole } = render(<PrimaryButton>Click Me</PrimaryButton>);
    await sleep(500); // Sleep for 500ms
    const button = getByRole('button');
    expect(button).toHaveClass('ant-btn-primary');
  });

  it('should render with provided type', async () => {
    const { getByRole } = render(
      <PrimaryButton type="primary">Click Me</PrimaryButton>,
    );
    await sleep(500); // Sleep for 500ms
    const button = getByRole('button');
    expect(button).toHaveClass('ant-btn-primary');
  });

  it('should handle click events', async () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <PrimaryButton onClick={handleClick}>Click Me</PrimaryButton>,
    );
    await sleep(500); // Sleep for 500ms
    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply additional props correctly', async () => {
    const { getByRole } = render(
      <PrimaryButton data-testid="primary-button" disabled>
        Click Me
      </PrimaryButton>,
    );
    await sleep(500); // Sleep for 500ms
    const button = getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-testid', 'primary-button');
  });
});
