import { DefaultRouteWithTemplate } from '../components';
import { NavigateComponent } from './NavigateTo';
import React from 'react';

const RoutePathUtil = (
  browserRouter: any,
  routes: {
    path: string;
    menuTitle: string;
    Element: React.FunctionComponent<{}>;
    type: string;
  }[],
  initialEntries?: string,
) => {
  let extraArg = {};
  if (initialEntries) {
    extraArg = {
      initialEntries: ['/', initialEntries],
      initialIndex: 1,
    };
  }
  let componentRoutes: any[] = [];
  for (let i = 0; i < routes.length; i++) {
    const Element = routes[i].Element;
    componentRoutes.push({
      path: routes[i].path,
      element: (
        <DefaultRouteWithTemplate
          type={routes[i].type as any}
          menuTitle={routes[i].menuTitle}
        >
          <NavigateComponent />
          <Element />
        </DefaultRouteWithTemplate>
      ),
    });
  }

  return browserRouter(componentRoutes, extraArg);
};
export default RoutePathUtil;
