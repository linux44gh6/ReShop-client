"use client";
import Swal from "sweetalert2";
import { IProduct } from '@/Types/products';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../button';
import { Heart } from 'lucide-react';
import { getSingleProduct } from "@/Service/Products";
import { createWishlist } from "@/Service/Wishlist";
import { toast } from "sonner";
import { useUser } from "@/Context/userContext";
import { redirect } from "next/navigation";
const ProductCard = ({ product }: { product: IProduct }) => {
  //! perform the redux operation for adding product to cart
  const user=useUser()
  const handelAddToWishList = async (id: string) => {
    
    const product=await getSingleProduct(id)
    if (!user?.user) {
      toast.error("User ID is missing");
      redirect("/login");
      return;
    }
    const payload={products:product?.data._id,userID:user.user._id}

    Swal.fire({
      title: "Add to Wishlist?",
      text: "Do you want to add this product to your wishlist?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "No, cancel"
    }).then(async(result) => {
      if (result.isConfirmed) {
        // Add your wishlist logic here
        const res=await createWishlist(payload)
        console.log(res);
        if(res.status===200){
          toast.success(res.message)
        }
        else{
          toast.error(res.message)
        }
      }
    });
    
    console.log(id);
  }
  return (
    <div
    >
        <Card className="p-3 hover:shadow-xl">
      <CardHeader className="relative p-0 h-48">
        <Image
          src={
            product?.images[0] ||
            "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
          }
          width={500}
          height={500}
          alt="product image"
          className="rounded-sm h-48  "
        />
      </CardHeader>

      <CardContent className=" p-0 mt-2">
        <Link href={`/all-product/${product?._id}`} passHref>
          <CardTitle
            title={product?.title}
            className="font-semibold cursor-pointer text-sm"
          >
            {product?.title.length > 30
              ? product?.title?.slice(0, 30) + "..."
              : product?.title?.slice(0, 20)+".." } 
          </CardTitle>
        </Link>
       
        <div className="flex items-center justify-between my-2">
          <p className="text-sm text-gray-600">
              <span className="font-semibold">$ {product?.price}</span>
          </p>
        </div>
      </CardContent>

      <CardFooter className="block p-0">
        <div className="flex gap-2 items-center justify-between">
         <Link href={`/all-product/${product._id}`}>
         <Button
            size="sm"

            className="w-32 rounded-full"
          >
            Buy Now
          </Button></Link>
          <Button
          onClick={()=>handelAddToWishList(product?._id)}
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 flex items-center justify-center rounded-full cursor-pointer"
          >
            <Heart />
          </Button>
        </div>
      </CardFooter>
    </Card>
    </div>
  );
};

export default ProductCard;