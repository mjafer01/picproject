import React from 'react';
import TemplateProps from './TemplateProps.d';
import GlobalStyles from '../styles/GlobalStyles';
import { TemplateSpace } from '../styles/AfterMenuSpace';
import PrivateMenuBar from '../components/PrivateMenuBar/PrivateMenuBar';
import PublicMenuBar from '../components/PublicMenuBar/PublicMenuBar';

const Template: React.FC<TemplateProps> = ({
  children,
  isLoggedIn,
  activemenu,
}) => {
  return (
    <>
      <GlobalStyles />
      {isLoggedIn ? (
        <PrivateMenuBar activemenu={activemenu} />
      ) : (
        <PublicMenuBar />
      )}
      <TemplateSpace height={4} maxHeight={30} />
      {children}
    </>
  );
};

export default Template;
