'use client';

import { useApp } from '@/context/AppContext';
import { numericToMoney } from '@/utils/formatMoney';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProductDefault from 'public/product_default.webp';
import CartNull from 'public/cart_null.webp';

const Cart = () => {
  const { carts, fetchCarts, user } = useApp();
  const router = useRouter();

  return (
    <div className="px-4 md:px-8 lg:px-6 xl:32 2xl:px-32 relative mt-12">
      <p className="text-xl font-medium">Giỏ hàng</p>
      <div className="mt-8 flex flex-col lg:flex-row gap-6">
        {/* Danh sách giỏ hàng */}
        <div className="flex-1 h-max space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
          {carts.length ? (
            <div className="divide-y">
              {carts.map((cart) => (
                <div key={cart?.id} className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <Image
                    width={72}
                    height={96}
                    className="m-2 h-24 w-28 border object-cover object-center"
                    src={cart?.imageUrl || ProductDefault}
                    alt=""
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{cart?.name}</span>
                    <span className="text-md text-gray-400">
                      {numericToMoney(cart?.price!)} / số lượng: {cart?.quantity}
                    </span>
                    <p className="text-md">{numericToMoney(cart?.price! * cart?.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="">
              <div className="flex flex-col gap-4 h-max">
                <div className="flex flex-col items-center">
                  <Image src={CartNull} alt="" width={270} height={270} className="object-cover" />
                  <div className="text-sm text-gray-500">Chưa có sản phẩm trong giỏ hàng...</div>
                </div>

                <button
                  onClick={() => router.push('/list')}
                  className="w-max py-2 px-4 ring-gray-300 ring-1 text-black text-sm  m-auto"
                >
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                      />
                    </svg>
                    <span> Tiếp tục mua hàng</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Thông tin đơn hàng */}
        <div className="w-full lg:w-1/3 h-max rounded-lg border bg-white p-6">
          <div className="flex flex-col justify-between h-56">
            <div className="">
              <h2 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h2>
              <div className="flex justify-between items-center mb-2">
                <span className="text-base">Tổng tiền:</span>
                <span className="text-lg font-bold text-black">
                  {numericToMoney(carts.reduce((total, cart) => total + cart.price * cart.quantity, 0))}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">Bạn có thể nhập mã giảm giá ở trang thanh toán.</p>
            </div>

            <div className="">
              <button
                onClick={() => router.push('/checkout-cart')}
                className="w-full py-2 bg-black text-white font-semibold hover:bg-slate-800 transition"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
