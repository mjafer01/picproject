import React, { useEffect, useState } from 'react';
import {
  BarContainer,
  BarSpace,
  ButtonDiv,
  MobileMenuDiv,
} from '../../styles/BarContainer';
import { PrimaryButton } from '../index';
import AppTitle from '../AppTitle/AppTitle';
import { MenuOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { NavigateTo } from '../../utils/NavigateTo';
const PublicMenuBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleClick = () => {
    NavigateTo('/login');
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
        <MobileMenuDiv>
          <MenuOutlined onClick={showDrawer} />

          <Drawer
            title="PicShare"
            placement="left"
            onClose={onClose}
            open={visible}
            width={250}
          >
            <PrimaryButton
              value={'Login'}
              width={78}
              height={24}
              onClick={handleClick}
            >
              Log in
            </PrimaryButton>
          </Drawer>
        </MobileMenuDiv>
      )}
      <AppTitle />
      {!isMobile && (
        <ButtonDiv>
          <PrimaryButton
            value={'Login'}
            width={78}
            height={24}
            onClick={handleClick}
          >
            Log in
          </PrimaryButton>
        </ButtonDiv>
      )}
      <BarSpace />
    </BarContainer>
  );
};
export default PublicMenuBar;
