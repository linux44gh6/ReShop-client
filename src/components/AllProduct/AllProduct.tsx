import { IProduct } from "@/Types/products";
import FilterSidebar from "./FilterSidebar/FilterSidebar";
import ProductCard from "../ui/Core/ProductCard";
import Container from "../ui/Core/Container";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { location } from "@/Constans/location";


const AllProducts = ({ products }: { products: IProduct[] }) => {
    console.log(products);
    return (
        <Container>
            <div className="flex justify-between items-center mt-10">
                <div>
                    <h1 className='text-3xl font-bold'>Location</h1>
                    <Select>
                        <SelectTrigger className="w-[350px]">
                            <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                location.map((loc, idx) => (
                                    <SelectItem key={idx} value={loc.division}>{loc.division}
                                    
                                    </SelectItem>
                                ))
                            }
                            
                            
                        </SelectContent>
                    </Select>

                </div>
                <div>
                    <h1>Category</h1>
                    <Select>
                        <SelectTrigger className="w-[350px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
                <div className="">
                    <h1>Find</h1>
                    <input
                        type="text"
                        placeholder="Search for products"
                        className="w-full border border-gray-300 rounded-full py-2 px-5 focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                    />
                </div>
            </div>
            <div className='flex gap-8 my-8'>
                <div>
                    <FilterSidebar />
                </div>
                <div className='grid grid-cols-4 gap-8'>
                    {products?.data.map((product: IProduct, idx: number) => (
                        <ProductCard key={idx} product={product} />
                    ))
                    }
                </div>
            </div>
        </Container>
    );
};

export default AllProducts;