'use client';

import Image from 'next/image';
import Profile from '../../public/profile.png';
import Notification from '../../public/notification.png';
import CartDefault from '../../public/cart.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CartModal from './CartModal';
import { useApp } from '@/context/AppContext';
import { deleteAllItemCart, deleteItemCartById, updateItemCartById } from '@/api/cart';
import type { Cart, ItemCart } from '@/types/cart';
import type { Product } from '@/types/product';

const NavIcons = () => {
  const { isLoggedIn, handleLogout, isCartOpen, toggleCart, closeCart, user, fetchCarts, carts } = useApp();
  const router = useRouter();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // CART
  useEffect(() => {
    fetchCarts();
  }, [isCartOpen]);

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
    window.location.href = '/';
  };

  const handleDeleteAllItemCarts = async () => {
    try {
      const request = await deleteAllItemCart();
      if (request) {
        fetchCarts();
        router.push('/list');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleDeleteItemCartById = async (id: number) => {
    try {
      const request = await deleteItemCartById(id);
      if (request) {
        fetchCarts();
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleDecrease = async (cart: Cart) => {
    try {
      const itemCart: ItemCart = {
        productId: cart?.id,
        quantity: cart?.quantity - 1,
      };

      console.log(itemCart);

      const request = await updateItemCartById(itemCart);
      if (request) {
        fetchCarts();
      }
    } catch (error: any) {
      throw new Error(error?.message);
    }
  };

  const handleIncrease = async (cart: Cart) => {
    try {
      const itemCart: ItemCart = {
        productId: cart?.id,
        quantity: cart?.quantity + 1,
      };

      console.log(itemCart);

      const request = await updateItemCartById(itemCart);
      if (request) {
        fetchCarts();
      }
    } catch (error: any) {
      throw new Error(error?.message);
    }
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
      {isProfileOpen && isLoggedIn ? (
        <div
          className="absolute top-12 right-0 p-4 w-max bg-white rounded-lg shadow-lg z-20 transition-transform duration-300 ease-out transform origin-top scale-100"
          role="menu"
        >
          <Link href="/" className="block hover:text-lama mb-2">
            <span className="font-semibold">{user ? user.name : 'Khách'}</span>
            <p className="text-sm">{user && user.email}</p>
          </Link>

          <Link href="/order" className="mt-2 cursor-pointer hover:text-lama">
            Đơn hàng
          </Link>
          <div onClick={logoutAccount} className="mt-2 cursor-pointer hover:text-lama">
            Đăng xuất
          </div>
        </div>
      ) : null}

      {/* Notification Icon */}
      <Image src={Notification} alt="Notifications" width={22} height={22} className="cursor-pointer" />

      {/* Cart Icon */}
      <div className="relative cursor-pointer">
        <Image src={CartDefault} alt="Cart" width={22} height={22} className="cursor-pointer" onClick={toggleCart} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          {carts.length}
        </div>
      </div>
      {isCartOpen && (
        <CartModal
          handleGoToCheckoutCart={goToCheckoutCart}
          carts={carts}
          handleRemoveItemCart={handleDeleteItemCartById}
          handleRemoveAllItemCart={handleDeleteAllItemCarts}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
        />
      )}
    </div>
  );
};

export default NavIcons;
