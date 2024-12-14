'use client';

import Image from 'next/image';
import { useState } from 'react';
import MenuOption from '../../public/menu.png';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

const Menu = () => {
  const { handleLogout } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <Image
        src={MenuOption}
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10">
          <Link href="/" onClick={() => setOpen(false)}>
            Trang chủ
          </Link>
          <Link href="/cart" onClick={() => setOpen(false)}>
            Giỏ hàng
          </Link>
          <Link href="/list" onClick={() => setOpen(false)}>
            Sản phẩm
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            Thông tin
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Liên hệ
          </Link>
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      )}
    </div>
  );
};

export default Menu;
