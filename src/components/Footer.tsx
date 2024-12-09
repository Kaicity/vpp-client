"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 bg-gray-100 text-sm mt-24">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-24">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/public">
            <div className="text-2xl tracking-wide">THONGULAR</div>
          </Link>
          <p>317 Nguyễn Văn Luông Phường 12 Quận 6, Thành phố Hồ Chí Minh</p>
          <span className="font-semibold">nguyenminhthongitmix@gmail.com</span>
          <span className="font-semibold">0703338458</span>
          <div className="flex gap-6">
            <Image src="/facebook.png" alt="" width={16} height={16} />
            <Image src="/instagram.png" alt="" width={16} height={16} />
            <Image src="/youtube.png" alt="" width={16} height={16} />
            <Image src="/pinterest.png" alt="" width={16} height={16} />
            <Image src="/x.png" alt="" width={16} height={16} />
          </div>
        </div>
        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">Công ty</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Về chúng tôi</Link>
              <Link href="">Nhân sự</Link>
              <Link href="">Tiếp thị kinh doanh</Link>
              <Link href="">Bài viết</Link>
              <Link href="">Liên hệ chúng tôi</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">Cửa hàng</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Sản phẩm mới</Link>
              <Link href="">Nổi bật</Link>
              <Link href="">Văn phòng</Link>
              <Link href="">Báo chí</Link>
              <Link href="">Tất cả sản phẩm</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">Trợ giúp</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Dịch vụ khách hàng</Link>
              <Link href="">Tài khoản của tôi</Link>
              <Link href="">Tìm tại cửa hàng</Link>
              <Link href="">Chính sách và dịch vụ</Link>
              <Link href="">Thẻ quà tặng</Link>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">ĐĂNG KÝ NGAY</h1>
          <p>
            Chúng tôi hy vọng bạn sẽ yêu thích sản phẩm mà chúng tôi mang lại
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Địa chỉ email"
              className="p-4 w-3/4"
            />
            <button className="w-1/4 bg-lama text-white">THAM GIA</button>
          </div>
          <span className="font-semibold">Thanh toán nhanh chóng</span>
          <div className="flex justify-between">
            <Image src="/discover.png" alt="" width={40} height={20} />
            <Image src="/skrill.png" alt="" width={40} height={20} />
            <Image src="/paypal.png" alt="" width={40} height={20} />
            <Image src="/mastercard.png" alt="" width={40} height={20} />
            <Image src="/visa.png" alt="" width={40} height={20} />
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="">© 2024 Cửa hàng Thongular</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="">
            <span className="text-gray-500 mr-4">Ngôn ngữ</span>
            <span className="font-medium">Tiếng Việt | Tiếng Anh</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-4">Mệnh giá</span>
            <span className="font-medium">VNĐ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
