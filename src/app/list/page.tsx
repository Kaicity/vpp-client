'use client';

import Image from 'next/image';
import BannerProduct from '../../../public/bannerProduct.png';
import Filter from '@/components/Filtrer';
import ProductList from '@/components/ProductList';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { getProducts } from '@/api/product';
import Spinner from '@/components/Spinner';
import PaginationProduct from '@/components/pagination';
import { useApp } from '@/context/AppContext';
import ModalDialog from '@/components/ModalDialog';
import { useRouter } from 'next/navigation';
import { getCatalogs } from '@/api/catalog';

const ListPage = () => {
  const { isLoggedIn } = useApp();

  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 24,
    totalItems: 0,
    totalPages: 0,
  });
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [filters, setFilters] = useState({
    catalogId: '',
    minPrice: '',
    maxPrice: '',
    name: '',
  });

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
      const { items, pagination } = await getProducts(pageNumber, pageSize, {
        catalogId: filters.catalogId,
        minPrice: filters.minPrice,
        maxPrice: filters.minPrice,
        name: filters.name,
      });
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

  const handleAddToCart = () => {
    try {
      if (isLoggedIn) {
        alert('Loggin rồi thêm vào giỏ hàng đi');
      } else {
        setMessage(true);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, pageNumber: newPage }));
  };

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
          <Image src={BannerProduct} alt="" className="object-contain"></Image>
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
          <ProductList products={products} addToCart={handleAddToCart} />

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
        />
      )}
    </div>
  );
};

export default ListPage;
