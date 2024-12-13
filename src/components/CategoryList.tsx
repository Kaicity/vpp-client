import Image from 'next/image';
import Link from 'next/link';
import ProductDefault from 'public/product_default.webp';

interface catalogProps {
  catalogs: Catalog[];
}

const CategoryList: React.FC<catalogProps> = ({ catalogs }) => {
  return (
    <div className="px-4">
      <div className="flex gap-4 md:gap-8">
        {catalogs.map((catalog) => (
          <Link key={catalog.id} href={`/list`} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6">
            <div className="relative bg-slate-100 w-full h-96">
              <Image src={catalog?.imageUrl || ProductDefault} alt="" fill sizes="20vw" className="object-cover" />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">{catalog?.name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
