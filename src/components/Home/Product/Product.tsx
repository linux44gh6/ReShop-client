
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/Core/ProductCard";
import { getAllProduct } from "@/Service/Products";
import { IProduct } from "@/Types/products";

import Link from "next/link";

const FeaturedProducts = async () => {
  const { data: products } = await getAllProduct();
  return (
    <div className="bg-white bg-opacity-50 py-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between p-2 md:p-0 lg:p-0">
          <h2 className="font-bold text-2xl">Selling Products</h2>
          <Link href="/all-product">
            <Button variant="outline" className="rounded-full">
              All Collection
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-8 my-5 p-4 md:p-0 lg:p-0">
          {products
            .map((product: IProduct, idx: number) => (
              <ProductCard key={idx} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;