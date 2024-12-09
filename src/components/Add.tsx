"use client";

import { useState } from "react";

const Add = () => {
  const [quantity, setQuantity] = useState(1);

  // STOCK
  const stock = 4;

  function handleQuantity(type: "i" | "d"): void {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Chọn số lượng</h4>
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 py-2 px-4 flex items-center justify-between w-32">
          <button
            onClick={() => handleQuantity("d")}
            className="cursor-pointer text-xl"
          >
            -
          </button>
          {quantity}
          <button
            onClick={() => handleQuantity("i")}
            className="cursor-pointer text-xl"
          >
            +
          </button>
        </div>

        <div className="text-xs">
          Chỉ<span className="text-orange-500">4 món hàng</span> đã chọn!
          <br /> {"Đừng"} bỏ lỡ
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-44 text-sm ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none">
          Mua ngay
        </button>
        <button className="w-44 text-sm ring-1 text-white bg-lama py-2 px-4 hover:shadow-md disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white">
          Thêm vào giỏ hàng
        </button>
        <button className="flex items-center gap-2 text-sm text-gray-500">
          <svg viewBox="0 0 477.53 477.53" height="24" width="24">
            <path d="M438.48 58.61a130.815 130.815 0 00-95.573-41.711 130.968 130.968 0 00-95.676 41.694l-8.431 8.909-8.431-8.909C181.282 5.762 98.659 2.728 45.829 51.815a130.901 130.901 0 00-6.778 6.778c-52.072 56.166-52.072 142.97 0 199.13l187.36 197.58c6.482 6.843 17.284 7.136 24.127.654.224-.212.442-.43.654-.654l187.29-197.58c52.068-56.16 52.068-142.96-.001-199.12zm-24.695 175.62h-.017l-174.97 184.54-174.98-184.54c-39.78-42.916-39.78-109.23 0-152.15 36.125-39.154 97.152-41.609 136.31-5.484a96.482 96.482 0 015.484 5.484l20.804 21.948c6.856 6.812 17.925 6.812 24.781 0l20.804-21.931c36.125-39.154 97.152-41.609 136.31-5.484a96.482 96.482 0 015.484 5.484c40.126 42.984 40.42 109.42 0 152.13z"></path>
          </svg>
          <span className="">Yêu thích</span>
        </button>
      </div>
    </div>
  );
};

export default Add;
