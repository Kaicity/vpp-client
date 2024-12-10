'use client';

import Link from 'next/link';
import Menu from './Menu';
import Logo from '../../public/logo.png';
import Image from 'next/image';
import SearchBar from './SearchBar';
import NavIcons from './NavIcons';

const Navbar = () => {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-6 xl:32 2xl:px-32 sticky top-0 bg-white z-50 shadow-sm">
      <div className="h-full flex items-center justify-between md:hidden">
        {/* MOBILE */}
        <Link href="/">
          <div className="text-2xl tracking-wide">Thongular</div>
        </Link>
        <Menu />
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* LEFT */}
        <div className="w-1/3 xl:1/2 flex items-center gap-12">
          <Link href="/">
            <div className="flex items-center gap-3">
              <Image src={Logo} alt="" width={24} height={24} />
              <div className="text-2xl tracking-wide">Thongular</div>
            </div>
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href="/newProduct">Sản phẩm mới</Link>
            <Link href="/sale">Sale</Link>
            <Link href="/about">Giới thiệu</Link>
            <Link href="/contact">Liên hệ</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-2/3 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
