import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="py-16 bg-[#10b981]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Buy or Sell?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of users who are already saving money and helping the planet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#10b981] hover:bg-gray-100 rounded-full px-8">
              Start Selling
            </Button>
            <Button size="lg"  className="border-white text-white bg-white/10 hover:bg-white/5 rounded-full px-8">
              Browse Items
            </Button>
          </div>

          <div className="mt-8 text-white/80">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="underline font-medium text-white">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
