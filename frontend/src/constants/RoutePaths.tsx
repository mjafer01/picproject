import { DefaultRouteWithTemplate } from '../components';

import { LoginPage, HomePage, FavouritePage, Logout } from '../pages';
import { NavigateComponent } from '../utils/NavigateTo';

const RoutePaths = [
  {
    path: '/',
    element: (
      <DefaultRouteWithTemplate type={'Public'} activemenu={'Home'}>
        <NavigateComponent />
        <HomePage />
      </DefaultRouteWithTemplate>
    ),
  },
  {
    path: '/favorites',
    element: (
      <DefaultRouteWithTemplate type={'Private'} activemenu={'Favourite'}>
        <NavigateComponent />
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
  {
    path: '/logout',
    element: (
      <DefaultRouteWithTemplate type={'Private'}>
        <Logout />
      </DefaultRouteWithTemplate>
    ),
  },
];

export default RoutePaths;
