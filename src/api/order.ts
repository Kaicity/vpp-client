import type { ItemOrder, Order } from '@/types/order';
import { instance } from '.';
import type { OrderDetail } from '@/types/orderDetail';

interface FilterParams {
  trackingNumber?: string;
  sortBy?: string;
}

export const createOrder = async (itemOrder: ItemOrder): Promise<boolean> => {
  try {
    const response = await instance.post(`order/create`, itemOrder);

    if (response.data?.isSuccess) {
      return response?.data?.isSuccess;
    } else {
      throw new Error('Failed to request create order');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const cancelOrder = async (trackingNumber: string): Promise<boolean> => {
  try {
    const response = await instance.post(`order/cancel/${trackingNumber}`);

    if (response.data?.isSuccess) {
      return response?.data?.isSuccess;
    } else {
      throw new Error('Failed to request cancel order');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const getOrders = async (pageNumber: number, pageSize: number, filters: FilterParams): Promise<Order[]> => {
  try {
    // Xây dựng URL query
    let query = `order/user-orders?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    if (filters?.trackingNumber) {
      query += `&trackingNumber=${encodeURIComponent(filters.trackingNumber)}`;
    }
    if (filters?.sortBy) {
      query += `&sortBy=${encodeURIComponent(filters.sortBy)}`;
    }

    const response = await instance.get(query);

    if (response.data?.isSuccess && response.data.result) {
      return response.data.result.items;
    } else {
      throw new Error('Failed to fetch orders');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const getOrderDetail = async (trackingNumber: string): Promise<boolean> => {
  try {
    const response = await instance.get(`order/details/${trackingNumber}`);

    if (response.data?.isSuccess) {
      return response?.data?.isSuccess;
    } else {
      throw new Error('Failed to request get order detail');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};
