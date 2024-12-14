'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface Props {
  title: string;
  content: string;
  titleButtonMain: string;
  titleButtonPrev: string;
  handleMain: () => void;
  handlePrev: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  icon: React.ReactElement;
}

const ModalDialog: React.FC<Props> = ({
  title,
  content,
  titleButtonMain,
  titleButtonPrev,
  handleMain,
  handlePrev,
  open,
  setOpen,
  icon,
}) => {
  // Hàm đóng modal chỉ gọi khi người dùng click vào các nút
  const handleClose = () => {
    // setOpen(false); // Chỉ đóng khi cần thiết
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
          onClick={(e) => e.stopPropagation()} // Chặn sự kiện đóng modal khi click vào backdrop
        >
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                  {icon}
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <Dialog.Title as="h3" className="text-base font-semibold text-gray-900">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{content}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleMain}
                className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
              >
                {titleButtonMain}
              </button>
              <button
                type="button"
                onClick={handlePrev}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                {titleButtonPrev}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalDialog;
