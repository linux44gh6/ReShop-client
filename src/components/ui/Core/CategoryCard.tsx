
import { ICategory } from "@/Types/category";
import Image from "next/image";

const CategoryCard = ({ category }: { category: ICategory }) => {
    console.log(category);
  return (
    <div className="bg-white bg-opacity-50 border-2 border-white rounded-2xl text-center p-6 h-44">
      <Image
        src={category?.icon ? category.icon[0] : 'https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png'}
        width={100}
        height={150}
        alt="category icon"
        className="mx-auto"
      />
      <h3 className="text-lg font-semibold truncate mt-3">{category?.name}</h3>
    </div>
  );
};

export default CategoryCard;