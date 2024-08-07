import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PrivateDesktopMenu from './PrivateDesktopMenu';
import { NavigateTo } from '../../utils/NavigateTo';
import GlobalVariables from '../../constants/Global';
import { PrivateTopMenu } from '../../constants/RoutePaths';

jest.mock('../../utils/NavigateTo', () => ({
  NavigateTo: jest.fn(),
}));

jest.mock('../../constants/Global', () => ({
  displayPrivateSharePic: true,
}));

describe('PrivateDesktopMenu', () => {
  const username = 'testuser';
  const handleClick = jest.fn();
  const menuTitle = 'Home';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with the username', () => {
    render(
      <PrivateDesktopMenu
        username={username}
        handleClick={handleClick}
        menuTitle={menuTitle}
      />,
    );
    expect(screen.getByText(`Hi ${username}`)).toBeInTheDocument();
  });

  it('renders the left menu items and navigates correctly', () => {
    render(
      <PrivateDesktopMenu
        username={username}
        handleClick={handleClick}
        menuTitle={menuTitle}
      />,
    );

    PrivateTopMenu.forEach((menuItem, index) => {
      const element = screen.getByText(menuItem.title);
      expect(element).toBeInTheDocument();
      fireEvent.click(element);
      expect(NavigateTo).toHaveBeenCalledWith(menuItem.link);
    });
  });

  it('calls handleClick when Share Pic button is clicked', () => {
    render(
      <PrivateDesktopMenu
        username={username}
        handleClick={handleClick}
        menuTitle={menuTitle}
      />,
    );

    const sharePicButton = screen.getByText('Share Pic');
    expect(sharePicButton).toBeInTheDocument();
    fireEvent.click(sharePicButton);
    expect(handleClick).toHaveBeenCalled();
  });

  it('navigates to logout when Logout button is clicked', () => {
    render(
      <PrivateDesktopMenu
        username={username}
        handleClick={handleClick}
        menuTitle={menuTitle}
      />,
    );

    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
    expect(NavigateTo).toHaveBeenCalledWith('/logout');
  });

  it('does not render Share Pic button when displayPrivateSharePic is false', () => {
    (GlobalVariables as any).displayPrivateSharePic = false;
    render(
      <PrivateDesktopMenu
        username={username}
        handleClick={handleClick}
        menuTitle={menuTitle}
      />,
    );

    const sharePicButton = screen.queryByText('Share Pic');
    expect(sharePicButton).not.toBeInTheDocument();
  });
});
