import ProductForm from "@/components/Form/ProductForm";
import { getAllCategory } from "@/Service/Category";

const PostProduct = async() => {
    const Category=await getAllCategory()

    return (
        <div>
            <ProductForm Category={Category}/>
        </div>
    );
};

export default PostProduct;