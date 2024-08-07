import { DefaultRouteWithTemplate } from '../components';

import { LoginPage, HomePage, FavouritePage, Logout } from '../pages';
import { NavigateComponent } from '../utils/NavigateTo';

const RoutePaths = [
  {
    path: '/',
    Element: HomePage,
    type: 'Public',
    menuTitle: 'Home',
  },
  {
    path: '/favorites',
    Element: FavouritePage,
    type: 'Private',
    menuTitle: 'Favorites',
  },
  {
    path: '/login',
    Element: LoginPage,
    type: 'Protected',
    menuTitle: 'Log in',
  },
  {
    path: '/logout',
    Element: Logout,
    type: 'Private',
    menuTitle: 'Log out',
  },
];

const PrivateTopMenu = [
  { title: 'Home', link: '/' },
  { title: 'Favorites', link: '/favorites' },
];

export { PrivateTopMenu };
export default RoutePaths;
