/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Button } from "@/components/ui/button"
import { useUser } from "@/Context/userContext"
import { createTransaction } from "@/Service/Transaction"
import type { IProduct } from "@/Types/products"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, PhoneCall, Share2, ShieldCheck, Star, Truck } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { getAllProduct } from "@/Service/Products"
import ProductCard from "@/components/ui/Core/ProductCard"
import { ChatDialog } from "./ChatDialog"

const ProductDetails = ({ product }: { product: IProduct }) => {
  const [products,setProducts]=useState<IProduct[]>([])
  const { user } = useUser()
  const [selectedImage, setSelectedImage] = useState(product?.data.images[0])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const Products = async () => {
      const res = await getAllProduct()
      setProducts(res.data)
    }
    Products()
  }, [])

  const handleToBuy = async (data: IProduct) => {
    setIsLoading(true)
    const toastId = toast.loading("Processing your purchase...")

    const transactionData = {
      buyerID: user?._id,
      itemID: data._id,
      sellerID: data?.userID?._id,
      status: "completed",
    }

    try {
      const res = await createTransaction(transactionData)
      if (res.status === 200) {
        toast.success(res.message, { id: toastId })
      } else {
        toast.error(res.message, { id: toastId })
      }
    } catch (error) {
      toast.error("An error occurred", { id: toastId })
    } finally {
      setIsLoading(false)
    }
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Home / {product?.category?.name} / {product?.data.title}
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left - Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="aspect-square relative">
              <Image
                src={selectedImage || product?.data.images[0]}
                alt={product?.data.title}
                fill
                className="object-contain p-4"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full h-8 w-8 shadow-sm"
            >
              <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
              <span className="sr-only">Add to favorites</span>
            </Button>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {product?.data.images.map((image: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(image)}
                className={cn(
                  "relative rounded-lg overflow-hidden border-2 aspect-square",
                  selectedImage === image
                    ? "border-[#10b981] ring-2 ring-[#10b981]/20"
                    : "border-gray-200 hover:border-[#10b981]/50",
                )}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Product view ${idx + 1}`}
                  fill
                  className="object-cover transition-all hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-emerald-50 text-[#10b981] border-emerald-200 mb-2">
                {product?.data.condition || "Used - Like New"}
              </Badge>
              <Button variant="ghost" size="sm" className="text-gray-500 flex items-center gap-1">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product?.data.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span>Posted {formatDate(product?.data.createdAt)}</span>
              <span>•</span>
              <span>{product?.data.location}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-gray-900">${product?.data.price}</span>
              {product?.data.originalPrice && (
                <span className="text-lg text-gray-500 line-through">${product?.data.originalPrice}</span>
              )}
            </div>
          </div>

          {/* Product Meta Information */}
          <div className="grid grid-cols-2 gap-3 py-4 border-t border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-50 p-2 rounded-full">
                <Star className="h-4 w-4 text-[#10b981]" />
              </div>
              <div>
                <p className="text-sm font-medium">Brand</p>
                <p className="text-sm text-gray-500">{product?.category?.name || "Unknown"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-emerald-50 p-2 rounded-full">
                <Truck className="h-4 w-4 text-[#10b981]" />
              </div>
              <div>
                <p className="text-sm font-medium">Category</p>
                <p className="text-sm text-gray-500">{product?.data.category?.name || "Uncategorized"}</p>
              </div>
            </div>
          </div>

          {/* Seller Information */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                {product?.data.userID.name?.charAt(0) || "S"}
              </div>
              <div>
                <p className="font-medium">{product?.data.userID.name || "Seller"}</p>
                <p className="text-sm text-gray-500">Seller</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white hover:bg-emerald-50 border-gray-200"
              >
                <PhoneCall className="h-4 w-4 text-[#10b981]" />
                {product?.data.userID.phone_number}
              </Button>
              {/* <Button
                variant="outline"
                className="flex items-center gap-2 bg-white hover:bg-emerald-50 border-gray-200"
              >
                <MessageCircle className="h-4 w-4 text-[#10b981]" />
                Chat with Seller
              </Button> */}
              <ChatDialog payload={product}/>
            </div>
          </div>

          {/* Buy Button */}
          <Button
            onClick={() => handleToBuy(product?.data)}
            disabled={isLoading}
            className="w-full h-12 text-lg bg-[#10b981] hover:bg-emerald-700 transition-colors"
          >
            {isLoading ? "Processing..." : "Buy Now"}
          </Button>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <ShieldCheck className="h-4 w-4 text-[#10b981]" />
            <span>Secure Transaction</span>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Product Description</h2>
        <div className="prose max-w-none text-gray-700">
          <p>{product?.data.description}</p>
        </div>
      </div>

      {/* Similar Products Section (placeholder) */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Similar Products</h2>
          <Button variant="link" className="text-[#10b981]">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((item) => (
           <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
