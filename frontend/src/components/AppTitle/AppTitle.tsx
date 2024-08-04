import React from 'react';
import AppTitleProps from './AppTitleProps.d';
import TitleBar from '../../styles/TitleBar';
import Logo from './Logo';

const AppTitle: React.FC<AppTitleProps> = ({ height, width }) => {
  return (
    <TitleBar height={height ?? 35} width={width ?? 134}>
      <Logo />
    </TitleBar>
  );
};
export default AppTitle;
