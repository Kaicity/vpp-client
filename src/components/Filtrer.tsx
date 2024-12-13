import { useState } from 'react';
import Image from 'next/image';
import Search from '../../public/search.png';
import { formatCurrency } from '@/utils/formatMoney';

interface FilterProps {
  catalogs: Catalog[];
  onFilterChange: (filters: { catalogId: string; minPrice: string; maxPrice: string; name: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ catalogs, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState({
    catalogId: '',
    minPrice: '',
    maxPrice: '',
    name: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    // Loại bỏ các ký tự không phải số
    const numericValue = value.replace(/[^\d]/g, '');

    // Cập nhật filters
    const updatedFilters = { ...localFilters, [key]: numericValue };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSearchChange = (key: string, value: string) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = { catalogId: '', minPrice: '', maxPrice: '', name: '' };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <select
          name="type"
          id=""
          className="py-2 px-4 text-xs font-medium bg-[#EBEDED]"
          onChange={(e) => handleFilterChange('catalogId', e.target.value)}
        >
          <option value={''}>Mặc định</option>
          {catalogs.map((catalog) => (
            <option value={catalog.id} key={catalog.id}>
              {catalog.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="minPrice"
          placeholder="Giá thấp từ"
          className="text-xs pl-2 ring-1 ring-gray-400 h-6 sm:h-auto"
          value={formatCurrency(localFilters.minPrice)}
          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
        />

        <input
          type="text"
          name="maxPrice"
          placeholder="Giá cao từ"
          className="text-xs pl-2 ring-1 ring-gray-400 h-6 sm:h-auto"
          value={formatCurrency(localFilters.maxPrice)}
          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
        />

        <form className="flex ic justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Tìm kiếm tên sản phẩm..."
            className="flex-1 bg-transparent outline-none tx-sm"
            value={localFilters.name}
            onChange={(e) => handleSearchChange('name', e.target.value)}
          />
          <button type="submit" className="cursor-pointer rounded-full px-1 hover:bg-slate-300">
            <Image src={Search} alt="" width={16} height={16} className='object-cover'></Image>
          </button>
        </form>

        <button className="py-2 px-4 bg-black text-white text-xs font-medium" onClick={handleResetFilters}>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            <span>Reset</span>
          </div>
        </button>
      </div>
      <div className="">
        <select name="" id="" className="py-2 px-2  bg-white ring-1 ring-gray-400">
          <option>Sắp xếp</option>
          <option value="">Giá (từ thấp)</option>
          <option value="">Giá (từ cao)</option>
          <option value="">Mới nhất</option>
          <option value="">Mua nhiều nhất</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
