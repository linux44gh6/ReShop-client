"use client"
import { AboutUsSection } from "@/components/Home/About/About";
import Banner from "@/components/Home/Banner/Banner";
import Category from "@/components/Home/Category/Category";
import CTASection from "@/components/Home/Commnunity/Community";
import { HowItWorksSection } from "@/components/Home/HowWork/Work";
import FeaturedProducts from "@/components/Home/Product/Product";
import { TestimonialsSection } from "@/components/Home/Testomonial/Tesntomoniel";
import { useSearch } from "@/components/SearchContext/SearchContext";
import { getAllProduct } from "@/Service/Products";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const { search } = useSearch()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const result = await getAllProduct({ search })
        setProducts(result.data)
      } catch (error) {
        console.error("Failed to fetch products", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [search])

  return (
    <div className="">
      <Banner />
      <Category />
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6 px-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <FeaturedProducts products={products} />
      )}
      <HowItWorksSection />
      <AboutUsSection />
      <CTASection />
      <TestimonialsSection />
    </div>
  )
}
