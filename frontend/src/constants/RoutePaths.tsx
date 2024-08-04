import { DefaultRouteWithTemplate } from '../components';

import { LoginPage, HomePage } from '../pages';

const RoutePaths = [
  {
    path: '/',
    element: (
      <DefaultRouteWithTemplate type={'Public'}>
        <HomePage />
      </DefaultRouteWithTemplate>
    ),
  },
  {
    path: '/login',
    element: (
      <DefaultRouteWithTemplate type={'Protected'}>
        <LoginPage />
      </DefaultRouteWithTemplate>
    ),
  },
];

export default RoutePaths;
