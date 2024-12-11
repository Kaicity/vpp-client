'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import ProductDefault from 'public/product_default.webp';

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {products.map((product) => (
        <div key={product.id} className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
          <Link href={`/product/${product.id}`} className="block">
            <div className="relative w-full h-80">
              <Image
                src={product?.imageUrl1 || ProductDefault}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover z-10 hover:opacity-0 transition-opacity easy duration-500"
              />
              <Image
                src={product?.imageUrl2 || ProductDefault}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover"
              />
            </div>
            <div className="flex justify-between mt-4">
              <span className="font-medium">{product?.name}</span>
              <span className="font-medium">{product?.price.toLocaleString()} đ</span>
            </div>
            <div className="text-sm text-gray-500">{product?.description}</div>
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="w-max ring-1 ring-lama text-lama py-2 px-4 text-xs hover:bg-lama hover:text-white"
          >
            Thêm vào giỏ
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
