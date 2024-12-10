import { instance } from './index';
import type { Product, ProductPagination } from '@/types/product';

export const getProducts = async (pageNumber: number, pageSize: number): Promise<ProductPagination> => {
  try {
    const response = await instance.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}`);

    if (response.data?.isSuccess && response.data.result) {
      return {
        items: response.data.result.items,
        pagination: {
          pageNumber: response.data.result.pageNumber,
          pageSize: response.data.result.pageSize,
          totalItems: response.data.result.totalItems,
          totalPages: response.data.result.totalPages,
        },
      };
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
