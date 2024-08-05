import React from 'react';
import { AppTitle } from '../';
import Template from '../../templates/Template';
import DefaultRouteWithTemplateProps from './DefaultRouteWithTemplateProps.d';
import { useNavigate } from 'react-router-dom';

const DefaultRouteWithTemplate: React.FC<DefaultRouteWithTemplateProps> = ({
  children,
  type,
  activemenu
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  React.useEffect(() => {
    if (type === 'Protected' && token && navigate) {
      navigate('/');
    }
    if (type === 'Private' && !token && navigate) {
      navigate('/');
    }
  });
  return <Template isLoggedIn={!!token} activemenu={activemenu}>{children}</Template>;
};

export default DefaultRouteWithTemplate;
