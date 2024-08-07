import PrivateMenuBarProps from '../PrivateMenuBar/PrivateMenuBarProps.d';

type DefaultRouteWithTemplateProps = PrivateMenuBarProps & {
  children: any;
  type: 'Private' | 'Public' | 'Protected';
};
export default DefaultRouteWithTemplateProps;
