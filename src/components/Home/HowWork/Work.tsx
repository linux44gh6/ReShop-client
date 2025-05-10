import { ArrowRight, Package, RefreshCw, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HowItWorksSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How ReShop Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of people giving their items a second life while saving money and the planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-[#10b981]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">List Your Items</h3>
            <p className="text-gray-600">
              Take photos, write descriptions, and set your price. Listing is always free and takes just minutes.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="h-8 w-8 text-[#10b981]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect & Sell</h3>
            <p className="text-gray-600">
              Chat with buyers, answer questions, and finalize your sale securely through our platform.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-[#10b981]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ship & Get Paid</h3>
            <p className="text-gray-600">
              Ship your item using our pre-paid shipping labels and receive payment once delivery is confirmed.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/sell">
            <Button className="bg-[#10b981] hover:bg-emerald-700 text-white rounded-full px-6 py-2 flex items-center gap-2">
              Start Selling Today <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
