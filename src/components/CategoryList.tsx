import Image from 'next/image';
import Link from 'next/link';
import ProductDefault from 'public/product_default.webp';

interface CatalogProps {
  catalogs: Catalog[];
}

const CategoryList: React.FC<CatalogProps> = ({ catalogs }) => {
  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {catalogs.map((catalog) => (
          <Link key={catalog.id} href={`/list`} className="flex flex-col items-center text-center">
            <div className="relative w-20 h-20 sm:w-28 sm:h-28">
              <Image
                src={catalog?.imageUrl || ProductDefault}
                alt={catalog?.name || 'Category'}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h1 className="mt-4 font-light text-sm sm:text-base tracking-wide">{catalog?.name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
