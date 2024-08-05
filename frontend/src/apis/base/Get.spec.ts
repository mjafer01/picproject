import axios from 'axios';
import mockAxios from 'jest-mock-axios';
import get from './Get';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('get', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should fetch data successfully without token', async () => {
    const url = 'http://example.com/api/data';
    const responseData: any = { success: true, data: { key: 'value' } };
    mockedAxios.get.mockResolvedValue({ data: responseData });

    const response = await get(url);

    expect(mockedAxios.get).toHaveBeenCalledWith(url, { headers: {} });
    expect(response.data).toEqual(responseData);
  });

  it('should fetch data successfully with token', async () => {
    const url = 'http://example.com/api/data';
    const token = 'Bearer token';
    const responseData: any = { success: true, data: { key: 'value' } };
    mockedAxios.get.mockResolvedValue({ data: responseData });

    const response = await get(url, token);

    expect(mockedAxios.get).toHaveBeenCalledWith(url, {
      headers: { Authorization: token },
    });
    expect(response.data).toEqual(responseData);
  });

  it('should throw an error when the request fails', async () => {
    const url = 'http://example.com/api/data';
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(get(url)).rejects.toThrow(errorMessage);
  });
});
