export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
  imageUrl4: string;
  stock: number;
  catalogId: number;
  isDeleted: boolean;
  catalogName: string;
  createDate: Date;
  updateDate: Date;
}
