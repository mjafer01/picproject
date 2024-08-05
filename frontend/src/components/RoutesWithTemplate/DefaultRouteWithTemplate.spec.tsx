import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DefaultRouteWithTemplate from './DefaultRouteWithTemplate';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Template from '../../templates/Template';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../templates/Template', () =>
  jest.fn(({ children }) => <div>{children}</div>),
);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('DefaultRouteWithTemplate', () => {
  const mockNavigate = useNavigate as jest.Mock;

  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  it('renders correctly', async () => {
    render(
      <MemoryRouter>
        <DefaultRouteWithTemplate type="Public">
          <div>Test Children</div>
        </DefaultRouteWithTemplate>
      </MemoryRouter>,
    );

    await sleep(500);
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });

  it('navigates correctly for Protected route with token', async () => {
    localStorage.setItem('token', 'testtoken');

    render(
      <MemoryRouter>
        <DefaultRouteWithTemplate type="Protected">
          <div>Protected Content</div>
        </DefaultRouteWithTemplate>
      </MemoryRouter>,
    );

    await sleep(500);
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('navigates correctly for Private route without token', async () => {
    render(
      <MemoryRouter>
        <DefaultRouteWithTemplate type="Private">
          <div>Private Content</div>
        </DefaultRouteWithTemplate>
      </MemoryRouter>,
    );

    await sleep(500);
    expect(screen.getByText('Private Content')).toBeInTheDocument();
  });

  it('does not navigate for Public route without token', async () => {
    render(
      <MemoryRouter>
        <DefaultRouteWithTemplate type="Public">
          <div>Public Content</div>
        </DefaultRouteWithTemplate>
      </MemoryRouter>,
    );

    await sleep(500);
    expect(screen.getByText('Public Content')).toBeInTheDocument();
  });
});
