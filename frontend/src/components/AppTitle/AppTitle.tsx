import React from 'react';
import AppTitleProps from './AppTitleProps.d';
import TitleBar from '../../styles/TitleBar';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

const AppTitle: React.FC<AppTitleProps> = ({ height, width }) => {
  const navigate = useNavigate();
  return (
    <TitleBar
      height={height ?? 35}
      width={width ?? 134}
      onClick={() => navigate('/')}
      activateHandleCursor
    >
      <Logo />
    </TitleBar>
  );
};
export default AppTitle;
