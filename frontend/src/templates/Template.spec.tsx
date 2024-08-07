// Template.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Template from './Template';
import GlobalStyles from '../styles/GlobalStyles';
import PrivateMenuBar from '../components/PrivateMenuBar/PrivateMenuBar';
import PublicMenuBar from '../components/PublicMenuBar/PublicMenuBar';

jest.mock('../styles/GlobalStyles', () =>
  jest.fn(() => <div>GlobalStyles</div>),
);
jest.mock('../components/PrivateMenuBar/PrivateMenuBar', () =>
  jest.fn(() => <div>PrivateMenuBar</div>),
);
jest.mock('../components/PublicMenuBar/PublicMenuBar', () =>
  jest.fn(() => <div>PublicMenuBar</div>),
);

describe('Template', () => {
  it('renders GlobalStyles component', () => {
    render(
      <Template isLoggedIn={false} menuTitle="Home">
        Child Content
      </Template>,
    );
    expect(screen.getByText('GlobalStyles')).toBeInTheDocument();
  });

  it('renders PublicMenuBar when not logged in', () => {
    render(
      <Template isLoggedIn={false} menuTitle="Home">
        Child Content
      </Template>,
    );
    expect(screen.getByText('PublicMenuBar')).toBeInTheDocument();
    expect(screen.queryByText('PrivateMenuBar')).not.toBeInTheDocument();
  });

  it('renders PrivateMenuBar when logged in', () => {
    render(
      <Template isLoggedIn={true} menuTitle="Home">
        Child Content
      </Template>,
    );
    expect(screen.getByText('PrivateMenuBar')).toBeInTheDocument();
    expect(screen.queryByText('PublicMenuBar')).not.toBeInTheDocument();
  });

  it('renders children content correctly', () => {
    render(
      <Template isLoggedIn={false} menuTitle="Home">
        Child Content
      </Template>,
    );
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('passes the correct menuTitle to PrivateMenuBar', () => {
    render(
      <Template isLoggedIn={true} menuTitle="Dashboard">
        Child Content
      </Template>,
    );
    expect(PrivateMenuBar).toHaveBeenCalledWith({ menuTitle: 'Dashboard' }, {});
  });
});
