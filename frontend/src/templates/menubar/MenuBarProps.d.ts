import React from 'react';

type MenuBarProps = {
  title: string;
  TitleComponent: React.FC<any> | React.ComponentType<any>;
  loginPageLink: string;
};
export default MenuBarProps;
