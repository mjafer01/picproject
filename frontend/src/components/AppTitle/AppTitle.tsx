import React from 'react';
import AppTitleProps from './AppTitleProps.d';
import TitleBar from '../../styles/TitleBar';
import TitleText from '../../styles/TitleText';

const AppTitle: React.FC<AppTitleProps> = ({ title }) => {
  return (
    <TitleBar>
      <TitleText>{title}</TitleText>
    </TitleBar>
  );
};
export default AppTitle;
