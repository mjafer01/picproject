import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PrivateMenuBar from './PrivateMenuBar';
import { toast } from 'react-toastify';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../AppTitle/AppTitle', () => () => <div>Logo</div>);
jest.mock('@ant-design/icons', () => ({
  MenuOutlined: () => <div>MenuOutlined</div>,
}));
jest.mock('antd', () => {
  const actualAntd = jest.requireActual('antd');
  return {
    ...actualAntd,
    Drawer: ({ children, ...props }: any) => (
      <div {...props}>
        <div>Drawer</div>
        {children}
      </div>
    ),
    Modal: ({ children, ...props }: any) => (
      <div {...props}>
        <div>Modal</div>
        {children}
      </div>
    ),
    Button: ({ children, ...props }: any) => (
      <button {...props}>
        <div>Button</div>
        {children}
      </button>
    ),
  };
});

jest.mock('react-toastify', () => ({
  toast: {
    loading: jest.fn(),
    dismiss: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
  },
}));
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

jest.mock('../../apis/pictures/SharePictureApi', () => jest.fn());

const mockSharePictureApi =
  require('../../apis/pictures/SharePictureApi') as any;

describe('PrivateMenuBar', () => {
  beforeEach(() => {
    mockSharePictureApi.mockClear();
    (toast.loading as jest.Mock).mockReset();
    (toast.dismiss as jest.Mock).mockReset();
    (toast.error as jest.Mock).mockReset();
    (toast.success as jest.Mock).mockReset();
  });

  it('handles logout correctly', async () => {
    act(() => {
      (window as any).innerWidth = 800; // Mocking non-mobile width
      window.dispatchEvent(new Event('resize'));
    });
    localStorage.setItem('username', 'testuser');
    localStorage.setItem('token', 'testtoken');

    render(
      <MemoryRouter>
        <PrivateMenuBar />
      </MemoryRouter>,
    );

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    await sleep(500);

    expect(localStorage.getItem('username')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('displays username from localStorage', async () => {
    act(() => {
      (window as any).innerWidth = 800; // Mocking non-mobile width
      window.dispatchEvent(new Event('resize'));
    });

    localStorage.setItem('username', 'testuser');

    render(
      <MemoryRouter>
        <PrivateMenuBar />
      </MemoryRouter>,
    );

    await sleep(500);
    expect(screen.getAllByText('Hi testuser').length).toBeGreaterThan(0);
  });
});
