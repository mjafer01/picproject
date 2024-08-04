import React, { useEffect } from 'react';
import TemplateProps from './TemplateProps.d';
import MenuBar from './menubar/MenuBar';
import GlobalStyles from '../styles/GlobalStyles';

const Template: React.FC<TemplateProps> = ({
  TitleComponent,
  title,
  loginPageLink,
  children,
}) => {
  return (
    <>
      <GlobalStyles />
      <MenuBar
        TitleComponent={TitleComponent}
        title={title}
        loginPageLink={loginPageLink}
      />
      {children}
    </>
  );
};

export default Template;
