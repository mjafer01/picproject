import React from 'react';
import { NavigateTo } from '../../utils/NavigateTo';

const Logout: React.FC = () => {
  React.useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    NavigateTo('/');
  }, []);
  return <></>;
};

export default Logout;
