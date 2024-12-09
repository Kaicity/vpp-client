'use client';

import { useState } from 'react';

const PaginationProduct = () => {
  const totalPages = 10; // Set the total number of pages
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageButtons = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`min-w-9 rounded-md py-2 px-3.5 text-center text-sm transition-all shadow-sm ${
            currentPage === i
              ? 'bg-slate-800 text-white'
              : 'border border-slate-300 text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800'
          }`}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div className="mt-12">
      <div className="flex space-x-1">
        <button
          onClick={handlePrev}
          className="border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-gray-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          onClick={handleNext}
          className="border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-gray-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationProduct;
