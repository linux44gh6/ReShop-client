import AllProducts from "@/components/AllProduct/AllProduct";
import { getAllProduct } from "@/Service/Products";

const AllProductsPage = async() => {
    const products=await getAllProduct()
    return (
        <div>
            <AllProducts products={products} />
        </div>
    );
};

export default AllProductsPage;