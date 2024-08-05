import axios, { AxiosResponse } from 'axios';

interface ApiResponse {
  success: boolean;
  data: any;
}

export const get = async (
  url: string,
  token?: string,
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const headers = token ? { Authorization: token } : {};
    const response: AxiosResponse<ApiResponse> = await axios.get(url, {
      headers,
    });
    return response;
  } catch (error) {
    //console.error('Error posting data:', error);
    throw error;
  }
};
export default get;
