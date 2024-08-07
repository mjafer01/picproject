import React from 'react';
import { AppTitle } from '../';
import Template from '../../templates/Template';
import DefaultRouteWithTemplateProps from './DefaultRouteWithTemplateProps.d';
import { NavigateTo } from '../../utils/NavigateTo';

const DefaultRouteWithTemplate: React.FC<DefaultRouteWithTemplateProps> = ({
  children,
  type,
  menuTitle,
}) => {
  const [token, setToken] = React.useState(localStorage.getItem('token'));

  React.useEffect(() => {
    setToken(localStorage.getItem('token'));
    if (type === 'Protected' && token) {
      NavigateTo('/');
    }
    if (type === 'Private' && !token) {
      NavigateTo('/');
    }
  });
  return (
    <Template isLoggedIn={!!token} menuTitle={menuTitle}>
      {children}
    </Template>
  );
};

export default DefaultRouteWithTemplate;
