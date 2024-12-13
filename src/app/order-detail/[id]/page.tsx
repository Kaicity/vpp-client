'use client';

import { getOrderDetail } from '@/api/order';
import { useApp } from '@/context/AppContext';
import type { Cart } from '@/types/cart';
import type { OrderDetail } from '@/types/orderDetail';
import { numericToMoney } from '@/utils/formatMoney';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductDefault from 'public/product_default.webp';

const OrderDetail = () => {
  const { user } = useApp();
  const { id } = useParams<{ id: string }>();

  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [carts, setCarts] = useState<Cart[]>([]);

  useEffect(() => {
    const fetchOrderDetailById = async () => {
      try {
        const data = await getOrderDetail(id);
        setOrderDetail(data);
        setCarts(data?.orderDetails);
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    fetchOrderDetailById();
  }, []);

  return (
    <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mt-12">
      <div className="px-4 pt-8">
        <p className="text-xl font-medium">Chi tiết đơn hàng</p>
        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
          {carts.map((cart) => (
            <div key={cart?.id} className="flex flex-col rounded-lg bg-white sm:flex-row">
              <Image
                width={72}
                height={96}
                className="m-2 h-24 w-28  border object-cover object-center"
                src={cart?.imageUrl || ProductDefault}
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">{cart?.name}</span>
                <span className="float-right text-gray-400">
                  {numericToMoney(cart?.price!)} / số lượng: {cart?.quantity}
                </span>
                <p className="text-lg font-bold">{numericToMoney(cart?.price! * cart?.quantity)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 bg-gray-50 h-max py-2 px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">Thông tin đơn hàng</p>
        <p className="text-gray-400">Thông tin của bạn để tiến hành mua hàng</p>

        <div className="mt-4">
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm text-gray-600">{user?.email || 'Chưa cập nhật'}</p>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium">Tên khách hàng</p>
          <p className="text-sm text-gray-600">{user?.name || 'Chưa cập nhật'}</p>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium">Địa chỉ giao hàng</p>
          <p className="text-sm text-gray-600">{orderDetail?.address || 'Chưa cập nhật'}</p>
        </div>

        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Tổng đơn hàng</p>
            <p className="font-semibold text-gray-900">
              {numericToMoney(carts.reduce((total, item) => total + item?.price * item?.quantity, 0))}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Phí vận chuyển</p>
            <p className="font-semibold text-gray-900">{numericToMoney(0)}</p>
          </div>
        </div>

        {/* Tổng cộng */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Tổng cộng</p>
          <p className="text-2xl font-semibold text-gray-900">{numericToMoney(orderDetail?.orderTotal!)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
