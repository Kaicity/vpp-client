'use client';

import Image from 'next/image';
import CartNull from '../../public/cart_null.webp';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useApp } from '@/context/AppContext';

interface Props {
  handleGoToCheckoutCart: () => void;
}

const CartModal: React.FC<Props> = ({ handleGoToCheckoutCart }) => {
  const cartItems = true;
  const { closeCart } = useApp();

  return (
    <div className="w-max absolute p-4 top-12 right-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white flex flex-col gap-6 z-20">
      {!cartItems ? (
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
          {/* LIST PRODUCT  */}
          <div className="flex flex-col gap-8 h-96 overflow-y-auto scrollbar">
            {/* ITEMS_1 */}
            <div className="flex px-2 gap-4">
              <Image
                src="https://images.pexels.com/photos/616849/pexels-photo-616849.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                width={72}
                height={96}
                className="object-cover"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP */}
                <div className="">
                  {/* TITLE */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Cuốn nhật ký</h3>
                    <div className="p-1 bg-gray-50">120.000 đ</div>
                  </div>
                  {/* DESC */}
                  <div className="text-sm text-gray-500">Hiện có</div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Số lượng: 2</span>
                  <span className="text-blue-500 cursor-pointer">Xóa</span>
                </div>
              </div>
            </div>

            {/* ITEMS_1 */}
            <div className="flex px-2 gap-4">
              <Image
                src="https://images.pexels.com/photos/616849/pexels-photo-616849.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                width={72}
                height={96}
                className="object-cover"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP */}
                <div className="">
                  {/* TITLE */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Cuốn nhật ký</h3>
                    <div className="p-1 bg-gray-50">120.000 đ</div>
                  </div>
                  {/* DESC */}
                  <div className="text-sm text-gray-500">Hiện có</div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Số lượng: 2</span>
                  <span className="text-blue-500 cursor-pointer">Xóa</span>
                </div>
              </div>
            </div>

            {/* ITEMS_1 */}
            <div className="flex px-2 gap-4">
              <Image
                src="https://images.pexels.com/photos/616849/pexels-photo-616849.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                width={72}
                height={96}
                className="object-cover"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP */}
                <div className="">
                  {/* TITLE */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Cuốn nhật ký</h3>
                    <div className="p-1 bg-gray-50">120.000 đ</div>
                  </div>
                  {/* DESC */}
                  <div className="text-sm text-gray-500">Hiện có</div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Số lượng: 2</span>
                  <span className="text-blue-500 cursor-pointer">Xóa</span>
                </div>
              </div>
            </div>
          </div>

          {/* TOTAL AMOUNT */}
          <div className="px-2 flex items-center justify-between">
            <h3 className="font-semibold">Tổng cộng</h3>
            <h3 className="font-semibold">360.000 đ</h3>
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
