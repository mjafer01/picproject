import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PublicMenuBar from './PublicMenuBar';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../AppTitle/AppTitle', () => () => <div>Logo</div>);
jest.mock('@ant-design/icons', () => ({
  MenuOutlined: () => <div>MenuOutlined</div>,
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('PublicMenuBar', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders correctly', async () => {
    render(
      <MemoryRouter>
        <PublicMenuBar />
      </MemoryRouter>,
    );

    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('handles login button click correctly', async () => {
    act(() => {
      (window as any).innerWidth = 800; // Mocking mobile width
      window.dispatchEvent(new Event('resize'));
    });
    render(
      <MemoryRouter>
        <PublicMenuBar />
      </MemoryRouter>,
    );

    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('handles resize correctly', async () => {
    act(() => {
      (window as any).innerWidth = 800; // Mocking non-mobile width
      window.dispatchEvent(new Event('resize'));
    });

    render(
      <MemoryRouter>
        <PublicMenuBar />
      </MemoryRouter>,
    );

    expect(screen.getByText('Log in')).toBeInTheDocument();
  });
});
