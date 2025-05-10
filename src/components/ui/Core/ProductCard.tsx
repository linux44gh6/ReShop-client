"use client"
import Swal from "sweetalert2"
import type { IProduct } from "@/Types/products"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../button"
import { Heart } from "lucide-react"
import { getSingleProduct } from "@/Service/Products"
import { createWishlist } from "@/Service/Wishlist"
import { toast } from "sonner"
import { useUser } from "@/Context/userContext"
import { redirect } from "next/navigation"

const ProductCard = ({ product }: { product: IProduct }) => {
  //! perform the redux operation for adding product to cart
  const user = useUser()
  const handelAddToWishList = async (id: string) => {
    const product = await getSingleProduct(id)
    if (!user?.user) {
      toast.error("User ID is missing")
      redirect("/login")
      return
    }
    const payload = { products: product?.data._id, userID: user.user._id }

    Swal.fire({
      title: "Add to Wishlist?",
      text: "Do you want to add this product to your wishlist?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Add your wishlist logic here
        const res = await createWishlist(payload)
        console.log(res)
        if (res.status === 200) {
          toast.success(res.message)
        } else {
          toast.error(res.message)
        }
      }
    })

    console.log(id)
  }

  return (
    <div className="h-full">
      <Card className="h-full border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-[#10b981]/30">
        <CardHeader className="relative p-0 overflow-hidden">
          <div className="h-48 w-full overflow-hidden">
            <Image
              src={
                product?.images[0] ||
                "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png" ||
                "/placeholder.svg"
              }
              width={500}
              height={500}
              alt="product image"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </CardHeader>

        <CardContent className="p-3 flex flex-col flex-grow">
          <Link href={`/all-product/${product?._id}`} passHref className="group">
            <CardTitle
              title={product?.title}
              className="font-medium text-sm text-gray-800 group-hover:text-[#10b981] transition-colors line-clamp-2 min-h-[40px]"
            >
              {product?.title.length > 30 ? product?.title?.slice(0, 30) + "..." : product?.title?.slice(0, 20) + ".."}
            </CardTitle>
          </Link>

          <div className="flex items-center justify-between my-2 mt-auto">
            <p className="text-[#10b981] font-bold">${product?.price}</p>
          </div>
        </CardContent>

        <CardFooter className="block p-3 pt-0">
          <div className="flex gap-2 items-center justify-between">
            <Link href={`/all-product/${product._id}`} className="flex-grow">
              <Button
                size="sm"
                className="w-full bg-[#10b981] hover:bg-emerald-700 text-white rounded-full transition-colors"
              >
                Buy Now
              </Button>
            </Link>
            <Button
              onClick={() => handelAddToWishList(product?._id)}
              variant="outline"
              size="sm"
              className="w-8 h-8 p-0 flex items-center justify-center rounded-full cursor-pointer border-gray-200 hover:bg-rose-50 hover:border-rose-200 transition-colors"
            >
              <Heart className="h-4 w-4 text-gray-600 hover:text-rose-500 transition-colors" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ProductCard
