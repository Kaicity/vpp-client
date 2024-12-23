'use client';

import { useApp } from '@/context/AppContext';
import { numericToMoney } from '@/utils/formatMoney';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProductDefault from 'public/product_default.webp';
import CartNull from 'public/cart_null.webp';
import type { Cart } from '@/types/cart';
import { deleteAllItemCart, deleteItemCartById, updateItemCartById } from '@/api/cart';
import { useEffect, useState } from 'react';
import { getProductById } from '@/api/product';

const Cart = () => {
  const { carts, fetchCarts } = useApp();
  const [localCarts, setLocalCarts] = useState(carts);
  const router = useRouter();

  useEffect(() => {
    // Đồng bộ hóa localCarts với carts từ context khi context cập nhật
    setLocalCarts(carts);
  }, [carts]);

  const handleDecrease = (cartId: number) => {
    setLocalCarts((prev) =>
      prev.map((cart) => (cart.id === cartId && cart.quantity > 1 ? { ...cart, quantity: cart.quantity - 1 } : cart)),
    );
  };

  const handleIncrease = async (cartId: number) => {
    setLocalCarts((prev) => prev.map((cart) => (cart.id === cartId ? { ...cart, quantity: cart.quantity + 1 } : cart)));
  };

  const handleDeleteItemCartById = async (id: number) => {
    try {
      const request = await deleteItemCartById(id);
      if (request) {
        fetchCarts();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleDeleteAllItemCarts = async () => {
    try {
      const request = await deleteAllItemCart();
      if (request) {
        fetchCarts();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, cardId: number) => {
    const value = parseInt(e.target.value, 10) || 1;
    setLocalCarts((prev) => prev.map((cart) => (cart?.id === cardId ? { ...cart, quantity: value } : cart)));
  };

  const handleCheckout = async () => {
    try {
      // Kiểm tra tồn kho cho từng sản phẩm trong giỏ hàng
      const stockChecks = await Promise.all(
        localCarts.map(async (cart) => {
          const productData = await getProductById(cart.id);
          return {
            ...cart,
            stock: productData.stock,
          };
        }),
      );

      // Kiểm tra có sản phẩm nào vượt stock
      const invalidItems = stockChecks.filter((item) => item.quantity > item.stock);

      if (invalidItems.length > 0) {
        const errorMessage = invalidItems.map((item) => `${item.name}: chỉ còn ${item.stock} trong kho.`).join('\n');
        alert(`Không thể thanh toán. Các sản phẩm sau vượt tồn kho:\n${errorMessage}`);
        return; // Dừng quá trình thanh toán
      }

      const updatePromises = stockChecks.map((cart) =>
        updateItemCartById({ productId: cart.id, quantity: cart.quantity }),
      );
      await Promise.all(updatePromises);
      router.push('/checkout-cart');
    } catch (error: any) {
      console.error('Lỗi khi thanh toán:', error.message);
      alert('Đã xảy ra lỗi khi xử lý thanh toán.');
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-6 xl:32 2xl:px-32 relative mt-12">
      <p className="text-xl font-medium">Giỏ hàng</p>
      <div className="mt-8 flex flex-col lg:flex-row gap-6">
        {/* Danh sách giỏ hàng */}
        <div className="flex-1 h-max space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
          <div className="">
            <button className="text-lama cursor-pointer" onClick={handleDeleteAllItemCarts}>
              Xóa tất cả
            </button>
          </div>
          {localCarts.length ? (
            <div className="divide-y">
              {localCarts.map((cart) => (
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
                    <span className="text-md text-gray-400">{numericToMoney(cart?.price!)}</span>
                    <p className="text-md">{numericToMoney(cart?.price! * cart?.quantity)}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleDecrease(cart?.id)}>
                        <span className="text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </span>
                      </button>

                      <input
                        inputMode="numeric"
                        value={cart.quantity}
                        onChange={(e) => handleInputChange(e, cart.id)}
                        className="w-12 text-center border border-gray-300 rounded-md focus:ring-1 focus:ring-lama focus:outline-none no-spinner"
                      />

                      <button onClick={() => handleIncrease(cart?.id)}>
                        <span className="text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>

                    <div className="">
                      <button
                        className="text-lama cursor-pointer px-4 py-2 ring-1 ring-lama hover:bg-lama hover:text-white"
                        onClick={() => handleDeleteItemCartById(cart?.id)}
                      >
                        Xóa
                      </button>
                    </div>
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
                  className="w-max py-2 px-4 ring-gray-300 ring-1 text-black text-sm m-auto"
                >
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
              <h2 className="text-lg font-semibold mb-4">Tạm tính</h2>
              <div className="flex justify-between items-center mb-2">
                <span className="text-base">Tổng tiền:</span>
                <span className="text-lg font-bold text-black">
                  {numericToMoney(localCarts.reduce((total, cart) => total + cart.price * cart.quantity, 0))}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">Bạn có thể nhập mã giảm giá ở trang thanh toán.</p>
            </div>

            <div className="">
              <button
                onClick={handleCheckout}
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
