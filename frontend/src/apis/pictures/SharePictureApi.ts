import post from '../base/Post';
import GlobalVariables from '../../constants/Global';
const SharePictureApi = async (
  url: string,
  title: string,
): Promise<boolean> => {
  const token = localStorage.getItem('token') ?? '';
  let response = await post(
    GlobalVariables.apiHost + '/pictures',
    {
      url,
      title,
    },
    token,
  );
  if (response.status === 201) {
    return true;
  }
  return false;
};
export default SharePictureApi;
