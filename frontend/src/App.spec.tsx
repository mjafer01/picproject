// App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

jest.mock('react-router-dom', () => ({
  RouterProvider: jest.fn(() => <div>RouterProvider</div>),
}));

jest.mock('react-toastify', () => ({
  ToastContainer: jest.fn(() => <div>ToastContainer</div>),
}));

describe('App', () => {
  it('renders RouterProvider with the provided urlPaths', () => {
    const mockUrlPaths = {};
    render(<App urlPaths={mockUrlPaths} />);

    expect(screen.getByText('RouterProvider')).toBeInTheDocument();
  });

  it('renders ToastContainer', () => {
    const mockUrlPaths = {};
    render(<App urlPaths={mockUrlPaths} />);

    expect(screen.getByText('ToastContainer')).toBeInTheDocument();
  });
});
