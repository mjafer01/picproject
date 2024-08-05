import post from '../base/Post';
import GlobalVariables from '../../constants/Global';
import ToggleFavoriteApi from './ToggleFavoriteApis';
import mockAxios from 'jest-mock-axios';

jest.mock('../base/Post', () => jest.fn());

describe('ToggleFavoriteApi', () => {
  const token = 'sampleToken';
  const pictureId = 1;

  beforeEach(() => {
    localStorage.setItem('token', token);
  });

  afterEach(() => {
    mockAxios.reset();
    localStorage.clear();
  });

  it('should return true when the favorite toggle is successful', async () => {
    const mockResponse = { status: 200 };
    (post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await ToggleFavoriteApi(pictureId);

    expect(post).toHaveBeenCalledWith(
      `${GlobalVariables.apiHost}/favorites/${pictureId}`,
      {},
      token,
    );
    expect(result).toBe(true);
  });

  it('should return false when the response status is not 200', async () => {
    const mockResponse = { status: 400 };
    (post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await ToggleFavoriteApi(pictureId);

    expect(result).toBe(false);
  });

  it('should return false when the response status is 401', async () => {
    localStorage.removeItem('token');
    const mockResponse = { status: 401 };
    (post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await ToggleFavoriteApi(pictureId);

    expect(result).toBe(false);
  });
});
