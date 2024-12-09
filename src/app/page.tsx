'use client';

import Image from 'next/image';
import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import Slider from '@/components/Slider';
import ProductFeatureOne from '../../../public/productFeature_1.webp';
import ProductFeatureTwo from '../../../public/productFeature_2.webp';
import ModalDialog from '@/components/ModalDialog';

const products = [
  {
    id: 'product-1',
    name: 'Combo 5 Ream giấy A3 80',
    price: 70000,
    description: 'Giấy ghi chú Pastel Thiên Long gồm 100 tờ trong 1 xấp với định lượng',
  },
  {
    id: 'product-2',
    name: 'Combo 10 Ream giấy A4 70',
    price: 90000,
    description: 'Giấy A4 với chất lượng cao, phù hợp cho văn phòng',
  },
  {
    id: 'product-3',
    name: 'Combo 5 Ream giấy A3 100',
    price: 75000,
    description: 'Giấy ghi chú cao cấp',
  },
  {
    id: 'product-4',
    name: 'Combo 5 Ream giấy A3 120',
    price: 80000,
    description: 'Giấy ghi chú cao cấp cho văn phòng',
  },
];

const HomePage = () => {
  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-6 xl:32 2xl:px-32">
        <h1 className="text-2xl">Sản phẩm đặc trưng</h1>
        <ProductList products={[]} />
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-6 xl:32 2xl:px-32 mb-12">Loại sản phẩm</h1>
        <CategoryList />
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
        <ProductList products={[]} />
      </div>
    </div>
  );
};

export default HomePage;
