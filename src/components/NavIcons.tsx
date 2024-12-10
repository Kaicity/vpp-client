'use client';

import Image from 'next/image';
import Profile from '../../public/profile.png';
import Notification from '../../public/notification.png';
import Cart from '../../public/cart.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CartModal from './CartModal';
import { useApp } from '@/context/AppContext';

const NavIcons = () => {
  const { isLoggedIn, handleLogout, isCartOpen, toggleCart, closeCart, user } = useApp();

  const [isProfileOpen, setIsProfileOpen] = useState(false);


  const router = useRouter();

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push('/login');
    }
    setIsProfileOpen((prev) => !prev);
  };

  const goToCheckoutCart = () => {
    router.push('/checkout-cart');
    closeCart();
  };

  const logoutAccount = () => {
    handleLogout();
    router.push('/');
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {/* Profile Icon */}
      <Image
        src={Profile}
        alt="User Profile"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
        aria-expanded={isProfileOpen ? 'true' : 'false'}
      />
      {isProfileOpen && (
        <div
          className="absolute top-12 right-0 p-4 w-max bg-white rounded-lg shadow-lg z-20 transition-transform duration-300 ease-out transform origin-top scale-100"
          role="menu"
        >
          <Link href="/public" className="block hover:text-lama">
            <span className="font-semibold">{user ? user.name : 'Khách'}</span>
            <p className="text-sm">{user && user.email}</p>
          </Link>
          <div onClick={logoutAccount} className="mt-2 cursor-pointer hover:text-lama">
            Đăng xuất
          </div>
        </div>
      )}

      {/* Notification Icon */}
      <Image src={Notification} alt="Notifications" width={22} height={22} className="cursor-pointer" />

      {/* Cart Icon */}
      <div className="relative cursor-pointer">
        <Image src={Cart} alt="Cart" width={22} height={22} className="cursor-pointer" onClick={toggleCart} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          2
        </div>
      </div>
      {isCartOpen && <CartModal handleGoToCheckoutCart={goToCheckoutCart} />}
    </div>
  );
};

export default NavIcons;
