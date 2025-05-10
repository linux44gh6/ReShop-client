import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function AboutUsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="About ReShop"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <span className="text-[#10b981] text-xl font-bold">5+</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Years of</p>
                    <p className="font-semibold">Trusted Service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About ReShop</h2>
            <p className="text-gray-600 mb-6">
              ReShop was founded in 2019 with a simple mission: to make second-hand shopping the first choice for
              conscious consumers. We believe that pre-loved items deserve a second chance, and that buying second-hand
              shouldnt mean compromising on quality or experience.
            </p>
            <p className="text-gray-600 mb-8">
              Our platform connects sellers looking to declutter with buyers seeking quality items at great prices.
              Every transaction helps extend the lifecycle of products and reduces waste, creating a more sustainable
              future for all.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-[#10b981]" />
                <p className="font-medium">Trusted by over 2 million users worldwide</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-[#10b981]" />
                <p className="font-medium">Secure payments and buyer protection</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-[#10b981]" />
                <p className="font-medium">Verified seller ratings and reviews</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-[#10b981]" />
                <p className="font-medium">Dedicated customer support team</p>
              </div>
            </div>

            <Link href="/our-story">
              <Button className="bg-[#10b981] hover:bg-emerald-700 text-white rounded-full px-6">
                Learn More About Our Story
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
