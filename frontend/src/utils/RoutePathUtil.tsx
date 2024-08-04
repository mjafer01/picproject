import HomePage from '../pages/HomePage';
import React from 'react';

const RoutePathUtil = (
  browserRouter: any,
  routes: { path: string; element: any }[],
) => {
  return browserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
  ]);
};
export default RoutePathUtil;
