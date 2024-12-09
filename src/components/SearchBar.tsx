"use client";

import Image from "next/image";
import Search from "../../public/search.png";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name) {
      router.push(`list?name=${name}`);
    }
  }
  return (
    <form
      className="flex ic justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
      onSubmit={handleOnSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Tìm kiếm..."
        className="flex-1 bg-transparent outline-none"
      />
      <button className="cursor-pointer">
        <Image src={Search} alt="" width={16} height={16}></Image>
      </button>
    </form>
  );
};

export default SearchBar;
