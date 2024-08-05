import get from '../base/Get';
import GlobalVariables from '../../constants/Global';

const GetAllFavoritePictures = async (
  page: number,
  limit: number,
): Promise<{
  currentPage: number;
  hasNextPage?: boolean;
  message?: string;
  pictures?: {
    id: number;
    url: string;
    title: string;
    createdAt: string;
    isFavorite?: boolean;
    user: {
      id: number;
      username: string;
    };
  }[];
  totalPages: number;
}> => {
  const token = localStorage.getItem('token') ?? '';
  let response = await get(
    GlobalVariables.apiHost + '/favorites?page=' + page + '&limit=' + limit,
    token,
  );
  if (response.status === 200) {
    return response.data as any;
  }
  return [] as any;
};
export default GetAllFavoritePictures;
