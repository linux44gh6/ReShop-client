/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/ui/Core/ProductCard"
import { IProduct } from "@/Types/products"
import Link from "next/link"

const FeaturedProducts = ({ products }: { products: any }) => {
  return (
    <div className="bg-white bg-opacity-50 py-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between p-2 md:p-0 lg:p-0">
          <h2 className="font-bold text-2xl">Selling Products</h2>
          <Link href="/all-product">
            <Button variant="outline" className="rounded-full text-[#10b981] cursor-pointer">
              All Collection
            </Button>
          </Link>
        </div>

        {products?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-4 gap-8 my-5 p-4 md:p-0 lg:p-0">
            {products.map((product: IProduct, idx: number) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg mt-10">
            No products found.
          </div>
        )}
      </div>
    </div>
  )
}

export default FeaturedProducts
