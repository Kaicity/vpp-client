'use client';

import Image from 'next/image';
import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import Slider from '@/components/Slider';
import { useEffect, useState } from 'react';
import { getCatalogs } from '@/api/catalog';
import type { Product } from '@/types/product';
import { getProducts } from '@/api/product';

const HomePage = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 4,
    totalItems: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    fetchProduct(pagination.pageNumber, pagination.pageSize);
    fetchCatalogs();
  }, [pagination.pageNumber, pagination.pageSize]);

  const fetchCatalogs = async () => {
    try {
      const data = await getCatalogs();
      if (data) {
        setCatalogs(data);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const fetchProduct = async (pageNumber: number, pageSize: number) => {
    try {
      setLoading(true);
      const { items, pagination } = await getProducts(pageNumber, pageSize);
      setTimeout(() => {
        if (items && pagination) {
          setProducts(items);
          setPagination(pagination);
        }
        setLoading(false);
      }, 500);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-6 xl:32 2xl:px-32">
        <h1 className="text-2xl">Sản phẩm đặc trưng</h1>
        <ProductList products={products} addToCart={() => {}} />
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-6 xl:32 2xl:px-32 mb-12">Loại sản phẩm</h1>
        <CategoryList catalogs={catalogs} />
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-6 xl:32 2xl:px-32">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <Image
            src="https://images.pexels.com/photos/983830/pexels-photo-983830.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Descriptive Alt Text"
            width={810}
            height={810}
            className="object-cover"
          />
          <Image
            src="https://images.pexels.com/photos/35202/eraser-office-supplies-office-office-accessories.jpg?auto=compress&cs=tinysrgb&w=600"
            alt="Descriptive Alt Text"
            width={810}
            height={810}
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-6 xl:32 2xl:px-32">
        <h1 className="text-2xl">Sản phẩm mới nhất</h1>
        <ProductList products={products} addToCart={() => {}} />
      </div>
    </div>
  );
};

export default HomePage;
