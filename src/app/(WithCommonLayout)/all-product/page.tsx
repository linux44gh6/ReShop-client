import AllProducts from "@/components/AllProduct/AllProduct";
import { getAllCategory } from "@/Service/Category";
// import { getAllCategory } from "@/Service/Category";
// import { getAllProduct } from "@/Service/Products";

const AllProductsPage = async() => {
 const category=await getAllCategory()
    return (
        <div>
            <AllProducts Category={category}  />
        </div>
    );
};

export default AllProductsPage;