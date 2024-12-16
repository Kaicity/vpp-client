'use client';

import Image from 'next/image';
import CartNull from '../../public/cart_null.webp';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useApp } from '@/context/AppContext';
import type { Cart } from '@/types/cart';
import { numericToMoney } from '@/utils/formatMoney';
import { useRouter } from 'next/navigation';

interface Props {
  carts: Cart[];
  handleRemoveItemCart: (id: number) => void;
  handleRemoveAllItemCart: () => void;
  handleGoToCheckoutCart: () => void;
}

const CartModal: React.FC<Props> = ({
  handleGoToCheckoutCart,
  handleRemoveAllItemCart,
  handleRemoveItemCart,
  carts,
}) => {
  const { closeCart } = useApp();
  const router = useRouter();

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

                    {/* <div className="flex items-center gap-1">
                      <button onClick={() => handleDecrease(cart)}>
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
                              d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </span>
                      </button>

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
                    </div> */}

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
            <button
              className="py-3 px-4 ring-1 ring-gray-300"
              onClick={() => {
                router.push('/cart');
                closeCart();
              }}
            >
              Xem giỏ hàng
            </button>
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
