import { MenuOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { LinkMenu } from '../../styles/ContentStyles';
import { NavigateTo } from '../../utils/NavigateTo';
import { PrimaryButton } from '../index';
import { MobileMenuDiv } from '../../styles/BarContainer';
import React, { useState } from 'react';
import { PrivateTopMenu } from '../../constants/RoutePaths';
import GlobalVariables from '../../constants/Global';
type PrivateMobileMenuProps = {
  username: string;
  handleClick: any;
  menuTitle: string;
};
const PrivateMobileMenu: React.FC<PrivateMobileMenuProps> = ({
  username,
  handleClick,
}) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const RenderTopMenu = () => {
    let RenderElements: any[] = [];
    for (let i = 0; i < PrivateTopMenu.length; i++) {
      RenderElements.push(
        <LinkMenu
          onClick={() => {
            NavigateTo(PrivateTopMenu[i].link);
          }}
          key={i}
        >
          {PrivateTopMenu[i].title}
        </LinkMenu>,
      );
    }
    return <>{RenderElements}</>;
  };

  return (
    <MobileMenuDiv data-testid={'mobile-menu-' + visible}>
      <MenuOutlined onClick={showDrawer} />

      <Drawer
        title="PicShare"
        placement="left"
        onClose={onClose}
        open={visible}
        width={250}
      >
        <>Hi {username + ''}</>
        <RenderTopMenu />

        {GlobalVariables.displayPrivateSharePic && (
          <LinkMenu>
            <PrimaryButton width={78} height={24} onClick={handleClick}>
              Share Pic
            </PrimaryButton>
          </LinkMenu>
        )}
        <LinkMenu>
          <PrimaryButton
            width={64}
            height={24}
            type={'link'}
            onClick={() => {
              NavigateTo('/logout');
            }}
          >
            Logout
          </PrimaryButton>
        </LinkMenu>
      </Drawer>
    </MobileMenuDiv>
  );
};
export default PrivateMobileMenu;
