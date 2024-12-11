import type { Cart } from './cart';

export interface OrderDetail {
  id: number;
  name: string;
  orderDate: Date;
  shippingDate: Date;
  address: string;
  orderStatus: number;
  paymentMethod: number;
  paymentStatus: number;
  orderTotal: number;
  orderDetails: Cart[];
}
