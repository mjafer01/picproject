import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import AppTitle from './AppTitle';

// Mocking the Logo component
jest.mock('./Logo', () => () => <div>Logo</div>);

// Mocking useNavigate globally
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AppTitle', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render with default height and width', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AppTitle />
      </MemoryRouter>,
    );
    const logo = getByText('Logo');
    expect(logo).toBeInTheDocument();
    const titleBar = logo.parentElement;
    expect(titleBar).toHaveStyle('width: 134px');
    expect(titleBar).toHaveStyle('height: 35px');
  });

  it('should render with given height and width', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AppTitle height={50} width={200} />
      </MemoryRouter>,
    );
    const logo = getByText('Logo');
    expect(logo).toBeInTheDocument();
    const titleBar = logo.parentElement;
    expect(titleBar).toHaveStyle('width: 200px');
    expect(titleBar).toHaveStyle('height: 50px');
  });

  it('should navigate to home on click', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/some-route']}>
        <AppTitle />
      </MemoryRouter>,
    );
    const logo = getByText('Logo');
    const titleBar: any = logo.parentElement;
    fireEvent.click(titleBar);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
