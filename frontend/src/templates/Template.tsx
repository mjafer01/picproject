import React from 'react';
import TemplateProps from './TemplateProps.d';
import GlobalStyles from '../styles/GlobalStyles';
import { TemplateSpace } from '../styles/AfterMenuSpace';
import { PublicMenuBar, PrivateMenuBar } from '../components';

const Template: React.FC<TemplateProps> = ({ children, isLoggedIn }) => {
  return (
    <>
      <GlobalStyles />
      {isLoggedIn ? <PrivateMenuBar /> : <PublicMenuBar />}
      <TemplateSpace height={4} maxHeight={30} />
      {children}
    </>
  );
};

export default Template;
