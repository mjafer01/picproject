import React from 'react';
import { AppTitle } from '../components';
import Template from '../templates/Template';

const HomePage: React.FC = () => {
  return (
    <Template
      TitleComponent={AppTitle}
      title={'PicShare'}
      loginPageLink={'/login'}
    >
      helloe
    </Template>
  );
};

export default HomePage;
