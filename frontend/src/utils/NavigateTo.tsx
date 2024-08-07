import { useNavigate } from 'react-router-dom';

var navigate: any;

const NavigateComponent: React.FC = () => {
  navigate = useNavigate();

  return null;
};

const NavigateTo = (path: string) => {
  navigate(path);
};
export { NavigateComponent, NavigateTo };
