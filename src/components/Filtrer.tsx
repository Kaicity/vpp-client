const Filter = () => {
  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <select
          name="type"
          id=""
          className="py-2 px-4 text-xs font-medium bg-[#EBEDED]"
        >
          <option>Thuộc</option>
          <option value="value1">Văn phòng phẩm</option>
          <option value="value2">Học sinh</option>
        </select>

        <input
          type="text"
          name="min"
          placeholder="Giá thấp từ"
          className="text-xs pl-2 ring-1 ring-gray-400 h-6 sm:h-auto"
        />

        <input
          type="text"
          name="max"
          placeholder="Giá cao từ"
          className="text-xs pl-2 ring-1 ring-gray-400 h-6 sm:h-auto"
        />

        <select
          name="type"
          id=""
          className="py-2 px-4 text-xs font-medium bg-[#EBEDED]"
        >
          <option>Loại</option>
          <option value="value1">Giấy in ấn Photo</option>
          <option value="value2">Bìa - kệ - rổ</option>
          <option value="value1">Giấy in ấn Photo</option>
          <option value="value2">Dụng cụ văn phòng</option>
          <option value="value1">Bút - viết - mực</option>
          <option value="value2">Băng keo - dao - kéo</option>
        </select>

        <select
          name="type"
          id=""
          className="py-2 px-4 text-xs font-medium bg-[#EBEDED]"
        >
          <option>Tất cả</option>
          <option value="value1">Bìa hồ sơ</option>
          <option value="value2">Tập sách</option>
        </select>
      </div>
      <div className="">
        <select
          name=""
          id=""
          className="py-2 px-4 foedium bg-white ring-1 ring-gray-400"
        >
          <option>Sắp xếp bởi</option>
          <option value="">Giá (từ thấp đến cao)</option>
          <option value="">Giá (từ cao đến thấp)</option>
          <option value="">Mới nhất</option>
          <option value="">Mua nhiều nhất</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
