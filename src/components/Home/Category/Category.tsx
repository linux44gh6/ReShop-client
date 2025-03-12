import { Button } from "@/components/ui/button";
import { getAllCategory } from "@/Service/Category";

import { ICategory } from "@/Types/category";

import Link from "next/link";
import CategoryCard from "../../ui/Core/CategoryCard";

const Category = async () => {
  const { data: categories } = await getAllCategory();
  return (
    <div className="container mx-auto my-20">
      <div className="flex items-center justify-between p-2 md:p-0 lg:p-0">
        <h2 className="font-bold text-2xl">Category</h2>
        <Link href="/products">
          <Button variant="outline" className="rounded-full">
            View All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-8 my-5 p-4 md:p-0 lg:p-0">
        {categories
          .map((category: ICategory, idx: number) => (
            <CategoryCard key={idx} category={category} />
          ))}
      </div>
    </div>
  );
};

export default Category;