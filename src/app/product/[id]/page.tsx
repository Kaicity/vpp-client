'use client';

import { useParams } from 'next/navigation';
import Add from '@/components/Add';
import ProductImage from '@/components/ProductImages';
import { useEffect, useState } from 'react';
import type { Product } from '@/types/product';
import { getProductById } from '@/api/product';
import { numericToMoney } from '@/utils/formatMoney';
import Spinner from '@/components/Spinner';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    fetchProductById();
  }, []);

  if (!product) {
    return <div className="text-sm text-center h-52 py-12">Không tìm thấy sản phẩm này</div>;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="px-4 md:px-8 lg:px-6 xl:32 2xl:px-32 relative flex flex-col lg:flex-row gap-16 mt-12">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImage
          imageUrl1={product?.imageUrl1 || ''}
          imageUrl2={product?.imageUrl2 || ''}
          imageUrl3={product?.imageUrl3 || ''}
          imageUrl4={product?.imageUrl4 || ''}
        />
      </div>
      {/* TEXT */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product?.name}</h1>
        <p className="text-gray-500">
          Hãy để quyển nhật ký này trở thành người bạn lưu giữ mọi cảm xúc, ý tưởng và kế hoạch của bạn. Với thiết kế
          tinh tế, bìa cứng sang trọng hoặc bìa da mềm mại, sản phẩm mang lại cảm giác chắc chắn và dễ chịu khi sử dụng
        </p>
        <div className="h-[2px] bg-gray-100"></div>
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">{numericToMoney(product?.price + 100000)}đ</h3>
          <h1 className="text-2xl font-medium">{numericToMoney(product?.price)}</h1>
        </div>
        <div className="h-[2px] bg-gray-100"></div>
        {/* Đối với thương mại điện tử quần áo thì thêm sizes và colors */}

        <Add />

        <div className="h-[2px] bg-gray-100"></div>

        <div className="text-sm">
          <h4 className="font-medium mb-4">Mô tả sản phẩm</h4>
          <p>{product?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
