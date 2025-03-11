"use client";
import { IProduct, IProductResponse } from "@/Types/products";
import FilterSidebar from "./FilterSidebar/FilterSidebar";
import ProductCard from "../ui/Core/ProductCard";
import Container from "../ui/Core/Container";
import { ICategory } from "@/Types/category";
import { useEffect, useState } from "react";
import Image from "next/image";
import notFound from "@/assets/notFound.svg"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import LocationMenu from "../LocationMenu/LocationMenu";
import { getAllProduct } from "@/Service/Products";
import Spinner from "../Loading/Loading";
import { useSearchParams } from "next/navigation";

const AllProducts = ({ Category }: { Category: ICategory[] }) => {
    const searchParams = useSearchParams();
    const categoryIdFromUrl = searchParams.get("categoryId");
    const [products, setProducts] = useState<IProductResponse[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [Search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [ProductLocation, setLocation] = useState<string>("");
    // Fetch products based on category and search term
    useEffect(() => {
        const fetchProducts = async () => {
            // Prepare filters for product fetch
            // const filters = {
            //     category: selectedCategory,
            //     searchTerm: Search
            // };
            const fetchedProducts = await getAllProduct({
                search: Search,
                category: selectedCategory || categoryIdFromUrl || undefined,
                location: ProductLocation
            });
            setProducts(fetchedProducts);
            setLoading(false);
        };

        fetchProducts();
    }, [selectedCategory, Search, ProductLocation, categoryIdFromUrl]); // Re-fetch when category or search changes

    if (loading) {
        return (
            <Spinner />
        )
    }
    return (
        <Container>
            <div className="flex justify-between items-center mt-10">
                <div>
                    <h1 className="text-xl font-bold">Location</h1>
                    <LocationMenu setLocation={setLocation} />
                </div>
                <div>
                    <h1 className="text-xl font-bold">Category</h1>
                    <Select onValueChange={(value) => setSelectedCategory(value)}>
                        <SelectTrigger className="w-[350px] rounded-full">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {Category?.data.map((category: ICategory, idx: number) => (
                                <SelectItem key={idx} value={category._id}>{category.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <h1 className="text-xl font-bold">Find</h1>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search for products"
                        className="w-full border border-gray-300 rounded-full py-2 px-5 focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                    />
                </div>
            </div>
            <div className="flex gap-8 my-8">
                <div>
                    <FilterSidebar />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {products?.data.length > 0 ? (
                        products.data.map((product: IProduct, idx: number) => (
                            <ProductCard key={idx} product={product} />
                        ))
                    ) : (
                        <div className="w-full">
                            <Image src={notFound} width={500} height={500} alt="not found" className=" mx-auto" />
                        </div>
                    )}
                </div>

            </div>
        </Container>
    );
};

export default AllProducts;
