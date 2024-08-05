import { DefaultRouteWithTemplate } from '../components';

import { LoginPage, HomePage, FavouritePage } from '../pages';

const RoutePaths = [
  {
    path: '/',
    element: (
      <DefaultRouteWithTemplate type={'Public'}>
        <HomePage />
        FavouritePage
      </DefaultRouteWithTemplate>
    ),
  },
  {
    path: '/favorites',
    element: (
      <DefaultRouteWithTemplate type={'Private'}>
        <FavouritePage />
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
