export interface Cart {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

export interface ItemCart {
  productId: number;
  quantity: number;
}
