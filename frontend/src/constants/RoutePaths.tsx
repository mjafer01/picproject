import { DefaultRouteWithTemplate } from '../components';

import { LoginPage, HomePage, FavouritePage } from '../pages';

const RoutePaths = [
  {
    path: '/',
    element: (
      <DefaultRouteWithTemplate type={'Public'} activemenu={'Home'}>
        <HomePage />
      </DefaultRouteWithTemplate>
    ),
  },
  {
    path: '/favorites',
    element: (
      <DefaultRouteWithTemplate type={'Private'} activemenu={'Favourite'}>
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
