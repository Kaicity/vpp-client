'use client';

import { useApp } from '@/context/AppContext';
import { numericToMoney } from '@/utils/formatMoney';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ProductDefault from 'public/product_default.webp';
import Image from 'next/image';
import type { ItemOrder } from '@/types/order';
import { createOrder } from '@/api/order';
import { formatDate } from '@/utils/formatDate';
import ModalDialog from '@/components/ModalDialog';
import { PaymentMethod } from '@/enums/paymentMethod';
import Banking from 'public/banking.png';
import Cash from 'public/cash.png';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const CheckoutCartPage = () => {
  const { carts, fetchCarts, user } = useApp();
  const router = useRouter();

  // ORDER
  const [formData, setFormData] = useState<ItemOrder>({
    shippingDate: new Date(),
    paymentMethod: PaymentMethod.BankTransfer,
    address: '',
  });

  //MESSAGE
  const [message, setMessage] = useState(false);

  useEffect(() => {
    // Chỉ kiểm tra khi carts đã được khởi tạo
    if (carts && carts.length === 0) {
      router.push('/');
    }
  }, [carts, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'paymentMethod' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const requestData = {
        ...formData,
        shippingDate: formatDate(formData.shippingDate),
      };
      const request = await createOrder(requestData);

      if (request) {
        setMessage(true);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mt-12">
      <div className="px-4 pt-8">
        <p className="text-xl font-medium">Giỏ hàng</p>
        <p className="text-gray-400">Vui lòng kiểm tra kỹ và chọn phương thức thanh toán chính xác</p>
        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
          <div className="divide-y">
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

        <p className="mt-8 text-lg font-medium">Phương thức thanh toán</p>
        <form className="mt-5 grid gap-6" onSubmit={handleSubmit}>
          {/* Radio 1 */}
          <div className="relative">
            <input
              className="peer hidden"
              id="radio_1"
              type="radio"
              name="paymentMethod"
              value={PaymentMethod.BankTransfer}
              checked={formData.paymentMethod === PaymentMethod.BankTransfer}
              onChange={handleChange}
            />
            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
            <label
              htmlFor="radio_1"
              className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            >
              <Image className="w-14 object-contain" src={Banking} alt="" />
              <div className="ml-5">
                <span className="mt-2 font-semibold">Chuyển khoản ngân hàng</span>
                <p className="text-slate-500 text-sm leading-6">Nhận hàng từ: 2-4 ngày</p>
              </div>
            </label>
          </div>

          {/* Radio 2 */}
          <div className="relative">
            <input
              className="peer hidden"
              id="radio_2"
              type="radio"
              name="paymentMethod"
              value={PaymentMethod.CashOnDelivery}
              checked={formData.paymentMethod === PaymentMethod.CashOnDelivery}
              onChange={handleChange}
            />
            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
            <label
              htmlFor="radio_2"
              className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            >
              <Image className="w-14 object-contain" src={Cash} alt="" />
              <div className="ml-5">
                <span className="mt-2 font-semibold">Tiền mặt</span>
                <p className="text-slate-500 text-sm leading-6">Nhận hàng từ: 1-2 ngày</p>
              </div>
            </label>
          </div>
        </form>
      </div>

      <div className="mt-10 bg-gray-50 h-max py-2 px-4 pt-8 lg:mt-0">
        <form onSubmit={handleSubmit}>
          <p className="text-xl font-medium">Thông tin đơn hàng</p>
          <p className="text-gray-400">Hãy điền đủ thông tin của bạn để tiến hành mua hàng</p>
          <div className="">
            <label className="mt-4 mb-2 block text-sm font-medium">Email</label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
                disabled={true}
                value={user?.email}
                required
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label className="mt-4 mb-2 block text-sm font-medium">Tên khách hàng</label>
            <div className="relative">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
                disabled={true}
                value={user?.name}
                required
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2" // Updated here
                >
                  <path
                    strokeLinecap="round" // Updated here
                    strokeLinejoin="round" // Updated here
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>

            <label className="mt-4 mb-2 block text-sm font-medium">Địa chỉ giao hàng</label>
            <div className="relative">
              <input
                type="text"
                id="address"
                name="address"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="vd: 224 Nguyễn Chí Thanh Quận 10 Tphcm"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
            </div>

            {/* <label className="mt-4 mb-2 block text-sm font-medium">Card Details</label>
              <div className="flex">
                <div className="relative w-7/12 flex-shrink-0">
                  <input
                    type="text"
                    id="card-no"
                    name="card-no"
                    className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                      <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  name="credit-expiry"
                  className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="MM/YY"
                />
                <input
                  type="text"
                  name="credit-cvc"
                  className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="CVC"
                />
              </div>
              <label className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
              <div className="flex flex-col sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input
                    type="text"
                    id="billing-address"
                    name="billing-address"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Street Address"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <img
                      className="h-4 w-4 object-contain"
                      src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                      alt=""
                    />
                  </div>
                </div>
                <select
                  name="billing-state"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="State">State</option>
                </select>
                <input
                  type="text"
                  name="billing-zip"
                  className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="ZIP"
                />
              </div> */}

            {/* TOTAL */}
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
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Tổng cộng</p>
              <p className="text-2xl font-semibold text-gray-900">
                {numericToMoney(carts.reduce((total, item) => total + item?.price * item?.quantity, 0))}
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white hover:bg-slate-800 transition"
          >
            Đặt hàng
          </button>
        </form>
      </div>

      {/* MESSAGE DIALOG */}
      {message && (
        <ModalDialog
          title="Thông báo"
          content="Đặt hàng thành công"
          handleMain={() => (window.location.href = '/list')}
          handlePrev={() => (window.location.href = '/')}
          titleButtonMain="Tiếp tục mua hàng"
          titleButtonPrev="Về trang chủ"
          open={message}
          setOpen={setMessage}
          icon={React.createElement(CheckCircleIcon, {
            'aria-hidden': 'true',
            className: 'size-6 text-green-500',
          })}
        />
      )}
    </div>
  );
};

export default CheckoutCartPage;
