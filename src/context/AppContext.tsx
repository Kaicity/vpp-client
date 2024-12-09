'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { clearAll, getToken, getUser, saveToken } from '@/utils/localstorage';
import type { User } from '@/types/user';

interface Props {
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  isLoggedIn: boolean;
  handleLogin: (token: string) => void;
  handleLogout: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const AppContext = createContext<Props | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const closeCart = () => setIsCartOpen(false);

  // Hàm xử lý đăng nhập
  const handleLogin = (token: string) => {
    saveToken(token);
    setIsLoggedIn(true);
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    clearAll();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);

    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ isCartOpen, toggleCart, closeCart, isLoggedIn, handleLogin, handleLogout, user, setUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('App must be used within a AppProvider');
  }
  return context;
};
