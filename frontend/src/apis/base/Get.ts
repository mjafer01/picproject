import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

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
    if ((error as any)?.response?.data) {
      return {
        status: 400,
        data: (error as any)?.response?.data,
      } as AxiosResponse<ApiResponse>;
    }
    toast.dismiss();
    toast.error(
      'Something has gone horribly wrong. Please contact support for further details',
    );
    throw error;
  }
};
export default get;
