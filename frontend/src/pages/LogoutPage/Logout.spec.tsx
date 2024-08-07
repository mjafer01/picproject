import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Logout from './Logout';
import { NavigateTo } from '../../utils/NavigateTo';

jest.mock('../../utils/NavigateTo', () => ({
  NavigateTo: jest.fn(),
}));

describe('Logout', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('username', 'test-username');
    jest.clearAllMocks();
  });

  it('removes token and username from localStorage', async () => {
    render(<Logout />);

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('username')).toBeNull();
    });
  });

  it('calls NavigateTo with "/"', async () => {
    render(<Logout />);

    await waitFor(() => {
      expect(NavigateTo).toHaveBeenCalledWith('/');
    });
  });
});
