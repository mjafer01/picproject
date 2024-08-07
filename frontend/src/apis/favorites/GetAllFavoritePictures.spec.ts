import get from '../base/Get';
import GlobalVariables from '../../constants/Global';
import GetAllFavoritePictures from './GetAllFavoritePicturesApi';
import mockAxios from 'jest-mock-axios';
import GetAllPictures from '../pictures/GetAllPicturesApi';

jest.mock('../base/Get', () => jest.fn());

describe('GetAllFavoritePictures', () => {
  const token = 'sampleToken';
  const page = 1;
  const limit = 10;

  beforeEach(() => {
    localStorage.setItem('token', token);
  });

  afterEach(() => {
    mockAxios.reset();
    localStorage.clear();
  });

  it('should fetch favorite pictures successfully', async () => {
    const mockResponse = {
      currentPage: page,
      hasNextPage: false,
      pictures: [
        {
          id: 1,
          url: 'https://example.com/image1.jpg',
          title: 'Image 1',
          createdAt: '2024-08-05T12:34:56Z',
          isFavorite: true,
          user: { id: 1, username: 'user1' },
        },
      ],
      totalPages: 1,
    };
    (get as jest.Mock).mockResolvedValue({ status: 200, data: mockResponse });

    const result = await GetAllFavoritePictures(page, limit);

    expect(get).toHaveBeenCalledWith(
      `${GlobalVariables.apiHost}/favorites?page=${page}&limit=${limit}`,
      token,
    );
    expect(result).toEqual(mockResponse);
  });
  it('should return response data when the request returns a 400 status', async () => {
    const mockResponse = {
      status: 400,
      data: {
        message: 'Page number out of range',
        currentPage: 1,
        totalPages: 0,
      },
    };
    (get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await GetAllPictures(page, limit);

    expect(get).toHaveBeenCalledWith(
      `${GlobalVariables.apiHost}/pictures?page=${page}&limit=${limit}`,
      token,
    );
    expect(result).toEqual(mockResponse.data);
  });

  it('should return an empty array when the response status is not 401', async () => {
    localStorage.removeItem('token');
    (get as jest.Mock).mockResolvedValue({ status: 401 });

    const result = await GetAllFavoritePictures(page, limit);

    expect(result).toEqual([]);
  });
});
