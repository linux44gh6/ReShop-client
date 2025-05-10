'use client'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function JoinCommunitySection() {
  return (
    <section className="py-16 bg-[#10b981] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Growing Community</h2>
            <p className="mb-6 text-emerald-50">
              Be part of a movement thats changing how we shop. Join over 2 million users who are buying, selling, and
              making a positive impact on the planet.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-emerald-800/30 p-4 rounded-lg">
                <p className="text-3xl font-bold">2M+</p>
                <p className="text-sm text-emerald-100">Active Users</p>
              </div>
              <div className="bg-emerald-800/30 p-4 rounded-lg">
                <p className="text-3xl font-bold">10M+</p>
                <p className="text-sm text-emerald-100">Items Sold</p>
              </div>
              <div className="bg-emerald-800/30 p-4 rounded-lg">
                <p className="text-3xl font-bold">$50M+</p>
                <p className="text-sm text-emerald-100">Seller Earnings</p>
              </div>
              <div className="bg-emerald-800/30 p-4 rounded-lg">
                <p className="text-3xl font-bold">4.8/5</p>
                <p className="text-sm text-emerald-100">Average Rating</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button className="bg-white text-[#10b981] hover:bg-gray-100 rounded-full px-6">Sign Up Now</Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-emerald-700 rounded-full px-6 flex items-center gap-2"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/Comunity.svg"
                alt="ReShop Community"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full overflow-hidden border-2 border-white">
                      <Image
                        src={`/placeholder.svg?height=100&width=100&text=User${i}`}
                        alt={`User ${i}`}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-600">
                  <p className="font-semibold text-[#10b981]">+2,000 people</p>
                  <p>joined this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
