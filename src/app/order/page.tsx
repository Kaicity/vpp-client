'use client';

import { cancelOrder, getOrders } from '@/api/order';
import ModalDialog from '@/components/ModalDialog';
import Spinner from '@/components/Spinner';
import { useApp } from '@/context/AppContext';
import { OrderStatus } from '@/enums/orderStatus';
import type { Order } from '@/types/order';
import { formatDateDisplay } from '@/utils/formatDate';
import { numericToMoney } from '@/utils/formatMoney';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Search from 'public/search.png';
import React, { useEffect, useState } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Toast from '@/components/Toast';
import Link from 'next/link';

const Order = () => {
  const { isLoggedIn, closeCart, fetchCarts } = useApp();
  const router = useRouter();

  const [filters, setFilters] = useState({
    trackingNumber: '',
    sortBy: '',
  });

  // ORDERS
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 8,
    totalItems: 0,
    totalPages: 0,
  });
  const [order, setOrder] = useState<Order | null>(null);

  const [messageAddItemSuccess, setMessageAddItemSuccess] = useState(false);
  const [contentMessage, setContentMessage] = useState<string | ''>('');

  //MESSAGE RESPONSE
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    fetchOrders(pagination.pageNumber, pagination.pageSize);
  }, [pagination.pageNumber, pagination.pageSize, filters]);

  const fetchOrders = async (pageNumber: number, pageSize: number) => {
    try {
      setLoading(true);
      const { items, pagination } = await getOrders(pageNumber, pageSize, filters);
      setTimeout(() => {
        if (items && pagination) {
          setOrders(items);
          setPagination(pagination);
        }
        setLoading(false);
      }, 500);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, pageNumber: newPage }));
  };

  const onFilterChange = () => {
    setPagination((prev) => ({ ...prev, pageNumber: 1 }));
    fetchOrders(1, pagination.pageSize);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, trackingNumber: e.target.value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: e.target.value,
    }));
  };

  const handleResetFilter = () => {
    setFilters({ trackingNumber: '', sortBy: '' });
    setPagination((prev) => ({ ...prev, pageNumber: 1 }));
    fetchOrders(1, pagination.pageSize);
  };

  const requestCancelOrder = (order: Order) => {
    setMessage(true);
    setOrder(order);
  };

  const handleAcceptCancelOrder = async () => {
    try {
      if (order) {
        const request = await cancelOrder(order?.trackingNumber);
        if (request) {
          showMessageToast();
          setContentMessage('Đã hủy đơn hàng');
          setMessage(false);
          fetchOrders(1, pagination.pageSize);
        }
      }
    } catch (error: any) {
      showMessageToast();
      setMessage(false);
      setContentMessage(error?.message);
      console.error(error.message);
    }
  };

  const showMessageToast = () => {
    setMessageAddItemSuccess(true);
    setTimeout(() => {
      setMessageAddItemSuccess(false);
    }, 1500);
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
    <div className="md:px-8 lg:px-16 xl:32 relativemax-w-screen-xl px-4 2xl:px-0 mt-12">
      <div className="mx-auto max-w-5xl">
        <div className="gap-4 sm:flex sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Đơn hàng của tôi</h2>

          <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
            <div>
              <form
                className="flex ic justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
                onSubmit={handleSearchSubmit}
              >
                <input
                  type="text"
                  name="trackingNumber"
                  placeholder="Tìm kiếm mã vận đơn.."
                  className="flex-1 bg-transparent outline-none tx-sm"
                  value={filters.trackingNumber}
                  onChange={handleSearchChange}
                />
                <button type="submit" className="cursor-pointer rounded-full px-1 hover:bg-slate-300">
                  <Image src={Search} alt="" width={16} height={16} className="object-cover"></Image>
                </button>
              </form>
            </div>

            <div>
              <label className="sr-only mb-2 block text-sm font-medium text-gray-900">Sắp xếp</label>
              <select
                id="duration"
                className="block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                value={filters.sortBy}
                onChange={handleSortChange}
              >
                <option value="">Sắp xếp</option>
                <option value="orderDate">Ngày đặt hàng</option>
                <option value="orderTotal">Giá tiền</option>
              </select>
            </div>

            <button onClick={handleResetFilter} className="px-4 py-2 bg-black text-white">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                <span>Reset</span>
              </div>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="">
            <Spinner />
          </div>
        ) : (
          <div className="mt-6 flow-root sm:mt-8">
            {orders.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <div key={order?.id} className="flex flex-wrap items-center gap-y-4 py-6">
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">Mã vận đơn:</dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900">
                        <a href="#" className="hover:underline">
                          {order?.trackingNumber}
                        </a>
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">Ngày đặt:</dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900">
                        {formatDateDisplay(order?.orderDate)}
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">Giá tiền:</dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900">
                        {numericToMoney(order?.orderTotal)}
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">Trạng thái:</dt>
                      <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                        {OrderStatus[order?.orderStatus] ?? 'Không xác định'}
                      </dd>
                    </dl>

                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                      <button
                        disabled={order?.orderStatus === OrderStatus.Cancelled}
                        onClick={() => requestCancelOrder(order)}
                        type="button"
                        className="w-full border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-50 lg:w-auto disabled:bg-slate-300 disabled:cursor-not-allowed disabled:text-gray-500 disabled:border-slate-300"
                      >
                        Hủy đơn hàng
                      </button>
                      <Link
                        href={`/order-detail/${order?.trackingNumber}`}
                        className="w-full inline-flex justify-center border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 lg:w-auto"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full text-center text-gray-500 text-lg">Không tìm thấy đơn hàng nào {':('}</div>
            )}
          </div>
        )}
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

      {/* MESSAGE DIALOG */}
      {message && (
        <ModalDialog
          title="Thông báo"
          content="Bạn muốn hủy đơn hàng"
          handleMain={handleAcceptCancelOrder}
          handlePrev={() => {
            setMessage(false);
            setOrder(null);
          }}
          titleButtonMain="Chấp nhận"
          titleButtonPrev="Hủy bỏ"
          open={message}
          setOpen={setMessage}
          icon={React.createElement(QuestionMarkCircleIcon, {
            'aria-hidden': 'true',
            className: 'size-6 text-yellow-500',
          })}
        />
      )}

      {/* TOAST MESSAGE */}
      {messageAddItemSuccess && <Toast content={contentMessage || ''} icon={successIconSvg} />}
    </div>
  );
};

export default Order;
