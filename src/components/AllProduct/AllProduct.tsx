"use client";
import { IProduct } from "@/Types/products";
import FilterSidebar from "./FilterSidebar/FilterSidebar";
import ProductCard from "../ui/Core/ProductCard";
import Container from "../ui/Core/Container";
import { ICategory } from "@/Types/category";
import { useEffect, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import LocationMenu from "../LocationMenu/LocationMenu";
import { getAllProduct } from "@/Service/Products";
import Spinner from "../Loading/Loading";

const AllProducts = ({Category}:{Category:ICategory[]}) => {
    const [products, setProducts] = useState<IProduct[]>([]); 
    const [selectedCategory, setSelectedCategory] = useState<string>(""); 
    const [Search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch products based on category and search term
    useEffect(() => {
        const fetchProducts = async () => {
            // Prepare filters for product fetch
            // const filters = {
            //     category: selectedCategory,
            //     searchTerm: Search
            // };
            const fetchedProducts = await getAllProduct(); 
            setProducts(fetchedProducts); 
            setLoading(false);
        };

        fetchProducts();
    }, [selectedCategory, Search]); // Re-fetch when category or search changes

    if (loading) {
        return (
            <Spinner/>
        )
    }
    return (
        <Container>
            <div className="flex justify-between items-center mt-10">
                <div>
                    <h1 className="text-xl font-bold">Location</h1>
                    <LocationMenu />
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
                <div className="grid grid-cols-4 gap-8">
                    {products?.data.map((product: IProduct, idx: number) => (
                        <ProductCard key={idx} product={product} />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default AllProducts;
