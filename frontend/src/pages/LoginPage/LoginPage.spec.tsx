import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from './LoginPage';
import LoginApi from '../../apis/users/LoginApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

jest.mock('react-toastify', () => ({
  toast: {
    loading: jest.fn(),
    dismiss: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('../../apis/users/LoginApi');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('LoginPage', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders the login form correctly', () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Login to start sharing')).toBeInTheDocument();
  });

  it('handles form input changes correctly', () => {
    render(<LoginPage />);

    const usernameInput = screen.getByPlaceholderText('Username');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    expect(usernameInput).toHaveValue('testuser');
  });

  it('displays error toast if username is empty and prevents submission', async () => {
    render(<LoginPage />);

    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(toast.dismiss).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Login Failed');
    });
  });

  it('calls LoginApi and shows success toast on successful login', async () => {
    (LoginApi as jest.Mock).mockResolvedValue(true);

    render(<LoginPage />);

    const usernameInput = screen.getByPlaceholderText('Username');
    const loginButton = screen.getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(toast.loading).toHaveBeenCalledWith('Logging in');
      expect(LoginApi).toHaveBeenCalledWith('testuser');
      expect(toast.dismiss).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Logging in successfully');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('calls LoginApi and shows error toast on failed login', async () => {
    (LoginApi as jest.Mock).mockResolvedValue(false);

    render(<LoginPage />);

    const usernameInput = screen.getByPlaceholderText('Username');
    const loginButton = screen.getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(toast.loading).toHaveBeenCalledWith('Logging in');
      expect(LoginApi).toHaveBeenCalledWith('testuser');
      expect(toast.dismiss).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Login Failed');
    });
  });
});
