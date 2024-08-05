import axios, { AxiosResponse } from 'axios';

interface ApiResponse {
  success: boolean;
  data: any;
}

export const post = async (
  url: string,
  data?: any,
  token?: string,
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const headers = token ? { Authorization: token } : {};
    const response: AxiosResponse<ApiResponse> = await axios.post(url, data, {
      headers,
    });
    return response;
  } catch (error) {
    // Handle error accordingly
    //console.log('Error posting data:', error);
    throw error;
  }
};
export default post;
