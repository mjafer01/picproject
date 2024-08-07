import React from 'react';
import {
  ButtonDiv,
  LeftMenuActiveBox,
  LeftMenuBox,
  RightElementDiv,
  RightMenuDiv,
} from '../../styles/BarContainer';
import { NavigateTo } from '../../utils/NavigateTo';
import { PrimaryButton } from '../index';
type PrivateDesktopMenuProps = {
  username: string;
  handleClick: any;
  menuTitle: string;
};
import { PrivateTopMenu } from '../../constants/RoutePaths';
import GlobalVariables from '../../constants/Global';

const PrivateDesktopMenu: React.FC<PrivateDesktopMenuProps> = ({
  username,
  handleClick,
  menuTitle,
}) => {
  const RenderLeftMenu = () => {
    let RenderElements: any[] = [];
    for (let i = 0; i < PrivateTopMenu.length; i++) {
      const Element =
        menuTitle === PrivateTopMenu[i].title ? LeftMenuActiveBox : LeftMenuBox;
      RenderElements.push(
        <Element
          onClick={() => {
            NavigateTo(PrivateTopMenu[i].link);
          }}
          key={i}
        >
          {PrivateTopMenu[i].title}
        </Element>,
      );
    }
    return <>{RenderElements}</>;
  };
  return (
    <RightMenuDiv>
      <RenderLeftMenu />

      <ButtonDiv>
        {GlobalVariables.displayPrivateSharePic && (
          <PrimaryButton width={78} height={24} onClick={handleClick}>
            Share Pic
          </PrimaryButton>
        )}
        <RightElementDiv paddingleft={20}>Hi {username ?? ''}</RightElementDiv>
        <RightElementDiv paddingleft={20}>
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
        </RightElementDiv>
      </ButtonDiv>
    </RightMenuDiv>
  );
};
export default PrivateDesktopMenu;
