import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Template from './Template';
import GlobalStyles from '../styles/GlobalStyles';
import { TemplateSpace } from '../styles/AfterMenuSpace';

jest.mock('../styles/GlobalStyles', () => jest.fn(() => null));
jest.mock('../styles/AfterMenuSpace', () => ({
  TemplateSpace: jest.fn(() => null),
}));
jest.mock('../components/PublicMenuBar/PublicMenuBar', () =>
  jest.fn(() => <div>PublicMenuBar</div>),
);
jest.mock('../components/PrivateMenuBar/PrivateMenuBar', () =>
  jest.fn(() => <div>PrivateMenuBar</div>),
);

describe('Template', () => {
  it('renders GlobalStyles', () => {
    render(
      <Template isLoggedIn={false}>
        <div>Test Children</div>
      </Template>,
    );

    expect(GlobalStyles).toHaveBeenCalled();
  });

  it('renders PublicMenuBar when not logged in', () => {
    render(
      <Template isLoggedIn={false}>
        <div>Test Children</div>
      </Template>,
    );

    expect(screen.getByText('PublicMenuBar')).toBeInTheDocument();
    expect(screen.queryByText('PrivateMenuBar')).not.toBeInTheDocument();
  });

  it('renders PrivateMenuBar when logged in', () => {
    render(
      <Template isLoggedIn={true}>
        <div>Test Children</div>
      </Template>,
    );

    expect(screen.getByText('PrivateMenuBar')).toBeInTheDocument();
    expect(screen.queryByText('PublicMenuBar')).not.toBeInTheDocument();
  });

  it('renders TemplateSpace', () => {
    render(
      <Template isLoggedIn={false}>
        <div>Test Children</div>
      </Template>,
    );

    expect(TemplateSpace).toHaveBeenCalledWith(
      { height: 4, maxHeight: 30 },
      {},
    );
  });

  it('renders children correctly', () => {
    render(
      <Template isLoggedIn={false}>
        <div>Test Children</div>
      </Template>,
    );

    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });
});
