'use client';

import { useParams, useRouter } from 'next/navigation';
import Add from '@/components/Add';
import ProductImage from '@/components/ProductImages';
import React, { useEffect, useState } from 'react';
import type { Product } from '@/types/product';
import { getProductById } from '@/api/product';
import { numericToMoney } from '@/utils/formatMoney';
import { useApp } from '@/context/AppContext';
import { createCart } from '@/api/cart';
import type { ItemCart } from '@/types/cart';
import ModalDialog from '@/components/ModalDialog';
import Toast from '@/components/Toast';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ProductDetailPage = () => {
  const router = useRouter();

  const { isLoggedIn, fetchCarts, closeCart } = useApp();
  const { id } = useParams<{ id: string }>();

  // PRODUCT
  const [product, setProduct] = useState<Product | null>(null);

  //CART ITEM
  const [quantity, setQuantity] = useState(1);
  const [messageAddItemSuccess, setMessageAddItemSuccess] = useState(false);
  const [contentMessage, setContentMessage] = useState<string | ''>('');

  // MESSAGE
  const [message, setMessage] = useState(false);

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

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddItemToCart = async () => {
    try {
      if (isLoggedIn) {
        const itemCart: ItemCart = {
          productId: product!.id,
          quantity: quantity,
        };

        const request = await createCart(itemCart);
        if (request) {
          showMessageToast();
          setContentMessage('Đã thêm vào giỏ hàng');

          //Close modal cart và fetch lại cart, quay lại trang sản phẩm mua tiếp ^ ^
          closeCart();
          fetchCarts();
        }
      } else {
        setMessage(true);
      }
    } catch (error: any) {
      showMessageToast();
      setContentMessage(error?.message);
      throw new Error(error);
    }
  };

  const showMessageToast = () => {
    setMessageAddItemSuccess(true);
    setTimeout(() => {
      setMessageAddItemSuccess(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    handleAddItemToCart();
    if (isLoggedIn) {
      router.push('/cart');
    }
  };

  const handleFavorite = () => {};

  const successIconSvg = (
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
    </svg>
  );

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
          <h3 className="text-xl text-gray-500 line-through">{numericToMoney(product?.price! + 100000)}đ</h3>
          <h1 className="text-2xl font-medium">{numericToMoney(product?.price!)}</h1>
        </div>
        <div className="h-[2px] bg-gray-100"></div>
        {/* Đối với thương mại điện tử quần áo thì thêm sizes và colors */}

        <Add
          handleAddItemToCart={handleAddItemToCart}
          handleBuyNow={handleBuyNow}
          hanldeFavorite={handleFavorite}
          onQuantityChange={handleQuantityChange}
        />

        <div className="h-[2px] bg-gray-100"></div>

        <div className="text-sm">
          <h4 className="font-medium mb-4">Mô tả sản phẩm</h4>
          <p>{product?.description}</p>
        </div>
      </div>

      {/* MESSAGE DIALOG */}
      {message && (
        <ModalDialog
          title="Thông báo"
          content="Vui lòng đăng nhập để tiếp tục mua hàng"
          handleMain={() => router.push('/login')}
          handlePrev={() => setMessage(false)}
          titleButtonMain="Đăng nhập ngay"
          titleButtonPrev="Để sau"
          open={message}
          setOpen={setMessage}
          icon={React.createElement(ExclamationTriangleIcon, {
            'aria-hidden': 'true',
            className: 'size-6 text-red-600',
          })}
        />
      )}

      {/* TOAST MESSAGE */}
      {messageAddItemSuccess && <Toast content={contentMessage || ''} icon={successIconSvg} />}
    </div>
  );
};

export default ProductDetailPage;
