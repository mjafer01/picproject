import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

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
    toast.dismiss();
    toast.error(
      'Something has gone horribly wrong. Please contact support for further details',
    );
    throw error;
  }
};
export default post;
