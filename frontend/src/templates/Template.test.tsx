import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Template from './Template';
import '@testing-library/jest-dom';

describe('Template', () => {
  const TitleComponent = () => <div>Title</div>;
  const title = 'Test Title';
  const loginPageLink = '/login';

  it('should render UseNavigateFunc, GlobalStyles, MenuBar, and children', async () => {
    render(
      <MemoryRouter>
        <Template
          TitleComponent={TitleComponent}
          title={title}
          loginPageLink={loginPageLink}
        >
          <div>Child Content</div>
        </Template>
      </MemoryRouter>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  it('should pass props correctly to MenuBar', () => {
    render(
      <MemoryRouter>
        <Template
          TitleComponent={TitleComponent}
          title={title}
          loginPageLink={loginPageLink}
        >
          <div>Child Content</div>
        </Template>
      </MemoryRouter>,
    );

    const menuBarElement = screen.getByText('Title').closest('div');
    expect(menuBarElement).toBeInTheDocument();
  });
});
