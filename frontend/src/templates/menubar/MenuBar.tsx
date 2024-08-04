import React, { useEffect, useState } from 'react';
import {
  BarContainer,
  BarSpace,
  ButtonDiv,
  MobileMenuDiv,
} from '../../styles/BarContainer';
import MenuBarProps from './MenuBarProps.d';
import { PrimaryButton } from '../../components';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const MenuBar: React.FC<MenuBarProps> = ({
  TitleComponent,
  title,
  loginPageLink,
}) => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  const navigate = useNavigate();
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleClick = () => {
    navigate(loginPageLink);
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
            visible={visible}
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
      <TitleComponent title={title} />
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
export default MenuBar;
