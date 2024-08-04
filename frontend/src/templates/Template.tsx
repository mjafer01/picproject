import React, { useEffect } from 'react';
import TemplateProps from './TemplateProps.d';
import MenuBar from './menubar/MenuBar';
import GlobalStyles from '../styles/GlobalStyles';
import { TemplateSpace } from '../styles/AfterMenuSpace';

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
      <TemplateSpace height={4} maxHeight={30} />
      {children}
    </>
  );
};

export default Template;
