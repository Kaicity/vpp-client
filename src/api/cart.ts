import type { ItemCart, Cart } from '@/types/cart';
import { instance } from '.';

export const createCart = async (itemCart: ItemCart): Promise<boolean> => {
  try {
    const response = await instance.post(`cart/add-item`, itemCart);

    if (response.data?.isSuccess) {
      return response?.data?.isSuccess;
    } else {
      throw new Error('Failed to request add item to cart');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const getCarts = async (): Promise<Cart[]> => {
  try {
    const response = await instance.get(`cart/items`);

    if (response.data?.isSuccess && response.data?.result) {
      return response?.data?.result?.items;
    } else {
      throw new Error('Failed to request get item of cart');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};
