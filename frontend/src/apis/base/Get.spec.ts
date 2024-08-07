import axios from 'axios';
import { toast } from 'react-toastify';
import get from './Get'; // Adjust the path as necessary

jest.mock('axios');
jest.mock('react-toastify');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedToast = toast as jest.Mocked<typeof toast>;

describe('get', () => {
  afterEach(() => {
    jest.clearAllMocks();
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

  it('should handle and return response data in case of an error response from API', async () => {
    const url = 'http://example.com/api/data';
    const errorResponseData = {
      message: 'Page number out of range',
      currentPage: 1,
      totalPages: 0,
    };
    mockedAxios.get.mockRejectedValue({
      response: {
        status: 400,
        data: errorResponseData,
      },
    });

    const response = await get(url).catch((err) => err.response);

    expect(mockedAxios.get).toHaveBeenCalledWith(url, { headers: {} });
    expect(response.status).toBe(400);
    expect(response.data).toEqual(errorResponseData);
  });

  it('should throw an error and show toast when the request fails without a response', async () => {
    const url = 'http://example.com/api/data';
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(get(url)).rejects.toThrow(errorMessage);
    expect(mockedToast.dismiss).toHaveBeenCalled();
    expect(mockedToast.error).toHaveBeenCalledWith(
      'Something has gone horribly wrong. Please contact support for further details',
    );
  });
});
