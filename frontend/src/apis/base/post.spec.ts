import axios from 'axios';
import mockAxios from 'jest-mock-axios';
import post from './Post';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('post', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should post data successfully without token', async () => {
    const url = 'http://example.com/api/data';
    const requestData = { key: 'value' };
    const responseData: any = {
      success: true,
      data: { result: 'success' },
    };
    mockedAxios.post.mockResolvedValue({ data: responseData });

    const response = await post(url, requestData);

    expect(mockedAxios.post).toHaveBeenCalledWith(url, requestData, {
      headers: {},
    });
    expect(response.data).toEqual(responseData);
  });

  it('should post data successfully with token', async () => {
    const url = 'http://example.com/api/data';
    const requestData = { key: 'value' };
    const token = 'Bearer token';
    const responseData: any = {
      success: true,
      data: { result: 'success' },
    };
    mockedAxios.post.mockResolvedValue({ data: responseData });

    const response = await post(url, requestData, token);

    expect(mockedAxios.post).toHaveBeenCalledWith(url, requestData, {
      headers: { Authorization: token },
    });
    expect(response.data).toEqual(responseData);
  });

  it('should throw an error when the request fails', async () => {
    const url = 'http://example.com/api/data';
    const requestData = { key: 'value' };
    const errorMessage = 'Network Error';
    mockedAxios.post.mockRejectedValue(new Error(errorMessage));

    await expect(post(url, requestData)).rejects.toThrow(errorMessage);
  });
});
