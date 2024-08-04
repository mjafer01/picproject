import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MenuBar from './MenuBar';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Mocking the components
jest.mock('../../components', () => ({
  PrimaryButton: jest.fn(({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )),
}));

jest.mock('@ant-design/icons', () => ({
  MenuOutlined: jest.fn(({ onClick }) => <div onClick={onClick}>MenuIcon</div>),
}));

jest.mock('antd', () => ({
  ...(jest.requireActual('antd') as any),
  Drawer: jest.fn(({ title, visible, onClose, children }) => (
    <div>
      {visible && (
        <div>
          <div>{title}</div>
          <div onClick={onClose}>Close</div>
          {children}
        </div>
      )}
    </div>
  )),
}));

function setWindowSize(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  window.dispatchEvent(new Event('resize'));
}

describe('MenuBar', () => {
  const TitleComponent = ({ title }: any) => <div>{title}</div>;
  const title = 'Test Title';
  const loginPageLink = '/login';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all elements', () => {
    render(
      <MemoryRouter>
        <MenuBar
          TitleComponent={TitleComponent}
          title={title}
          loginPageLink={loginPageLink}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.queryByText('MenuIcon')).not.toBeInTheDocument();
    expect(screen.queryByText('PicShare')).not.toBeInTheDocument();
  });

  it('should render mobile menu when resized', () => {
    setWindowSize(400);

    render(
      <MemoryRouter>
        <MenuBar
          TitleComponent={TitleComponent}
          title={title}
          loginPageLink={loginPageLink}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.queryByText('Log in')).not.toBeInTheDocument();
    expect(screen.getByText('MenuIcon')).toBeInTheDocument();

    fireEvent.click(screen.getByText('MenuIcon'));
    expect(screen.getByText('PicShare')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('PicShare')).not.toBeInTheDocument();
  });
});
