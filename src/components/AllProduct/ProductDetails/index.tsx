"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/Context/userContext";
import { createTransaction } from "@/Service/Transaction";
import { IProduct } from "@/Types/products";
import { MessageCircle, PhoneCall } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const ProductDetails = ({ product }: { product: IProduct }) => {
  const { user } = useUser();

  const handleToBuy = async (data: IProduct) => {
    const toastId = toast.loading("Loading...");
    const transactionData = {
      buyerID: user?._id,
      itemID: data._id,
      sellerID: data?.userID?._id,
      status: "completed",
    };

    const res = await createTransaction(transactionData);
    if (res.status === 200) {
      toast.success(res.message, { id: toastId });
    } else {
      toast.error(res.message, { id: toastId });
    }
  };

  return (
    <div className="p-4">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 border border-white p-4 rounded-md my-5 shadow-sm gap-6">
        
        {/* Left - Product Images */}
        <div className="border rounded-md">
          <Image
            src={product?.data.images[0]}
            alt="product image"
            width={200}
            height={200}
            className="rounded-md w-full md:w-9/12 object-cover mx-auto"
          />
          {/* Small Image Thumbnails */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5 border-t pt-2">
            {product?.data.images.map((image: string, idx: number) => (
              <Image
                key={idx}
                src={image}
                alt="product image"
                width={500}
                height={500}
                className="rounded-2xl w-full object-cover shadow-2xl p-3"
              />
            ))}
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="bg-white rounded-md p-4 border">
          <h2 className="font-bold text-xl">{product?.data.title}</h2>
          <p className="text-gray-400 mb-4 border-b">
            posted on {product?.data.createdAt.slice(0, 10)}, {product?.data.location}
          </p>

          {/* Contact Section */}
          <p className="flex flex-wrap gap-2 items-center text-gray-400">
            <PhoneCall className="bg-[#10b981] text-white size-8 rounded-full" />
            {product?.data.userID.phone_number}
          </p>
          <p className="flex items-center mt-5 gap-2">
            <MessageCircle className="bg-[#10b981] text-white size-8 rounded-full p-1" />
            Chat
          </p>

          {/* Product Meta Information */}
          <div className="flex flex-wrap items-center justify-between my-5 text-gray-500 text-xs">
            <p className="rounded-full px-4 py-1 bg-teal-100">
              Brand: {product?.category?.name}
            </p>
            <p className="rounded-full px-4 py-1 bg-teal-100">
              Category: {product?.data.category?.name}
            </p>
          </div>
          <hr />

          {/* Price */}
          <p className="my-2 font-bold">
            <span className="font-semibold">$ {product?.data.price}</span>
          </p>
          <hr />

          {/* Buy Button */}
          <Button onClick={() => handleToBuy(product?.data)} className="w-full cursor-pointer">
            Buy Now
          </Button>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-5">
        <h1 className="font-bold text-3xl">Description</h1>
        <p className="ms-5 mt-3">{product?.data.description}</p>
      </div>
    </div>
  );
};
export default ProductDetails;
