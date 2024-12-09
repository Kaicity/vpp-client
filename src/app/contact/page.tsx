"use client";

import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-6 xl:32 2xl:px-32 relative flex items-center justify-center mt-12">
      <div className="container mx-auto p-5 grid lg:grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Form Section */}
        <div className="px-4 lg:px-16">
          {/* Contact Info Section */}
          <div className="col-span-2 mb-16">
            <h1 className="text-3xl font-semibold mb-4">Thongular</h1>
            <p className="text-gray-500 text-sm mb-2 flex items-center">
              <MapPinIcon className="w-5 h-5 text-brandPrimary mr-2" />
              Địa chỉ: 123 Đường ABC, Quận 1, TP. Hồ Chí Minh
            </p>
            <p className="text-gray-500 text-sm mb-2 flex items-center">
              <PhoneIcon className="w-5 h-5 text-brandPrimary mr-2" />
              Số điện thoại: +84 123 456 789
            </p>
            <p className="text-gray-500 text-sm mb-2 flex items-center">
              <EnvelopeIcon className="w-5 h-5 text-brandPrimary mr-2" />
              Email: contact@tencongty.com
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Liên hệ chúng tôi</h2>
          <form>
            <div className="mb-4">
              <input
                id="name"
                type="text"
                placeholder="Nhập họ tên của bạn"
                className="bg-gray-50 p-3 w-full border border-gray-300 rounded focus:outline-none text-sm"
              />
            </div>
            <div className="mb-4">
              <input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                className="bg-gray-50 p-3 w-full border border-gray-300 rounded focus:outline-none  text-sm"
              />
            </div>
            <div className="mb-4">
              <input
                id="phone"
                type="tel"
                placeholder="Nhập số điện thoại của bạn"
                className="bg-gray-50 p-3 w-full border border-gray-300 rounded focus:outline-none text-sm"
              />
            </div>
            <div className="mb-4">
              <textarea
                id="message"
                placeholder="Nhập nội dung liên hệ của bạn"
                className="bg-gray-50 p-3 w-full border border-gray-300 rounded h-32 focus:outline-none text-sm resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-brandPrimary text-white p-2 rounded hover:bg-gray-500 transition"
            >
              Gửi
            </button>
          </form>
        </div>

        {/* Google Map Section */}
        <div className="relative w-full h-0 overflow-hidden shadow-md pb-[80.25%]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15679.395286557141!2d106.62769921122445!3d10.746132411895305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752e7cff633fdd%3A0x85ee85db9cb263ba!2zUXXhuq1uIDYsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1732378072940!5m2!1svi!2s"
            className="absolute top-0 left-0 w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
