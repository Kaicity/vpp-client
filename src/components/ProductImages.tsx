'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProductDefault from 'public/product_default.webp';

interface ProductImageProps {
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
  imageUrl4: string;
}

const ProductImages: React.FC<ProductImageProps> = ({ imageUrl1, imageUrl2, imageUrl3, imageUrl4 }) => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState<{ url: string; id: number }[]>([]);

  useEffect(() => {
    const imageArray = [
      { url: imageUrl1, id: 1 },
      { url: imageUrl2, id: 2 },
      { url: imageUrl3, id: 3 },
      { url: imageUrl4, id: 4 },
    ];
    setImages(imageArray);
  }, [imageUrl1, imageUrl2, imageUrl3, imageUrl4]);

  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image src={images[index]?.url || ProductDefault} alt="" fill sizes="50vw" className="object-cover" />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {images.map((item: any, i: number) => (
          <div className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer" key={item?.id} onClick={() => setIndex(i)}>
            <Image key={item?.id} src={item?.url || ProductDefault} alt="" fill sizes="30vw" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
