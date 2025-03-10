"use client";
import { IProduct } from '@/Types/products';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../button';
import { Heart } from 'lucide-react';
const ProductCard = ({ product }: { product: IProduct }) => {
  //! perform the redux operation for adding product to cart
  return (
    <div
    >
        <Card className="p-3">
      <CardHeader className="relative p-0 h-48">
        <Image
          src={
            product?.images[0] ||
            "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
          }
          width={500}
          height={500}
          alt="product image"
          className="rounded-sm h-48 object-cover"
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
              : product?.title}
          </CardTitle>
        </Link>
       
        <div className="flex items-center justify-between my-2">
          <p className="text-sm text-gray-600">
           
              <span className="font-semibold">$ {product?.price}</span>

          </p>

          <div className="flex items-center justify-center gap-1">
          
          </div>
        </div>
      </CardContent>

      <CardFooter className="block p-0">
        <div className="flex gap-2 items-center justify-between">
          <Button
            size="sm"

            className="w-32 rounded-full"
          >
            Buy Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 flex items-center justify-center rounded-full"
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