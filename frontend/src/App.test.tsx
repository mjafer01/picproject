import React, { act } from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import RoutePathUtil from './utils/RoutePathUtil';
import { createMemoryHistory } from 'history';
/*
it('renders without crashing and shows the HomePage', async () => {
    let getByText: (text: string) => HTMLElement;

    await act(async () => {
      const renderResult = render(
        <RouterProvider
          router={RoutePathUtil(createMemoryRouter, [
            {
              path: '/',
              element: <div>Home Page</div>,
            },
          ])}
        />
      );
      getByText = renderResult.getByText;
    });

    expect(getByText('Home Page')).toBeInTheDocument();
  });

 */

describe('App', () => {
  it('renders without crashing and shows the HomePage', async () => {
    const history = createMemoryHistory();
    history.push('/');
    let getByText: any;
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <div>Home Page</div>,
        },
      ],
      {
        initialEntries: ['/', '/'],
        initialIndex: 1,
      },
    );
    render(<App urlPaths={router} />);

    await waitFor(() => {
      expect(screen.getByText('Home Page')).toBeInTheDocument();
    });
  });
});
