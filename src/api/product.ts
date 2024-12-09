import { instance } from './index';
import type { Product } from '@/types/product';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await instance.get('/products');

    if (response.data?.isSuccess && response.data.result) {
      return response.data.result.items;
    } else {
      throw new Error('Failed to fetch products');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await instance.get(`/products/${id}`);

    if (response.data?.isSuccess && response.data.result) {
      return response.data.result;
    } else {
      throw new Error('Failed to get product by id');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};
