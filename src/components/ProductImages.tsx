"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/7594641/pexels-photo-7594641.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/7594642/pexels-photo-7594642.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/6368831/pexels-photo-6368831.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/7657377/pexels-photo-7657377.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
];

const ProductImages = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          src={images[index]?.url}
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {images.map((item: any, i: number) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={item._id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item?.url}
              alt=""
              fill
              sizes="30vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
