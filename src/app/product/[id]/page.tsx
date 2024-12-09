"use client"

import { useParams } from "next/navigation";
import Add from "@/components/Add";
import CustomizeProduct from "@/components/CustomizeProduct";
import ProductImage from "@/components/ProductImages";

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

// Dữ liệu tĩnh hoặc giả lập (bạn có thể thay thế bằng API thực tế)
const products: Product[] = [
  {
    id: "product-1",
    name: "Combo 5 Ream giấy A3 80",
    description:
      "Giấy ghi chú Pastel Thiên Long gồm 100 tờ trong 1 xấp với định lượng",
    image: "/images/product-1.jpg",
    price: 70000,
  },
  {
    id: "product-2",
    name: "Combo 10 Ream giấy A4 70",
    description: "Giấy A4 với chất lượng cao, phù hợp cho văn phòng",
    image: "/images/product-2.jpg",
    price: 90000,
  },
  // Các sản phẩm khác...
];

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  // Tìm sản phẩm từ danh sách sản phẩm dựa trên ID
  //const product = products.find((item) => item.id === id);

  // if (!product) {
  //   return <div>Product not found</div>;
  // }

  return (
    <div className="px-4 md:px-8 lg:px-6 xl:32 2xl:px-32 relative flex flex-col lg:flex-row gap-16 mt-12">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImage />
      </div>
      {/* TEXT */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">Sổ ghi nhật ký</h1>
        <p className="text-gray-500">
          Hãy để quyển nhật ký này trở thành người bạn lưu giữ mọi cảm xúc, ý
          tưởng và kế hoạch của bạn. Với thiết kế tinh tế, bìa cứng sang trọng
          hoặc bìa da mềm mại, sản phẩm mang lại cảm giác chắc chắn và dễ chịu
          khi sử dụng
        </p>
        <div className="h-[2px] bg-gray-100"></div>
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">180.000 đ</h3>
          <h1 className="text-2xl font-medium">100.000 đ</h1>
        </div>
        <div className="h-[2px] bg-gray-100"></div>
        {/* Đối với thương mại điện tử quần áo thì thêm sizes và colors */}

        <Add />

        <div className="h-[2px] bg-gray-100"></div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Nội dung</h4>
          <p>
            Hãy để quyển nhật ký này trở thành người bạn lưu giữ mọi cảm xúc, ý
            tưởng và kế hoạch của bạn. Với thiết kế tinh tế, bìa cứng sang trọng
            hoặc bìa da mềm mại, sản phẩm mang lại cảm giác chắc chắn và dễ chịu
            khi sử dụng
          </p>
        </div>

        <div className="text-sm">
          <h4 className="font-medium mb-4">Nội dung</h4>
          <p>
            Hãy để quyển nhật ký này trở thành người bạn lưu giữ mọi cảm xúc, ý
            tưởng và kế hoạch của bạn. Với thiết kế tinh tế, bìa cứng sang trọng
            hoặc bìa da mềm mại, sản phẩm mang lại cảm giác chắc chắn và dễ chịu
            khi sử dụng
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
