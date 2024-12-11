export interface Order {
  id: number;
  name: string;
  orderDate: string;
  shippingDate: Date;
  address: string;
  orderStatus: number;
  paymentMethod: number;
  paymentStatus: number;
  orderTotal: number;
  trackingNumber: string;
}

export interface ItemOrder {
  shippingDate: Date;
  address: string;
  paymentMethod: number;
}
