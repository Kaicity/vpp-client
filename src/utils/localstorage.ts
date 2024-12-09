import type { User } from '@/types/user';

export const saveToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

export const saveUser = (user: User) => {
  if (typeof window !== 'undefined') {
    const userData = JSON.stringify(user);
    localStorage.setItem('user', userData);
  }
};

export const getUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export const clearAll = () => {
  localStorage.clear();
};
