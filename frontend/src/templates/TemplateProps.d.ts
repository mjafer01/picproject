import PrivateMenuBarProps from '../components/PrivateMenuBar/PrivateMenuBarProps.d';

type TemplateProps = PrivateMenuBarProps & {
  isLoggedIn: boolean;
  children: any;
};

export default TemplateProps;
