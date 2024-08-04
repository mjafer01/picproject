import React from 'react';
import { AppTitle } from '../';
import Template from '../../templates/Template';
import DefaultRouteWithTemplateProps from './DefaultRouteWithTemplateProps.d';

const DefaultRouteWithTemplate: React.FC<DefaultRouteWithTemplateProps> = ({
  children,
  type,
}) => {
  return (
    <Template
      TitleComponent={AppTitle}
      title={'PicShare'}
      loginPageLink={'/login'}
    >
      {children}
    </Template>
  );
};

export default DefaultRouteWithTemplate;
