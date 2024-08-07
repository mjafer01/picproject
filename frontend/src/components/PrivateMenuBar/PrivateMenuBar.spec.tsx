import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PrivateMenuBar from './PrivateMenuBar';

jest.mock('../AppTitle/AppTitle', () => () => <div>AppTitle</div>);
jest.mock(
  './PrivateMobileMenu',
  () =>
    ({ username, handleClick, menuTitle }: any) => (
      <div>
        PrivateMobileMenu - {username} - {menuTitle}
        <button onClick={handleClick}>Show Modal</button>
      </div>
    ),
);
jest.mock(
  './PrivateDesktopMenu',
  () =>
    ({ username, handleClick, menuTitle }: any) => (
      <div>
        PrivateDesktopMenu - {username} - {menuTitle}
        <button onClick={handleClick}>Show Modal</button>
      </div>
    ),
);
jest.mock(
  '../SharePicForm/SharePicForm',
  () =>
    ({ isModalVisible, handleModalCancel }: any) => (
      <div>
        SharePicForm - {isModalVisible ? 'Visible' : 'Hidden'}
        {isModalVisible && (
          <button onClick={handleModalCancel}>Close Modal</button>
        )}
      </div>
    ),
);

describe('PrivateMenuBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('username', 'testuser');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders AppTitle component', () => {
    render(<PrivateMenuBar menuTitle="Home" />);
    expect(screen.getByText('AppTitle')).toBeInTheDocument();
  });

  it('renders PrivateDesktopMenu when not mobile', () => {
    render(<PrivateMenuBar menuTitle="Home" />);
    expect(
      screen.getByText('PrivateDesktopMenu - testuser - Home'),
    ).toBeInTheDocument();
  });

  it('renders PrivateMobileMenu when mobile', () => {
    // Mock window.innerWidth to be mobile size
    (global as any).innerWidth = 500;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    render(<PrivateMenuBar menuTitle="Home" />);
    expect(
      screen.getByText('PrivateMobileMenu - testuser - Home'),
    ).toBeInTheDocument();
  });

  it('shows and hides modal when handleClick and handleModalCancel are called', () => {
    render(<PrivateMenuBar menuTitle="Home" />);

    // Initially, modal should be hidden
    expect(screen.getByText('SharePicForm - Hidden')).toBeInTheDocument();

    // Show modal
    fireEvent.click(screen.getByText('Show Modal'));
    expect(screen.getByText('SharePicForm - Visible')).toBeInTheDocument();

    // Hide modal
    fireEvent.click(screen.getByText('Close Modal'));
    expect(screen.getByText('SharePicForm - Hidden')).toBeInTheDocument();
  });

  it('updates isMobile state on window resize', () => {
    render(<PrivateMenuBar menuTitle="Home" />);

    // Mock window.innerWidth to be desktop size
    (global as any).innerWidth = 800;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(
      screen.getByText('PrivateDesktopMenu - testuser - Home'),
    ).toBeInTheDocument();

    // Mock window.innerWidth to be mobile size
    (global as any).innerWidth = 500;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(
      screen.getByText('PrivateMobileMenu - testuser - Home'),
    ).toBeInTheDocument();
  });
});
