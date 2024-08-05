import get from '../base/Get';
import GlobalVariables from '../../constants/Global';
import GetAllPictures from './GetAllPicturesApi';
import mockAxios from 'jest-mock-axios';

jest.mock('../base/Get', () => jest.fn());

describe('GetAllPictures', () => {
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

  it('should return pictures data when the request is successful', async () => {
    const mockResponse = {
      status: 200,
      data: {
        currentPage: 1,
        hasNextPage: true,
        totalPages: 2,
        pictures: [
          {
            id: 1,
            url: 'https://example.com/picture1.jpg',
            title: 'Picture 1',
            createdAt: '2024-08-04T19:49:29.000Z',
            isFavorite: false,
            user: { id: 1, username: 'user1' },
          },
          {
            id: 2,
            url: 'https://example.com/picture2.jpg',
            title: 'Picture 2',
            createdAt: '2024-08-05T19:49:29.000Z',
            isFavorite: true,
            user: { id: 2, username: 'user2' },
          },
        ],
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

  it('should return an empty array when the response status is not 200', async () => {
    const mockResponse = { status: 400 };
    (get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await GetAllPictures(page, limit);

    expect(result).toEqual([]);
  });
});
