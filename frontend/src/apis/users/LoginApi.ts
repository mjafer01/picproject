import post from '../base/Post';
import GlobalVariables from '../../constants/Global';
const LoginApi = async (username: string): Promise<boolean> => {
  let response = await post(GlobalVariables.apiHost + '/users/login', {
    username,
  });
  if (response.status === 200 || response.status === 201) {
    localStorage.setItem('token', (response.data as any).id);
    localStorage.setItem('username', (response.data as any).username);
    return true;
  }
  return false;
};
export default LoginApi;
