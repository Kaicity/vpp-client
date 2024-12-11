'use client';

import Image from 'next/image';
import CartNull from '../../public/cart_null.webp';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useApp } from '@/context/AppContext';
import type { Cart } from '@/types/cart';
import { numericToMoney } from '@/utils/formatMoney';

interface Props {
  carts: Cart[];
  handleRemoveItemCart: (id: number) => void;
  handleRemoveAllItemCart: () => void;
  handleGoToCheckoutCart: () => void;
  handleDecrease: (cart: Cart) => void;
  handleIncrease: (cart: Cart) => void;
}

const CartModal: React.FC<Props> = ({
  handleGoToCheckoutCart,
  handleRemoveAllItemCart,
  handleRemoveItemCart,
  handleDecrease,
  handleIncrease,
  carts,
}) => {
  const { closeCart } = useApp();

  return (
    <div className="w-max absolute p-4 top-12 right-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white flex flex-col gap-6 z-20">
      {!carts.length ? (
        <div className="flex flex-col items-center">
          <Image src={CartNull} alt="" width={270} height={270} className="object-cover" />
          <div className="text-sm text-gray-500">Chưa có sản phẩm trong giỏ hàng...</div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="px-2 text-xl font-semibold">Giỏ hàng của bạn</h2>
            <button onClick={closeCart}>
              <XCircleIcon className="w-7 h-7 text-brandPrimary" />
            </button>
          </div>

          <div className="px-2">
            <span className="text-lama cursor-pointer" onClick={handleRemoveAllItemCart}>
              Xóa tất cả
            </span>
          </div>

          {/* LIST PRODUCT  */}
          <div className="flex flex-col gap-8 h-96 overflow-y-auto scrollbar">
            {/* ITEMS_1 */}
            {carts.map((cart) => (
              <div className="flex px-2 gap-4" key={cart?.id}>
                <div className="">
                  <button className="font-bold" onClick={() => handleDecrease(cart)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>

                <Image src={cart?.imageUrl} alt="" width={72} height={96} className="object-cover" />
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div className="">
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">{cart?.name}</h3>
                      <div className="p-1 bg-gray-50">{numericToMoney(cart?.price * cart?.quantity)}</div>
                    </div>
                    {/* DESC */}
                    <div className="text-sm text-gray-500">Mã hàng: {cart?.id}</div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Số lượng: {cart?.quantity}</span>
                    <button onClick={() => handleIncrease(cart)}>
                      <span className="text-gray-500">
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
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </span>
                    </button>
                    <button className="text-lama cursor-pointer" onClick={() => handleRemoveItemCart(cart?.id)}>
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL AMOUNT */}
          <div className="px-2 flex items-center justify-between">
            <h3 className="font-semibold">Tổng cộng</h3>
            <h3 className="font-semibold">
              {numericToMoney(carts.reduce((total, item) => total + item.price * item.quantity, 0))}
            </h3>
          </div>

          <div className="px-2">
            <p className="text-gray-500 text-sm mt-2 mb-4">Sản phẩm được bán chạy nhất</p>
          </div>

          <div className="px-2 flex justify-between text-sm">
            <button className="py-3 px-4 ring-1 ring-gray-300">Xem giỏ hàng</button>
            <button className="py-3 px-4 bg-black text-white font-semibold" onClick={handleGoToCheckoutCart}>
              Mua hàng
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
