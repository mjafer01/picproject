import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DefaultRouteWithTemplate from './DefaultRouteWithTemplate';
import { NavigateTo } from '../../utils/NavigateTo';
import Template from '../../templates/Template';

jest.mock('../../utils/NavigateTo', () => ({
  NavigateTo: jest.fn(),
}));

jest.mock(
  '../../templates/Template',
  () =>
    ({ isLoggedIn, menuTitle, children }: any) => (
      <div>
        Template - {isLoggedIn ? 'Logged In' : 'Not Logged In'} - {menuTitle}
        {children}
      </div>
    ),
);

describe('DefaultRouteWithTemplate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders children inside the template', () => {
    render(
      <DefaultRouteWithTemplate type="Public" menuTitle="Home">
        <div>Child Component</div>
      </DefaultRouteWithTemplate>,
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(
      screen.getByText('Template - Not Logged In - Home'),
    ).toBeInTheDocument();
  });

  it('navigates to home if type is Protected and token exists', () => {
    localStorage.setItem('token', 'sampleToken');

    render(
      <DefaultRouteWithTemplate type="Protected" menuTitle="Home">
        <div>Child Component</div>
      </DefaultRouteWithTemplate>,
    );

    expect(NavigateTo).toHaveBeenCalledWith('/');
  });

  it('navigates to home if type is Private and token does not exist', () => {
    render(
      <DefaultRouteWithTemplate type="Private" menuTitle="Home">
        <div>Child Component</div>
      </DefaultRouteWithTemplate>,
    );

    expect(NavigateTo).toHaveBeenCalledWith('/');
  });

  it('does not navigate if type is Protected and token does not exist', () => {
    render(
      <DefaultRouteWithTemplate type="Protected" menuTitle="Home">
        <div>Child Component</div>
      </DefaultRouteWithTemplate>,
    );

    expect(NavigateTo).not.toHaveBeenCalled();
  });

  it('does not navigate if type is Private and token exists', () => {
    localStorage.setItem('token', 'sampleToken');

    render(
      <DefaultRouteWithTemplate type="Private" menuTitle="Home">
        <div>Child Component</div>
      </DefaultRouteWithTemplate>,
    );

    expect(NavigateTo).not.toHaveBeenCalled();
  });

  it('passes isLoggedIn prop correctly to Template based on token presence', () => {
    localStorage.setItem('token', 'sampleToken');

    render(
      <DefaultRouteWithTemplate type="Public" menuTitle="Home">
        <div>Child Component</div>
      </DefaultRouteWithTemplate>,
    );

    expect(screen.getByText('Template - Logged In - Home')).toBeInTheDocument();
  });

  it('updates token state on localStorage change', () => {
    const { rerender } = render(
      <DefaultRouteWithTemplate type="Public" menuTitle="Home">
        <div>Child Component</div>
      </DefaultRouteWithTemplate>,
    );

    expect(
      screen.getByText('Template - Not Logged In - Home'),
    ).toBeInTheDocument();

    localStorage.setItem('token', 'sampleToken');
    rerender(
      <DefaultRouteWithTemplate type="Public" menuTitle="Home">
        <div>Child Component</div>
      </DefaultRouteWithTemplate>,
    );

    expect(screen.getByText('Template - Logged In - Home')).toBeInTheDocument();
  });
});
