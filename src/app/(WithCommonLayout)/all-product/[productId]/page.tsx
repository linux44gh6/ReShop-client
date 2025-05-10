import ProductDetails from "@/components/AllProduct/ProductDetails";
import Container from "@/components/ui/Core/Container";
import {  getSingleProduct } from "@/Service/Products";

const ProductDetailsPage = async({ params }: { params:Promise<{productId:string}>}) => {
    const {productId}= await params
    const product=await getSingleProduct(productId)
    return (
       <Container>
         <div>
            <ProductDetails product={product}/>
            </div>
       </Container>
    );
};

export default ProductDetailsPage;