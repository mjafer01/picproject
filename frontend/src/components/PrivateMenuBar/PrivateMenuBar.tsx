import React, { useEffect, useState } from 'react';
import { BarContainer, BarSpace } from '../../styles/BarContainer';
import AppTitle from '../AppTitle/AppTitle';

import PrivateMobileMenu from './PrivateMobileMenu';
import PrivateDesktopMenu from './PrivateDesktopMenu';
import SharePicForm from '../SharePicForm/SharePicForm';
import PrivateMenuBarProps from './PrivateMenuBarProps.d';

const PrivateMenuBar: React.FC<PrivateMenuBarProps> = ({ menuTitle }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 650 ?? false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const username = localStorage.getItem('username');

  const handleClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BarContainer>
      <BarSpace />
      {isMobile && (
        <PrivateMobileMenu
          username={username ?? ''}
          handleClick={handleClick}
          menuTitle={menuTitle}
        />
      )}
      <AppTitle />
      {!isMobile && (
        <PrivateDesktopMenu
          username={username ?? ''}
          handleClick={handleClick}
          menuTitle={menuTitle}
        />
      )}
      <SharePicForm
        isModalVisible={isModalVisible}
        handleModalCancel={handleModalCancel}
      />
      <BarSpace />
    </BarContainer>
  );
};

export default PrivateMenuBar;
