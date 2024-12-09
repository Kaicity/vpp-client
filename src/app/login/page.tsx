'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { saveToken, saveUser } from '@/utils/localstorage';
import { getUserInfo, login } from '@/api/auth';
import type { Account } from '@/types/account';
import { useApp } from '@/context/AppContext';

const LoginPage: React.FC = () => {
  const { handleLogin } = useApp();

  const router = useRouter();

  const [formData, setFormData] = useState<Account>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const data = await login(formData);
      setTimeout(() => {
        setLoading(false);
        handleLogin(data);

        //save user info
        handleGetUserInfo();
        router.replace('/list');
      }, 1500);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleGetUserInfo = async () => {
    try {
      const userData = await getUserInfo();
      saveUser(userData);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Đăng nhập tài khoản</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handlesubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full h-10 bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Mật khẩu
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-gray-500 hover:text-lama">
                  Quên mật khẩu
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full h-10 bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            {error && <p className="text-red-500 font-semibold pb-2">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-black px-3 py-1.5 text-white flex items-center justify-center"
            >
              {loading ? (
                <svg
                  className="w-5 h-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="4" strokeLinecap="round" className="opacity-25" />
                  <path
                    fill="none"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="opacity-75"
                    d="M4 12a8 8 0 0 1 8-8V4a10 10 0 0 0-10 10h2z"
                  />
                </svg>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Chưa có tài khoản?{' '}
          <a href="/register" className="font-semibold text-gray-500 hover:text-lama">
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
