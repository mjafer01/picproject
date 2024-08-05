import get from '../base/Get';
import GlobalVariables from '../../constants/Global';
import GetAllFavoritePictures from './GetAllFavoritePicturesApi';
import mockAxios from 'jest-mock-axios';

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
  it('should return an empty array when the response status is not 200', async () => {
    (get as jest.Mock).mockResolvedValue({ status: 400 });

    const result = await GetAllFavoritePictures(page, limit);

    expect(result).toEqual([]);
  });

  it('should return an empty array when the response status is not 401', async () => {
    localStorage.removeItem('token');
    (get as jest.Mock).mockResolvedValue({ status: 401 });

    const result = await GetAllFavoritePictures(page, limit);

    expect(result).toEqual([]);
  });
});
