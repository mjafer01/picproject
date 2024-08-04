const RoutePathUtil = (
  browserRouter: any,
  routes: { path: string; element: any }[],
  initialEntries?: string,
) => {
  let extraArg = {};
  if (initialEntries) {
    extraArg = {
      initialEntries: ['/', initialEntries],
      initialIndex: 1,
    };
  }
  return browserRouter(routes, extraArg);
};
export default RoutePathUtil;
