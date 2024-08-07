import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PublicMenuBar from './PublicMenuBar';
import { NavigateTo } from '../../utils/NavigateTo';

jest.mock('../../utils/NavigateTo', () => ({
  NavigateTo: jest.fn(),
}));

jest.mock('../AppTitle/AppTitle', () => () => <div>AppTitle</div>);

describe('PublicMenuBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders AppTitle component', () => {
    render(<PublicMenuBar />);
    expect(screen.getByText('AppTitle')).toBeInTheDocument();
  });

  it('renders login button in the drawer when mobile', () => {
    (global as any).innerWidth = 500;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    render(<PublicMenuBar />);

    const menuIcon = screen.getByRole('img', { name: /menu/i });
    fireEvent.click(menuIcon);

    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  it('opens and closes the drawer when menu icon is clicked', () => {
    (global as any).innerWidth = 500;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    render(<PublicMenuBar />);

    const menuIcon = screen.getByRole('img', { name: /menu/i });
    fireEvent.click(menuIcon);
    expect(screen.getByTestId('mobile-menu-true')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.getByTestId('mobile-menu-false')).toBeInTheDocument();
  });

  it('renders login button outside the drawer when not mobile', () => {
    (global as any).innerWidth = 800;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    render(<PublicMenuBar />);
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  it('navigates to login page when login button is clicked', () => {
    render(<PublicMenuBar />);

    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);
    expect(NavigateTo).toHaveBeenCalledWith('/login');
  });
});
