import { Button } from "@/components/ui/button";
import { IProduct } from "@/Types/products";
import { MessageCircle, PhoneCall } from "lucide-react";
import Image from "next/image";

const ProductDetails = ({ product }: { product: IProduct }) => {
  return (
   <div>
     <div className="grid grid-cols-2  border border-white p-4 rounded-md my-5 shadow-sm">
      <div className="border  rounded-md">
        <Image
          src={product?.data.images[0]}
          alt="product image"
          width={200}
          height={200}
          className="rounded-md w-9/12 object-cover mx-auto "
        />
        <div className="grid grid-cols-3 gap-4 mt-5 border-t  ">
          {product?.data.images.map((image: string, idx: number) => (
            <Image
              key={idx}
              src={image}
              alt="product image"
              width={500}
              height={500}
              className="rounded-2xl w-full object-cover  shadow-2xl p-3"
            />
          ))}
        </div>
      </div>
      <div className="bg-white rounded-md p-4 border">
        <h2 className="font-bold text-xl">{product?.data.title}</h2>
        <p className="text-gray-400 mb-4 border-b">Posted on and location</p>
        <p className="flex gap-2 items-center text-gray-400"><PhoneCall className="bg-[#10b981] text-white size-8 rounded-full "/>  {product?.data.userID.phone_number }</p>
        <p className="flex items-center mt-5 gap-2"><MessageCircle className="bg-[#10b981] text-white size-8  rounded-full p-1"/> Chat</p>
        <div className="flex items-center justify-between my-5 text-gray-500 text-xs">
          
          <p className="rounded-full px-4 py-1 bg-teal-100">
            Brand: {product?.category?.name}
          </p>
          <p className="rounded-full px-4 py-1 bg-teal-100">
            Category: {product?.data.category?.name}
          </p>
        </div>
        <hr />
        <p className="my-2 font-bold">
      
            <span className="font-semibold">$ {product?.data.price}</span>
          
        </p>
        <hr />
        <Button  className="w-full">Buy Now</Button>
      </div>
      
    </div>
    <div className="mt-5">
        <h1 className="font-bold text-3xl">Description</h1>
          <p className="ms-5 mt-3">{product?.data.description}</p>
      </div>
   </div>
  );
};

export default ProductDetails;