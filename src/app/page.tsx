'use client';

import Image from 'next/image';
import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import Slider from '@/components/Slider';
import { useEffect, useState } from 'react';
import { getCatalogs } from '@/api/catalog';
import type { Product } from '@/types/product';
import { getProducts } from '@/api/product';
import ImageCover_1 from 'public/imageCover_1.webp';
import ImageCover_2 from 'public/imageCover_2.webp';
import { useRouter } from 'next/navigation';
import Banner_1 from 'public/Banner_1.webp';
import Banner_2 from 'public/Banner_2.webp';
import Banner_3 from 'public/Banner_3.webp';
import Banner_4 from 'public/Banner_4.webp';
import Banner_5 from 'public/Banner_5.webp';

const banners = [
  {
    img: Banner_1,
    alt: 'Banner Ưu Đãi',
    title: 'Ưu Đãi Cuối Năm',
    description: 'Giảm đến 50% cho tất cả các sản phẩm, đừng bỏ lỡ cơ hội này!',
  },
  {
    img: Banner_2,
    alt: 'Banner Sản Phẩm Mới',
    title: 'Sản Phẩm Mới',
    description: 'Khám phá những mẫu sản phẩm mới nhất trong bộ sưu tập của chúng tôi.',
  },
  {
    img: Banner_3,
    alt: 'Banner Bộ Sưu Tập',
    title: 'Bộ Sưu Tập Đặc Biệt',
    description: 'Bộ sưu tập độc đáo với thiết kế hiện đại và chất lượng cao.',
  },
  {
    img: Banner_4,
    alt: 'Banner Giao Hàng Miễn Phí',
    title: 'Giao Hàng Miễn Phí',
    description: 'Miễn phí giao hàng cho tất cả các đơn hàng trong tuần này.',
  },
  {
    img: Banner_5,
    alt: 'Banner Sự Kiện',
    title: 'Sự Kiện Đặc Biệt',
    description: 'Tham gia sự kiện cuối tuần và nhận ngay phần quà hấp dẫn!',
  },
];

const HomePage = () => {
  const router = useRouter();

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
        <ProductList showAddCart={false} products={products} addToCart={() => {}} />
      </div>
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="mt-4 mb-8 w-max ring-lama ring-1 px-6 py-3 font-medium text-lama hover:bg-lama hover:text-white transition"
          onClick={() => router.push('/list')}
        >
          Xem thêm
        </button>
      </div>
      <div className="mt-12">
        <h1 className="text-2xl px-4 md:px-8 lg:px-6 xl:32 2xl:px-32 mb-12">Loại sản phẩm</h1>
        <CategoryList catalogs={catalogs} />
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-6 xl:32 2xl:px-32">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <Image src={ImageCover_1} alt="Descriptive Alt Text" width={810} height={810} className="object-cover" />
          <Image src={ImageCover_2} alt="Descriptive Alt Text" width={810} height={810} className="object-cover" />
        </div>
      </div>

      <div className="relative w-full h-72 mt-12 bg-cover bg-center">
        <div className="absolute inset-0 bg-lama flex flex-col items-center justify-center text-white text-center">
          <h2 className="text-3xl md:text-5xl font-bold">Ưu đãi cuối năm</h2>
          <p className="mt-4 text-lg md:text-xl">Giảm đến 50% cho tất cả sản phẩm!</p>
          <button className="mt-6 bg-white text-black px-6 py-3 rounded-md shadow-md">Khám phá ngay</button>
        </div>
      </div>

      <div className="mt-12 px-4 md:px-8 lg:px-6 xl:px-32">
        <h2 className="text-2xl font-semibold mb-6">Khám phá các chủ đề</h2>
        <div className="flex overflow-x-auto gap-4">
          {banners.map((banner, index) => (
            <div key={index} className="min-w-[300px] md:min-w-[400px] rounded-lg overflow-hidden shadow-md">
              <Image src={banner.img} alt={banner.alt} width={400} height={250} className="object-cover" />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold">{banner.title}</h3>
                <p className="text-sm text-gray-600">{banner.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
