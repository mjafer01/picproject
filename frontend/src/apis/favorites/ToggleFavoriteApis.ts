import post from '../base/Post';
import GlobalVariables from '../../constants/Global';
const ToggleFavoriteApi = async (pictureId: number): Promise<boolean> => {
  const token = localStorage.getItem('token') ?? '';
  let response = await post(
    GlobalVariables.apiHost + '/favorites/' + pictureId,
    {},
    token,
  );
  if (response.status === 200) {
    return true;
  }
  return false;
};
export default ToggleFavoriteApi;
