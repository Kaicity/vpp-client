"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    // Chuyển hướng về trang chủ sau 5 giây
    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl">Trang bạn yêu cầu không tồn tại!</p>
        <p className="mt-2 text-gray-500">
          Có thể bạn muốn quay lại{" "}
          <Link href="/" className="text-lama hover:underline">
            Trang chủ
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
