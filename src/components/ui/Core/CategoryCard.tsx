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
      className="bg-white bg-opacity-50 border-2 border-gray-100 rounded-2xl text-center p-6 h-44 shadow-2xl cursor-pointer"
    >
      <Image
        src={category?.icon ? category.icon[0] :'https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png'}
        width={100}
        height={100}
        alt="category icon"
        className="mx-auto rounded-full"
      />
      <h3 className="text-lg font-semibold truncate mt-3">{category?.name}</h3>
    </div>
  );
};

export default CategoryCard;
