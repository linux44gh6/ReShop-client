"use client";
import { ICategory } from "@/Types/category";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CategoryCard = ({ category }: { category: ICategory }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/all-product?categoryId=${id}`);
  };

  return (
    <div
      onClick={() => handleClick(category?._id)}
      className="bg-white border-2 border-gray-100 rounded-2xl p-4 h-44 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg transition-all duration-500 hover:border-[#10b981] cursor-pointer "
    >
      <div className="w-20 h-20 relative">
        <Image
          src={
            category?.icon?.[0] ||
            "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
          }
          fill
          alt="category icon"
          className="rounded-full object-cover"
        />
      </div>
      <h3 className="text-base font-semibold text-gray-700 mt-3 truncate max-w-[120px]">
        {category?.name}
      </h3>
    </div>
  );
};

export default CategoryCard;
