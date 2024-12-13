import type { ItemOrder, Order, OrderPagination } from '@/types/order';
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

export const getOrders = async (
  pageNumber: number,
  pageSize: number,
  filters: FilterParams,
): Promise<OrderPagination> => {
  try {
    const response = await instance.get(`order/user-orders`, {
      params: {
        pageNumber,
        pageSize,
        trackingNumber: filters.trackingNumber,
        sortBy: filters.sortBy,
      },
    });

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
      throw new Error('Failed to fetch orders');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const getOrderDetail = async (trackingNumber: string): Promise<OrderDetail> => {
  try {
    const response = await instance.get(`order/details/${trackingNumber}`);

    if (response.data?.isSuccess && response.data.result) {
      return response?.data?.result;
    } else {
      throw new Error('Failed to request get order detail');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};
