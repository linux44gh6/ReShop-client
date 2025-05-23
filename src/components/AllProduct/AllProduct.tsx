/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IProduct } from "@/Types/products";
import FilterSidebar from "./FilterSidebar/FilterSidebar";
import ProductCard from "../ui/Core/ProductCard";
import Container from "../ui/Core/Container";
import { ICategory } from "@/Types/category";
import { useEffect, useState } from "react";
import Image from "next/image";
import notFound from "@/assets/notFound.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import LocationMenu from "../LocationMenu/LocationMenu";
import { getAllProduct } from "@/Service/Products";
import Spinner from "../Loading/Loading";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AllProducts = ({ Category }: { Category: any }) => {
  const searchParams = useSearchParams();
  const categoryIdFromUrl = searchParams.get("categoryId");

  const [products, setProducts] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [Search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [ProductLocation, setLocation] = useState<string>("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products?.data?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil((products?.data?.length || 0) / itemsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await getAllProduct({
        search: Search,
        category: selectedCategory || categoryIdFromUrl || undefined,
        location: ProductLocation,
      });
      setProducts(fetchedProducts);
      setCurrentPage(1); // reset pagination
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory, Search, ProductLocation, categoryIdFromUrl]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4">
        {/* Location */}
        <div className="w-full md:w-auto">
          <h1 className="text-xl font-bold">Location</h1>
          <LocationMenu setLocation={setLocation} />
        </div>

        {/* Category */}
        <div className="w-full md:w-auto">
          <h1 className="text-xl font-bold">Category</h1>
          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger className="w-full md:w-[350px] rounded-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {Category?.data.map((category: ICategory, idx: number) => (
                <SelectItem key={idx} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search */}
        <div className="w-full md:w-auto">
          <h1 className="text-xl font-bold">Find</h1>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for products"
            className="rounded-full"
          />
        </div>
      </div>

      {/* Product List */}
      <div className="flex flex-col md:flex-row gap-5 my-8">
        <div className="w-full md:w-1/4">
          <FilterSidebar />
        </div>
        <div className="w-full md:w-3/4">
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentProducts.map((product: IProduct, idx: number) => (
                  <div key={idx} className="h-full">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-6 space-x-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  Prev
                </Button>
                <span className="px-4 py-2">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  Next
                </Button>
              </div>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Image
                src={notFound}
                width={500}
                height={500}
                alt="not found"
                className="mx-auto"
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AllProducts;
