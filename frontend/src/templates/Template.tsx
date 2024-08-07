import React from 'react';
import TemplateProps from './TemplateProps.d';
import GlobalStyles from '../styles/GlobalStyles';
import { TemplateSpace } from '../styles/AfterMenuSpace';
import PrivateMenuBar from '../components/PrivateMenuBar/PrivateMenuBar';
import PublicMenuBar from '../components/PublicMenuBar/PublicMenuBar';

const Template: React.FC<TemplateProps> = ({
  children,
  isLoggedIn,
  menuTitle,
}) => {
  return (
    <>
      <GlobalStyles />
      {isLoggedIn ? (
        <PrivateMenuBar menuTitle={menuTitle} />
      ) : (
        <PublicMenuBar />
      )}
      <TemplateSpace height={4} maxheight={30} />
      {children}
    </>
  );
};

export default Template;
