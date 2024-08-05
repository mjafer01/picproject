import post from '../base/Post';
import GlobalVariables from '../../constants/Global';
import SharePictureApi from './SharePictureApi';
import mockAxios from 'jest-mock-axios';

jest.mock('../base/Post', () => jest.fn());

describe('SharePictureApi', () => {
  const token = 'sampleToken';
  const url = 'https://example.com/picture.jpg';
  const title = 'A beautiful picture';

  beforeEach(() => {
    localStorage.setItem('token', token);
  });

  afterEach(() => {
    mockAxios.reset();
    localStorage.clear();
  });

  it('should return true when the picture is shared successfully', async () => {
    const mockResponse = {
      status: 201,
    };

    (post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await SharePictureApi(url, title);

    expect(post).toHaveBeenCalledWith(
      `${GlobalVariables.apiHost}/pictures`,
      { url, title },
      token,
    );
    expect(result).toBe(true);
  });

  it('should return false when the response status is not 201', async () => {
    const mockResponse = {
      status: 400,
    };

    (post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await SharePictureApi(url, title);

    expect(result).toBe(false);
  });
});
