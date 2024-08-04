import React, { act } from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import RoutePathUtil from './utils/RoutePathUtil';
import { createMemoryHistory } from 'history';

describe('App', () => {
  it('renders without crashing and shows the HomePage', async () => {
    const history = createMemoryHistory();
    history.push('/');
    const router = RoutePathUtil(
      createMemoryRouter,
      [
        {
          path: '/',
          element: <div>Home Page</div>,
        },
      ],
      '/',
    );

    render(<App urlPaths={router} />);

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
