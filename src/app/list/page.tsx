'use client';

import Image from 'next/image';
import BannerProduct from '../../../public/bannerProduct.png';
import Filter from '@/components/Filtrer';
import ProductList from '@/components/ProductList';
import React, { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { getProducts } from '@/api/product';
import Spinner from '@/components/Spinner';
import { useApp } from '@/context/AppContext';
import ModalDialog from '@/components/ModalDialog';
import { useRouter } from 'next/navigation';
import { getCatalogs } from '@/api/catalog';
import Toast from '@/components/Toast';
import { ItemCart } from '@/types/cart';
import { createCart } from '@/api/cart';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ListPage = () => {
  const { isLoggedIn, closeCart, fetchCarts } = useApp();
  const router = useRouter();

  // PRODUCTS
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 24,
    totalItems: 0,
    totalPages: 0,
  });

  // CATALOGS
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [filters, setFilters] = useState({
    catalogId: '',
    minPrice: '',
    maxPrice: '',
    name: '',
  });

  // CART ITEM
  const [messageAddItemSuccess, setMessageAddItemSuccess] = useState(false);
  const [contentMessage, setContentMessage] = useState<string | ''>('');

  //MESSAGE RESPONSE
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    fetchProducts(pagination.pageNumber, pagination.pageSize);
    fetchCatalogs();
  }, [pagination.pageNumber, pagination.pageSize, filters]);

  const fetchProducts = async (pageNumber: number, pageSize: number) => {
    try {
      setLoading(true);
      const { items, pagination } = await getProducts(pageNumber, pageSize, filters);
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

  const handleAddToCart = async (product: Product) => {
    try {
      if (isLoggedIn) {
        const itemCart: ItemCart = {
          productId: product?.id,
          quantity: 1,
        };

        const request = await createCart(itemCart);
        if (request) {
          showMessageToast();
          setContentMessage('Đã thêm vào giỏ hàng');

          //Close modal cart và fetch lại cart
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

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, pageNumber: newPage }));
  };

  const successIconSvg = (
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative">
      {/* BANNER */}
      <div className="hidden bg-pink-50 p-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Siêu ưu đãi 12.12 Sale 50% các <br /> sản phẩm được yêu thích nhất
          </h1>
          <button className="bg-lama text-white w-max py-3 px-5 text-sm">Mua ngay</button>
        </div>
        <div className="relative w-1/3">
          <Image src={BannerProduct} alt="" className="object-contain" />
        </div>
      </div>

      {/* FILTER FOR PRODUCT */}
      <Filter
        catalogs={catalogs}
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          setPagination((prev) => ({ ...prev, pageNumber: 1 })); // Reset về trang đầu tiên
        }}
      />

      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">Tiện dụng cho bạn</h1>

      {loading ? (
        <div className="">
          <Spinner />
        </div>
      ) : (
        <div className="">
          <ProductList products={products} showAddCart={true} addToCart={handleAddToCart} />

          <div className="flex justify-center gap-2 mt-12">
            {/* PREVIOUS BUTTON */}
            <button
              className="px-4 py-2 bg-gray-300  disabled:opacity-50"
              onClick={() => handlePageChange(pagination.pageNumber - 1)}
              disabled={pagination.pageNumber === 1}
            >
              {'Trước'}
            </button>

            {/* PAGE NUMBERS */}
            <div className="flex gap-1">
              {Array.from({ length: pagination.totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 ${
                    pagination.pageNumber === index + 1 ? 'bg-lama text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* NEXT BUTTON */}
            <button
              className="px-4 py-2 bg-gray-300 disabled:opacity-50"
              onClick={() => handlePageChange(pagination.pageNumber + 1)}
              disabled={pagination.pageNumber === pagination.totalPages}
            >
              {'Sau'}
            </button>
          </div>
        </div>
      )}

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
      {messageAddItemSuccess && (
        <Toast
          content={contentMessage || ''}
          icon={successIconSvg} // Truyền SVG tùy chỉnh
        />
      )}
    </div>
  );
};

export default ListPage;
