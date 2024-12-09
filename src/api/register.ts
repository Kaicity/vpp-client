import { instance } from './index';
import type { Register } from '@/types/register';

export const registerIsCustomer = async (register: Register): Promise<string> => {
  try {
    const response = await instance.post('/auth/register/customer', register);

    if (response.data?.isSuccess) {
      return response.data.message;
    } else {
      throw new Error('Failed to request data customer');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.result[0]?.description;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};
